<template>
    <v-container class="pb-0 mb-0 ">
        <v-img src="" class="align-end text-white py-0" height="150" cover>
            <v-card-title class="text-body-1">
                <span>Home</span>
                <v-icon icon="mdi-chevron-right"></v-icon>
                <span>Order</span>
                <h1 class="text-h4"
                    style="font-family: Montserrat !important; font-weight: 800; text-transform: uppercase !important;">
                    Your Order
                </h1>
            </v-card-title>
        </v-img>
    </v-container>
    <v-container class="mt-0 pt-0">
        <!-- Floating Menu Button -->
        <v-btn
            class="floating-menu-btn"
            color="red-accent-4"
            fab
            large
            style="position: fixed; bottom: 32px; right: 32px; z-index: 1001; box-shadow: 0 4px 24px rgba(0,0,0,0.25);"
            @click="router.push({ name: 'Menu' })"
        >
            <v-icon size="36">mdi-silverware-fork-knife</v-icon>
        </v-btn>
        <v-row class="checkout  ">
            <v-col class="" cols="12" sm="8" style="background-color: 0E0E10;">
                <!-- <v-responsive style="background-color: #0E0E10;" class="px-5 pt-4 my-4">
                    <h2 class="mb-4"
                        style="font-family: Montserrat !important; font-weight: 800; text-transform: uppercase !important;">
                        Your Order
                    </h2>
                    <div class="d-flex align-center justify-space-between">
                        <v-checkbox color="red-accent-1" chips="true" hide-details="true" label="Select all items"
                            class="text-body-2"></v-checkbox>
                        <v-btn density="comfortable" variant="text" size="small" icon="mdi-delete-empty"></v-btn>
                    </div>
                </v-responsive> -->
                <v-responsive style="background-color: #0E0E10;" class="pa-5 my-4 ">
                    <div class="d-flex align-center justify-space-between">
                        <h3>Package Combo ({{ Object.keys(combo).length }}) </h3>
                        <div>
                            <v-btn @click="dialog = true" density="comfortable" variant="flat" size="small" class="mr-2"
                                icon="mdi-plus"></v-btn>
                            <v-btn @click="cartStore.clearCombo()"
                                density="comfortable" variant="flat" size="small" icon="mdi-delete-empty"></v-btn>
                        </div>
                    </div>
                    <TransitionGroup name="list" tag="ul">
                        <div v-for="item in Object.values(combo)" :key="item.name">
                            <v-divider class="mt-6"></v-divider>
                            <div class="d-flex align-center justify-space-between">
                                <!-- <v-checkbox :label="item.desc" class="text-body-2 d-inline-flex font-weight-bold">
                            </v-checkbox> -->
                                <div class="font-weight-bold text-grey mt-4 my-2">{{ item.desc }}
                                    <v-chip size="small" color="amber">
&#8369;{{ (Object.values(item.members).reduce((s, a) => s + getItemPrice(a), 0) - item.disc).toLocaleString() }}
                                    </v-chip>
                                </div>
                                <div class="text-body-2 text-green-accent-4"> Less &#8369;{{
                                    item.disc.toLocaleString('en-US') }}
                                </div>
                                <v-btn @click="emitter.emit('remove', 1); delete combo[item.name]" density="comfortable"
                                    variant="text" size="small" icon="mdi-delete-empty"></v-btn>
                            </div>
<div v-for="menuitem, selectedkey in item.members" :key="menuitem.menuCode">
  <Item :data="menuitem" :isCombo="true" :selectedCombo=item :selectedkey="String(selectedkey)" @update-selected-size="updateItemSize" />
</div>
                        </div>
                    </TransitionGroup>
                </v-responsive>
                <v-responsive style="background-color: #0E0E10;" class="pa-5 my-4 ">
                    <div class="d-flex  align-center mb-5">
                        <h3 class="mt-">Per Menu ({{ itemsCount }})</h3>
                        <v-spacer></v-spacer>
<v-btn @click="OpenMenu(); menudialog = true" variant="flat" class="mr-2" size="small"
    density="comfortable" icon> <v-icon>mdi-plus</v-icon> </v-btn>
<v-btn @click="cartStore.clearItems()"
    variant="flat" size="small" density="comfortable" icon> <v-icon>mdi-delete-empty</v-icon>
