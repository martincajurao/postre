<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
    <FloatingCart v-if="cartItems !== null && cartItems !== undefined" :cart-items="cartItems" :items="cartItemsObj" :combo="cartComboObj" />
  </router-view>
</template>

<script setup>
import { ref, getCurrentInstance, watchEffect } from 'vue'
import FloatingCart from './components/FloatingCart.vue'
import { useCartStore } from './stores/cart'; // Import the Pinia store

const internalInstance = getCurrentInstance()
const cartItems = ref(0)
const cartItemsObj = ref({})
const cartComboObj = ref({})

const cartStore = useCartStore(); // Initialize the store

watchEffect(() => {
  // Get cartItems from AppBar if available
  const appBar = internalInstance.appContext.config.globalProperties.cartItemsRef
  cartItems.value = appBar ? appBar.cartItems : 0
  cartItemsObj.value = cartStore.items || {} // Use cartStore.items
  cartComboObj.value = cartStore.combo || {} // Use cartStore.combo
})
</script>

<style>
html,body{
  font-family: Comfortaa, Helvetica, sans-serif;
  scroll-behavior: smooth;
}

</style>
