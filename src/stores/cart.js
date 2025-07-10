import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const items = ref({});
  const combo = ref({});
  const orders = ref({}); // This will hold the aggregated order summary data

  function addItem(item, selectedSize, currentPrice) {
    // Assuming 'item' has a 'menuCode' and 'menuName'
    const existingItem = items.value[item.menuCode];

    if (existingItem) {
      // If item exists, just increment quantity
      existingItem.buyQty++;
    } else {
      // Add new item with initial quantity
      items.value[item.menuCode] = {
        ...item,
        selectedSize, // Add selected size
        currentPrice, // Add current price
        buyQty: 1,
      };
    }
    console.log("DEBUG: cartStore.items after addItem:", items.value);
  }

  function incrementItemQty(menuCode) {
    if (items.value[menuCode]) {
      items.value[menuCode].buyQty++;
    }
  }

  function clearItems() {
    items.value = {};
  }

  function clearCombo() {
    combo.value = {};
  }

  return {
    items,
    combo,
    orders,
    addItem, // Expose addItem
    incrementItemQty, // Expose incrementItemQty
    clearItems, // Expose clearItems
    clearCombo, // Expose clearCombo
  };
});