</v-btn>
</div>
<!-- <v-checkbox @click="selectAll" v-model="allSelected">Select all</v-checkbox> -->
<template v-if="Object.values(items).length > 0">
    <TransitionGroup name="list" tag="ul">
        <div v-for="item in Object.values(items)" :key="item.menuCode">
            <Item :data="item" @update-selected-size="updateItemSize" :key="item.menuCode" />
        </div>
    </TransitionGroup>
</template>
<template v-else>
    <p class="text-center text-grey-lighten-1 my-4">No individual items in cart.</p>
</template>
                </v-responsive>
            </v-col>
            <v-col class="" cols="12" sm="4"
                style="background-color: 15141B; position: sticky !important; top: 20 !important; ">
                <v-responsive style="background-color: #15141B;" class="pa-5 my-4 ">
                    <h2 class="  font-weight-bold"
                        style="font-family: Montserrat !important; font-weight: 800; text-transform: uppercase !important;">
                        Order Summary
                    </h2>
                    <!-- <div class="text-caption  text-grey ">Your order Sumarry</div> -->
                    <v-divider class="my-4"></v-divider>
                    <table class="w-100 pt-4">
                        <tbody>
                            <tr>
                                <td class="text-grey text-body-2 py-1">Combo subtotal ({{ Object.keys(combo).length }})</td>
                                <td class="text-right text-body-2 py-1"><span>&#8369;</span>
                                    {{ combosub.toLocaleString('en-US') }}</td>
                            </tr>
                            <tr>
                                <td class="text-grey text-body-2 py-1">Per Menu subtotal ({{ itemsCount }})
                                </td>
                                <td class="text-right text-body-2 py-1"><span>&#8369;</span>
                                    {{ permenusub.toLocaleString('en-US') }}</td>
                            </tr>
                            <tr>
                                <td class="text-grey text-body-2 py-1">Combo Discount </td>
                                <td class="text-right text-body-2 py-1 text-green-accent-3"><span>&#8369;</span> {{
                                    disc.toLocaleString('en-US') }}</td>
                            </tr>
                            <tr>
                                <td class="text-grey text-body-2 py-1">Delivery fee</td>
                                <td class="text-right text-body-2 py-1"><span>&#8369;</span> {{ df }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <v-divider class="my-4"></v-divider>
                    <table class="w-100">
                        <tr>
                            <td class="text-grey text-body-2">Amount to pay</td>
                            <td class="text-right text-h4 text-warning "><span>&#8369;</span> {{ computedtotal.toLocaleString('en-US') }}</td>
                        </tr>
                    </table>
                    <v-btn to="Confirm" @click="Checkout()" block="" color="red-accent-4"
                        class="mt-6 font-weight-bold">Checkout</v-btn>
                </v-responsive>
            </v-col>
        </v-row>
    </v-container>

    <!-- MODAL -->
    <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
        <v-card color="#111">
            <v-toolbar dark color="#111">
                <v-toolbar-title>Select Package</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <Combo :data=data />
        </v-card>
    </v-dialog>
  <!-- Floating Cart moved to App.vue for global visibility -->

    <!-- MODAL -->
    <v-dialog max-width="800px" v-model="changedialog" :scrim="false" transition="dialog-bottom-transition">
        <v-card color="#111">
            <v-toolbar color="#111">
                <v-icon class="ml-4">mdi-swap-horizontal</v-icon>
                <v-toolbar-title class="font-weight-bold"> Change Menu</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="changedialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-container class="mb-4"> 
                <v-row>
                    <v-col cols="12" sm="6" v-for="item in changeMenuData" class="">
                        <!-- <v-divider class="mb-5"></v-divider> -->
                        <div class="d-flex align-center justify-end " style="max-width: 350px; margin: auto;">
                            <v-badge v-if="item.isHot" :content="'Hot'" color="red-accent-4" offset-x="6" offset-y="6">
                                <v-avatar size="60px">
                                    <v-img alt="Avatar" :src="item.img" cover>
                                        <template v-slot:placeholder>
                                            <div class="d-flex align-center justify-center fill-height">
                                                <v-progress-circular color="grey-lighten-4"
                                                    indeterminate></v-progress-circular>
                                            </div>
                                        </template>
                                    </v-img>
                                </v-avatar>
                            </v-badge>
                            <v-avatar v-else size="60px">
                                <v-img alt="Avatar" :src="item.img" cover>
                                    <template v-slot:placeholder>
                                        <div class="d-flex align-center justify-center fill-height">
                                            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                        </div>
                                    </template>
                                </v-img>
                            </v-avatar>
                            <div class="d-flex flex-column  justify-center text-grey mx-6">
                                <div class=" font-weight-bold text-body-2">{{ item.menuName }}</div>
                                <small>{{ item.menuDesc }}</small>
                            </div>
                            <v-spacer></v-spacer>
