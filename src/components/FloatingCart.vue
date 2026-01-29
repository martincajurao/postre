<template>
  <v-card
    v-if="cartItems > 0 && !isOrderOrConfirmPage"
    class="floating-cart"
    elevation="12"
    :class="{ 'shake': shakeCart, 'expanded': cartExpanded }"
    style="position: fixed; bottom: 30px; right: 30px; z-index: 1000; border-radius: 28px; transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);"
  >
    <v-card-title class="d-flex align-center justify-space-between py-3 px-5" style="cursor:pointer;" @click="toggleCart">
      <span class="font-weight-bold text-h6">
        <v-icon left size="large" class="mr-2">mdi-basket-fill</v-icon>
        My Cart
      </span>
      <v-chip color="white" text-color="primary" class="font-weight-bold" large>{{ cartItems }}</v-chip>
    </v-card-title>
    <v-expand-transition>
      <div v-show="cartExpanded">
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <p v-if="cartItems === 0" class="text-center text-grey-lighten-1 my-4">Your cart is empty.</p>
          <div v-else class="text-center">
            <p class="mb-4">You have {{ cartItems }} items in your cart.</p>
            <v-btn color="white" large block class="font-weight-bold" @click="goToOrder">
              Proceed to Checkout
            </v-btn>
          </div>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup>
import { ref, inject, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const emitter = inject('emitter')
const router = useRouter()
const cartStore = useCartStore()
const shakeCart = ref(false)
const cartExpanded = ref(false)

watch(() => Object.keys(cartStore.items).length, (newCount, oldCount) => {
  console.log("DEBUG: FloatingCart - cartStore.items count changed from", oldCount, "to", newCount);
  if (newCount > oldCount && !cartExpanded.value) {
    triggerShake();
  }
});

const cartItems = computed(() => {
  let totalItems = 0;
  // Sum individual items
  for (const item of Object.values(cartStore.items)) {
    totalItems += Number(item.buyQty || 0);
  }
  // Sum combo items
  for (const combo of Object.values(cartStore.combo)) {
    if (combo.members) {
      for (const member of Object.values(combo.members)) {
        totalItems += Number(member.buyQty || 0);
      }
    }
  }
  return totalItems;
})

const isOrderOrConfirmPage = computed(() => {
  const routeName = router.currentRoute.value.name;
  return routeName === 'Order' || routeName === 'Confirm';
});

function toggleCart() {
  cartExpanded.value = !cartExpanded.value;
}

function goToOrder() {
  router.push({ name: 'Order' });
  cartExpanded.value = false;
}

function triggerShake() {
  shakeCart.value = true;
  setTimeout(() => {
    shakeCart.value = false;
  }, 500);
}

onMounted(() => {
  // No longer need emitter listeners as cartItems is now derived from cartStore
});

</script>

<style scoped>
.floating-cart {
  background: linear-gradient(145deg, #d32f2f, #ff5252);
  color: white;
}

.floating-cart.shake {
  animation: shake-animation 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

.v-btn {
  color: #d32f2f !important;
}

@keyframes shake-animation {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
