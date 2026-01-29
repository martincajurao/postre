import { defineStore } from 'pinia';
import { ref, watch, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const items = ref({});
  const combo = ref({});
  const orders = ref({}); // This will hold the aggregated order summary data

  // Computed total price of all items
  const total = computed(() => {
    return Object.values(items.value).reduce((sum, item) => {
      const price =
        item.menuPrices && typeof item.menuPrices === 'object' && item.selectedSize
          ? Number(item.menuPrices[item.selectedSize]) || 0
          : Number(item.menuPrices) || 0;
      const qty = Number(item.buyQty) || 0;
      return sum + price * qty;
    }, 0);
  });

  // Computed discount total (assuming discount logic exists)
  const disctotal = computed(() => {
    // Placeholder: sum of discounts on items, adjust as per actual discount logic
    return 0;
  });

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

  function incrementItemQty(menuCode, comboName = null) {
    if (comboName && combo.value[comboName]) {
      const comboItem = combo.value[comboName];
      for (const key in comboItem.members) {
        if (comboItem.members[key].menuCode === menuCode) {
          comboItem.members[key].buyQty = Number(comboItem.members[key].buyQty) + 1;
          break;
        }
      }
    } else if (items.value[menuCode]) {
      items.value[menuCode].buyQty++;
    }
  }

  function decrementItemQty(menuCode, comboName = null) {
    if (comboName && combo.value[comboName]) {
      const comboItem = combo.value[comboName];
      for (const key in comboItem.members) {
        if (comboItem.members[key].menuCode === menuCode) {
          comboItem.members[key].buyQty = Math.max(1, Number(comboItem.members[key].buyQty) - 1);
          break;
        }
      }
    } else if (items.value[menuCode]) {
      items.value[menuCode].buyQty = Math.max(1, items.value[menuCode].buyQty - 1);
    }
  }

  function clearItems() {
    items.value = {};
  }

  function clearCombo() {
    combo.value = {};
  }

  // Update orders ref to include total and disctotal
  orders.value = {
    total: total.value,
    disctotal: disctotal.value,
  };

  return {
    items,
    combo,
    orders,
    total,
    disctotal,
    addItem, // Expose addItem
    incrementItemQty, // Expose incrementItemQty
    decrementItemQty, // Expose decrementItemQty
    clearItems, // Expose clearItems
    clearCombo, // Expose clearCombo
  };
});