<div class="d-flex justify-end align-center" style="min-width: 90px;">
    <span>&#8369;</span>{{ getItemPrice(item).toLocaleString('en-US') }}
    <v-btn color=""
        @click="replaceComboItem(item)"
        class="ml-2" size="small" density="comfortable" icon>
        <v-icon>mdi-cached</v-icon>
    </v-btn>
</div>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
    <!-- MODAL -->
    <v-dialog v-model="menudialog" fullscreen :scrim="false" scrollable transition="dialog-bottom-transition">
        <v-card color="#111">
            <v-toolbar color="#111">
                <v-btn @click="menudialog = false" icon>
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-toolbar-title>Select Menu</v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn> -->
                <v-btn icon @click="menudialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

                <v-tabs v-model="tab" color="orange" align-tabs="center" stacked class="">
                <v-tab value="PO">
                    <v-icon>mdi-pig</v-icon>
                    <div class="text-body-1"> Pork</div>
                </v-tab>

                <v-tab value="BF">
                    <v-icon>mdi-cow</v-icon>
                    <div class="text-body-1"> Beef</div>
                </v-tab>

                <v-tab value="CH">
                    <v-icon>mdi-food-turkey</v-icon>
                    <div class="text-body-1"> Chicken</div>
                </v-tab>

                <v-tab value="VE">
                    <v-icon>mdi-leaf-circle</v-icon>
                    <div class="text-body-1"> Vegetable</div>
                </v-tab>
                <v-tab value="PA">
                    <v-icon>mdi-noodles</v-icon>
                    <div class="text-body-1"> Pasta</div>
                </v-tab>
                <v-tab value="MC">
                    <v-icon>mdi-cake-variant</v-icon>
                    <div class="text-body-1"> Dessert</div>
                </v-tab>
                <v-tab value="SF">
                    <v-icon>mdi-fish</v-icon>
                    <div class="text-body-1"> Seafood</div>
                </v-tab>
            </v-tabs>
            <v-window v-model="tab" class="h-75" style="overflow-y: auto;">
                <v-window-item v-for="menu, key in menuData" :value="key">
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" v-for="item in menu " class="py-2">
                                <v-divider class="mb-4"></v-divider>
                                <div class="d-flex align-center">
                                    <v-badge v-if="item.isHot" :content="'Hot'" color="red-accent-4" offset-x="6"
                                        offset-y="6">
                                        <v-avatar size="80px">
                                            <v-img alt="Avatar" :src="item.img" cover>
                                                <template v-slot:placeholder>
                                                    <div class="d-flex align-center justify-center fill-height">
                                                        <v-progress-circular color="grey-lighten-4"
                                                            indeterminate></v-progress-circular>
                                                    </div>
                                                </template>
                                            </v-img>
                                        </v-avatar>
                                    </v-badge>
                                    <v-avatar v-else size="80px">
                                        <v-img alt="Avatar" :src="item.img" cover>
                                            <template v-slot:placeholder>
                                                <div class="d-flex align-center justify-center fill-height">
                                                    <v-progress-circular color="grey-lighten-4"
                                                        indeterminate></v-progress-circular>
                                                </div>
                                            </template>
                                        </v-img>
                                    </v-avatar>
                                    <div class="d-flex flex-column  justify-center text-grey mx-6">
                                        <div class=" font-weight-bold">{{ item.menuName }}</div>
                                        <small>{{ item.menuDesc }}</small>
                                    </div>
                                    <v-spacer></v-spacer>
                                    <div class="d-flex justify-end" style="min-width: 100px;">
