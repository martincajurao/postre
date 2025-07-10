<template>
  <div>
    <v-divider></v-divider>
  <div class="d-flex align-center py-2 ">
    <div class="ma-0 pa-0 ">
      <!-- <v-checkbox @click="Select(data.menuCode)" v-model="props.selecteditems.MenuCode" :value="data.menuCode" density="comfortable" label="" class="text-body-2 d-inline-flex"></v-checkbox> -->
    </div>
    <div class="mr-1">
      <v-img
        height="70"
        width="70"
        :src="data.img"
      ></v-img>
    </div>
    <div class=" mx-3  w-100">
      <div class="d-flex justify-space-between">
        <div>
          <h4 class="text-grey">{{ data.menuName }}</h4>
          <div class="text-grey text-caption py-"> {{ data.menuDesc }}</div>
        </div>
        <div>
          <v-btn
            v-if="isCombo"
            @click="data.combo = selectedCombo.name; data.selectedkey = selectedkey; emitter.emit('change-menu', data)"
            density="comfortable"
            variant="text"
            size="small"
            icon="mdi-swap-horizontal"
          ></v-btn>
          <v-btn
            v-if="!isCombo"
            @click="RemoveItem(data.menuCode); emitter.emit('remove', 1)"
            density="comfortable"
            variant="text"
            size="small"
            icon="mdi-delete-empty"
          ></v-btn>
        </div>
      </div>
      <v-row align="center" class="ma-0 pa-0">
        <v-col cols="4" class="pa-0 d-flex align-center">
          <div class="font-weight-bold text-body-2">
            <span>&#8369;</span> {{ Number(currentPrice).toLocaleString() }}
          </div>
        </v-col>
        <v-col cols="4" class="pa-0 d-flex align-center justify-center">
          <v-select
            v-model="selectedSize"
            :items="data.menuPrice ? Object.keys(data.menuPrice) : []"
            density="compact"
            hide-details
            variant="outlined"
            style="max-width: 120px;"
            class="v-select-custom-align"
            :key="props.data.menuCode"
          ></v-select>
        </v-col>
        <v-col cols="4" class="pa-0" v-if="!isCombo">
          <div class="d-flex justify-end">
            <v-btn
              @click="cartStore.decrementItemQty(data.menuCode, isCombo ? selectedCombo.name : null)"
              :disabled="data.buyQty <= 1"
              size="small"
              class="text-caption"
              density="compact"
              icon="mdi-minus"
            ></v-btn>
            <input
              disabled
              class="text-center text-body-1 "
              :value="data.buyQty"
              style="width: 20px;"
            />
            <v-btn
              @click="cartStore.incrementItemQty(data.menuCode, isCombo ? selectedCombo.name : null)"
              size="small"
              density="compact"
              icon="mdi-plus"
            ></v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</div>
</template>
<script setup>
import { inject, onMounted, ref, computed, watch, defineEmits } from 'vue';
import { useCartStore } from '@/stores/cart';

const emit = defineEmits(['update-selected-size']);
const emitter = inject('emitter');
const cartStore = useCartStore();
const selected = ref([]);
const selectedSize = ref('medium'); // Reintroduce local ref

const currentPrice = computed(() => {
  // If menuPrice is an object with size-specific prices
  if (typeof props.data.menuPrice === 'object' && props.data.menuPrice !== null) {
    if (props.data.menuPrice[selectedSize.value]) {
      const price = Number(props.data.menuPrice[selectedSize.value]);
      return price;
    }
    // If props.data.selectedSize doesn't match a key in the object,
    // try to return the price of 'medium' if available, otherwise 0.
    if (props.data.menuPrice.medium) {
      const price = Number(props.data.menuPrice.medium);
      return price;
    }
    return 0; // Return 0 if no matching size and no 'medium' fallback
  }
  // If menuPrice is a single numeric price (not an object)
  const price = Number(props.data.menuPrice);
  return price;
});

const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
  selecteditems: {
    type: Array, // Assuming it's an array of selected items
    default: () => [], // Use a factory function for array/object defaults
  },
  selectedCombo: {
    type: Object,
    default: {},
  },
  isCombo: {
    type: Boolean,
    default: false,
  },
  selectedkey: {
    type: String,
    default: '',
  },
});

onMounted(() => {
  // Initialize from prop if it exists, otherwise set a default.
  if (props.data.selectedSize) {
    selectedSize.value = props.data.selectedSize;
  } else if (props.data.menuPrice && typeof props.data.menuPrice === 'object') {
    selectedSize.value = props.data.menuPrice.medium ? 'medium' : Object.keys(props.data.menuPrice)[0];
  }
});

watch(selectedSize, (newValue) => {
  emit('update-selected-size', { menuCode: props.data.menuCode, selectedSize: newValue });
});

// function Select(val) {
//     emitter.emit('check-item', val);
// }
function RemoveItem(val) {
  emitter.emit('remove-item', val);
}

function removeQty(val) {
  emitter.emit('remove-qty', val);
}
</script>
<style lang="scss" scoped>
table,
tr,
td,
h4,
h3 {
  font-family: 'Roboto' !important;
}

.checkout {
  height: 3rem;
}

table {
  border-collapse: separate;
  border-spacing: 0 1em;
}

.v-select-custom-align {
  margin-top: -8px;
}
</style>
