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
          <v-col cols="4" class="pa-0 d-flex align-center justify-center" v-if="data.menuName.toLowerCase() !== 'manfo crepe'">
<v-btn-toggle
  v-model="selectedSize"
  mandatory
  class="v-select-custom-align"
  style="max-width: 100px; padding: 0; overflow-x: hidden;"
  density="compact"
  variant="outlined"
  :key="props.data.menuCode"
>
  <v-btn
    v-for="size in data.menuPrices ? Object.keys(data.menuPrices) : []"
    :key="size"
    :value="size"
    class="text-capitalize"
    density="compact"
    style="min-width: 40px; padding: 0px;"
  >
    {{ size === 'medium' ? 'M' : size === 'large' ? 'L' : size }}
  </v-btn>
</v-btn-toggle>
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
  // If menuPrices is an object with size-specific prices
  if (typeof props.data.menuPrices === 'object' && props.data.menuPrices !== null) {
    if (props.data.menuPrices[selectedSize.value]) {
      const price = Number(props.data.menuPrices[selectedSize.value]);
      if (!isNaN(price) && price > 0) {
        return price;
      }
    }
    // If props.data.selectedSize doesn't match a key in the object,
    // try to return the price of 'medium' if available, otherwise 0.
    if (props.data.menuPrices.medium) {
      const price = Number(props.data.menuPrices.medium);
      if (!isNaN(price) && price > 0) {
        return price;
      }
    }
    // If medium price is missing or zero, try first available price > 0
    const keys = Object.keys(props.data.menuPrices);
    for (const key of keys) {
      const price = Number(props.data.menuPrices[key]);
      if (!isNaN(price) && price > 0) {
        return price;
      }
    }
    return 0; // Return 0 if no valid price found
  }
  // If menuPrices is a single numeric price (not an object)
  const price = Number(props.data.menuPrices);
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
  } else if (props.data.menuPrices && typeof props.data.menuPrices === 'object') {
    selectedSize.value = props.data.menuPrices.medium ? 'medium' : Object.keys(props.data.menuPrices)[0];
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
  margin-top: 0;
}
</style>