<span>&#8369;</span>{{ getItemPrice(item).toLocaleString('en-US') }}
<v-btn
    @click="addItemWithDefaultSize(item)"
    size="small" class="ml-4" density="comfortable" icon>
    <v-icon>mdi-cart</v-icon>
</v-btn>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-window-item>
            </v-window>
        </v-card>
    </v-dialog>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance, inject, watch, computed } from 'vue'
import { ref as fireRef, getDatabase, child, get, set, query, orderByChild, orderByValue, equalTo } from "firebase/database";
import Item from '@/components/Items.vue'
import Combo from '@/components/Combo.vue'
import { db, storage } from '@/firebase'

import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'; // Import the Pinia store
import { storeToRefs } from 'pinia';

const router = useRouter()


const internalInstance = getCurrentInstance()
const emitter = inject('emitter');

const cartStore = useCartStore(); // Initialize the store

// Replace local refs with store state
const { combo, items } = storeToRefs(cartStore);

const df = ref(0);
const updateKey = ref(0);

const itemsCount = computed(() => {
  return Object.keys(items.value).length;
});

const permenusub = computed(() => {
  const a = updateKey.value; // Depend on updateKey
  const subtotal = Object.values(items.value).reduce((sum, item) => {
    const price = getItemPrice(item);
    const qty = Number(item.buyQty);
    if (isNaN(price) || isNaN(qty)) {
      return sum; // Skip this item if price or qty is NaN
    }
    return sum + (price * qty);
  }, 0);
  return subtotal;
});

const combosub = computed(() => {
  const a = updateKey.value; // Depend on updateKey
  const subtotal = Object.values(combo.value).reduce((sum, comboItem) => {
    const comboMembersSubtotal = Object.values(comboItem.members).reduce((memberSum, member) => {
      const price = getItemPrice(member);
      const qty = Number(member.buyQty);
      if (isNaN(price) || isNaN(qty)) {
        return memberSum; // Skip this member if price or qty is NaN
      }
      return memberSum + (price * qty);
    }, 0);
    return sum + comboMembersSubtotal;
  }, 0);
  return subtotal;
});

const disc = computed(() => {
  return Object.values(combo.value).reduce((sum, comboItem) => {
    const discount = Number(comboItem.disc);
    return sum + discount;
  }, 0);
});


const dialog = ref(false)
const changedialog = ref(false)
const selectedchange = ref(null)
const menudialog = ref(false)
const data = ref(null)
const menuData = ref(null)
const changeMenuData = ref({})

const tab = ref(null)
const itemsArray = ref([])

// const selecteditems = ref([])
// const selected = ref([])
// const allSelected = ref(false);

function getItemPrice(item) {
  const parsePrice = (price) => {
    if (typeof price === 'string') {
      // Remove currency symbols and commas, then parse
      const numericString = price.replace(/[^\d.-]/g, '');
      const parsed = parseFloat(numericString);
      return isNaN(parsed) ? 0 : parsed;
    }
    const num = Number(price);
    return isNaN(num) ? 0 : num;
  };

  // If menuPrices is an object with size-specific prices
  if (typeof item.menuPrices === 'object' && item.menuPrices !== null) {
    let price = 0;
    if (item.selectedSize && item.menuPrices[item.selectedSize]) {
      price = item.menuPrices[item.selectedSize];
    } else if (item.menuPrices.medium) {
      price = item.menuPrices.medium; // Fallback to medium
    } else {
      // If medium price is missing, pick the first available price
      const keys = Object.keys(item.menuPrices);
      if (keys.length > 0) {
        price = item.menuPrices[keys[0]];
      }
    }
    return parsePrice(price);
  }

  // If menuPrices is a single numeric or string price
  return parsePrice(item.menuPrices);
}

const computedtotal = computed(() => {
  // Depend on updateKey to force re-computation
  const a = updateKey.value;

  const comboVal = Number(combosub.value) || 0;
  const permenuVal = Number(permenusub.value) || 0;
  const dfVal = Number(df.value) || 0;
  const discVal = Number(disc.value) || 0;
  const total = comboVal + permenuVal + dfVal - discVal;
  return total;
});



// function selectAll() {
//     selecteditems.value = []
//     if (!allSelected.value) {
//         selecteditems.value=items
//         // for (const item in items) {
//         //     selecteditems.value.push(item)
//         //     console.log(items)
//         // }
//     }
// }

onMounted(() => {
    const que = query(fireRef(db, 'Combo'));
    const q = query(fireRef(db, 'MenuCategory'));

    get(q).then((snapshot) => {
        menuData.value = snapshot.val()
    })
    get(que).then((snapshot) => {
        data.value = snapshot.val()
    })
        emitter.on('remove-item', (val) => {   // *Listen* for event
        delete items.value[val]
    });
    emitter.on('add-combo', (val) => {   // *Listen* for event
        dialog.value = false;
        // Ensure buyQty is a number for each member of the combo
        if (val.members) {
            Object.values(val.members).forEach(member => {
                member.buyQty = Number(member.buyQty) || 1;
                // Initialize selectedSize for combo members
                if (typeof member.menuPrices === 'object' && member.menuPrices !== null) {
                    if (member.menuPrices.medium) {
                        member.selectedSize = 'medium';
                    } else if (Object.keys(member.menuPrices).length > 0) {
                        member.selectedSize = Object.keys(member.menuPrices)[0];
                    } else {
                        member.selectedSize = null;
                    }
                } else {
                    member.selectedSize = null;
                }
            });
        }
        combo.value[val.name] = val;
    });
    emitter.on('change-menu', (val) => {   // *Listen* for event
        changedialog.value = true
        changeMenuData.value = {}
        selectedchange.value = val
        const q = query(fireRef(db, 'MenuCategory/' + val.menuCategory));

        get(q).then((snapshot) => {
            changeMenuData.value = snapshot.val()
        })
    });

    // selected.value = items
    // emitter.on('check-item', (val) => {   // *Listen* for event
    //     const s = selecteditems.value.filter(e => e !== val)
    //     if (s) {
    //         var filteredArray = selecteditems.value.filter(e => e !== val)
    //         selecteditems.value=filteredArray
    //         return
    //     }
    //     selecteditems.value.push(val)
    //     console.log(filteredArray);
    // });
    window.scrollTo(0,0);
})

function addItemWithDefaultSize(item) {
    // Ensure item is an object before proceeding
    if (typeof item !== 'object' || item === null || !item.menuCode) {
        
        return;
    }

    // Clone item to avoid direct mutation of original data
    const newItem = { ...item };
    // Ensure buyQty is initialized as a number
    newItem.buyQty = Number(newItem.buyQty) || 1; // Default to 1 if not present or NaN

    // If menuPrices is an object (meaning it has size options)
    if (typeof newItem.menuPrices === 'object' && newItem.menuPrices !== null) {
        // Set default selectedSize to 'medium' if available, otherwise to the first key
        if (newItem.menuPrices.medium) {
            newItem.selectedSize = 'medium';
        } else if (Object.keys(newItem.menuPrices).length > 0) {
            newItem.selectedSize = Object.keys(newItem.menuPrices)[0];
        } else {
            newItem.selectedSize = null; // No sizes available
        }
    } else {
        // If menuPrices is a single value, no selectedSize is needed
        newItem.selectedSize = null;
    }

    // Add the item to the reactive items object
    items.value[newItem.menuCode] = newItem;

    menudialog.value = false;
    
}
function OpenMenu() {
    const que = query(fireRef(db, 'MenuCategory'));

    get(que).then((snapshot) => {
        menuData.value = snapshot.val()
    })
}
function Checkout() {
    const finalItems = [];

    // Process combo items
    for (const comboName in combo.value) {
        const comboItem = combo.value[comboName];
        for (const memberKey in comboItem.members) {
            const member = { ...comboItem.members[memberKey] }; // Clone to avoid direct mutation
            member.calculatedPrice = getItemPrice(member); // Get the price for the selected size
            finalItems.push(member);
        }
    }

    // Process individual menu items
    for (const menuCode in items.value) {
        const item = { ...items.value[menuCode] }; // Clone
        item.calculatedPrice = getItemPrice(item); // Get the price for the selected size
        finalItems.push(item);
    }

    // Aggregate items by menuName and sum buyQty
    const aggregatedItems = finalItems.reduce((accumulator, currentItem) => {
        const existingItem = accumulator.find(elem => elem.menuName === currentItem.menuName);
        if (existingItem) {
            existingItem.buyQty = Number(existingItem.buyQty) + Number(currentItem.buyQty);
            // If prices differ for aggregated items, you might need a more complex average or sum
            // For now, assuming calculatedPrice is consistent for same menuName or taking the last one
            // If you need to sum prices, you'd need to store original price * qty
            // For simplicity, we'll just use the calculatedPrice of the found item.
        } else {
            accumulator.push({ ...currentItem }); // Push a clone to avoid modifying original
        }
        return accumulator;
    }, []);

    cartStore.orders.combosub = combosub.value;
    cartStore.orders.permenusub = permenusub.value;
    cartStore.orders.total = computedtotal.value;
    cartStore.orders.disctotal = disc.value;
    cartStore.orders.items = aggregatedItems; // Use aggregatedItems
}

function replaceComboItem(newItem) {
    if (selectedchange.value && selectedchange.value.combo && selectedchange.value.selectedkey) {
        const { combo: comboName, selectedkey } = selectedchange.value;
        if (combo.value[comboName] && combo.value[comboName].members[selectedkey]) {
            const updatedItem = { ...newItem, buyQty: 1 }; // Set buyQty to 1
            combo.value[comboName].members[selectedkey] = updatedItem;
            updateKey.value++;
        }
    }
    changedialog.value = false;
}

function updateItemSize({ menuCode, selectedSize }) {
  console.log('updateItemSize called with:', menuCode, selectedSize);
  if (cartStore.items[menuCode]) {
    cartStore.items[menuCode].selectedSize = selectedSize;
    updateKey.value++; // Force computed properties to update
    console.log('Updated item selectedSize and incremented updateKey');
  }
  // Also update selectedSize in combo members if applicable
  for (const comboName in combo.value) {
    const comboItem = combo.value[comboName];
    if (comboItem.members) {
      for (const memberKey in comboItem.members) {
        const member = comboItem.members[memberKey];
        if (member.menuCode === menuCode) {
          member.selectedSize = selectedSize;
          // Replace member object to trigger reactivity
          comboItem.members[memberKey] = { ...member };
          updateKey.value++;
          console.log('Updated combo member selectedSize and incremented updateKey');
          console.log('Current combo member:', comboItem.members[memberKey]);
          return;
        }
      }
    }
  }
}

console.log('Debug logs removed to avoid redeclaration error.');

// Watch for changes in items and combo to update the total
watch(items, (newItems, oldItems) => {
  console.log('items changed, incrementing updateKey');
  updateKey.value++;
}, { deep: true });

watch(combo, (newCombo, oldCombo) => {
  console.log('combo changed, incrementing updateKey');
  updateKey.value++;
}, { deep: true });

</script>
<style lang="scss" scoped>
// Modern floating menu button style
.floating-menu-btn {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff1744 60%, #ff5252 100%);
  color: #fff !important;
  box-shadow: 0 6px 24px rgba(0,0,0,0.22), 0 1.5px 6px rgba(255,23,68,0.18);
  transition: box-shadow 0.2s, background 0.2s;
  border: none;
  outline: none;
  z-index: 1001;
}
.floating-menu-btn:hover, .floating-menu-btn:focus {
  box-shadow: 0 12px 32px rgba(0,0,0,0.32), 0 2px 8px rgba(255,23,68,0.22);
  background: linear-gradient(135deg, #d50000 60%, #ff5252 100%);
}
.floating-menu-btn .v-icon {
  font-size: 2rem;
}
table,
tr,
td,
h4,
h3 {
    font-family: 'Roboto' !important;
}

.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    // transform: translateX(30px);
}

.best-seller {
    position: absolute !important;
    left: 1px;
    top: 0px;
}

.floating-cart {
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.25);
  min-width: 320px;
  max-width: 90vw;
  overflow: hidden;
}
.floating-cart .v-card-title {
  background: #15141B;
  color: #fff;
}
.floating-cart .v-btn {
  color: #fff;
}
.floating-cart .v-divider {
  background: #333;
}
.floating-cart .text-warning {
  color: #FFC107 !important;
}
.floating-cart .font-weight-bold {
  font-family: 'Montserrat', sans-serif !important;
}
.floating-cart .text-caption {
  font-size: 0.85rem;
}
.floating-cart .v-btn {
  font-weight: bold;
}
.floating-cart.expanded {
  min-height: 200px;
}
</style>
