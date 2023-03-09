<template>
    <v-container :key="updateKey" class="">
        <v-row class="checkout mt-15 ">
            <v-col class="" cols="12" sm="8" style="background-color: 0E0E10;">
                <v-responsive style="background-color: #0E0E10;" class="px-5 pt-4 my-4">
                    <h2 class="mb-4"
                        style="font-family: Montserrat !important; font-weight: 800; text-transform: uppercase !important;">
                        Your Order
                    </h2>
                    <!-- <div class="d-flex align-center justify-space-between">
                        <v-checkbox color="red-accent-1" chips="true" hide-details="true" label="Select all items"
                            class="text-body-2"></v-checkbox>
                        <v-btn density="comfortable" variant="text" size="small" icon="mdi-delete-empty"></v-btn>
                    </div> -->
                </v-responsive>
                <v-responsive style="background-color: #0E0E10;" class="pa-5 my-4 ">
                    <div class="d-flex align-center justify-space-between">
                        <h3>Package Combo ({{ Object.keys(combo).length }}) </h3>
                        <div>
                            <v-btn @click="dialog = true" density="comfortable" variant="flat" size="small" class="mr-2"
                                icon="mdi-plus"></v-btn>
                            <v-btn @click="combo = {}; gVar.combo = {}" density="comfortable" variant="flat" size="small"
                                icon="mdi-delete-empty"></v-btn>
                        </div>
                    </div>
                    <TransitionGroup name="list" tag="ul">
                        <div v-for="item in combo">
                            <v-divider class="mt-6"></v-divider>
                            <div class="d-flex align-center justify-space-between">
                                <!-- <v-checkbox :label="item.desc" class="text-body-2 d-inline-flex font-weight-bold">
                            </v-checkbox> -->
                                <div class="font-weight-bold text-grey mt-4 my-2">{{ item.desc }} <v-chip size="small"
                                        color="amber">&#8369;{{ item.price.toLocaleString("En") }}</v-chip></div>
                                <div>{{ }}</div>
                                <div class="text-body-2 text-green-accent-4"> Discounted &#8369;{{
                                    item.disc.toLocaleString("En") }}</div>
                                <v-btn @click="delete combo[item.name]" density="comfortable" variant="text" size="small"
                                    icon="mdi-delete-empty"></v-btn>
                            </div>
                            <div v-for="menuitem in item.members">
                                <Item :data="menuitem" :isCombo="true" />
                            </div>
                        </div>
                    </TransitionGroup>
                </v-responsive>
                <v-responsive style="background-color: #0E0E10;" class="pa-5 my-4 ">
                    <div class="d-flex  align-center mb-5">
                        <h3 class="mt-">Per Menu ({{ Object.keys(items).length }})</h3>
                        <v-spacer></v-spacer>
                        <v-btn @click="OpenMenu(); menudialog = true"  variant="flat" class="mr-2"
                            size="small" density="comfortable" icon> <v-icon>mdi-plus</v-icon> </v-btn>
                        <v-btn @click="items={}"  variant="flat"
                            size="small" density="comfortable" icon> <v-icon>mdi-delete-empty</v-icon> </v-btn>
                    </div>
                    <!-- <v-checkbox @click="selectAll" v-model="allSelected">Select all</v-checkbox> -->
                    <TransitionGroup name="list" tag="ul">
                        <div v-for="item in items">
                            <Item :data="item" :selecteditems="selecteditems" />
                        </div>
                    </TransitionGroup>
                </v-responsive>
            </v-col>
            <v-col class="" cols="12" sm="4" style="background-color: 15141B; position: sticky !important; top: 20 !important; ">
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
                                <td class="text-grey text-body-2 py-1">Per Menu subtotal ({{ Object.keys(items).length }})
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
                            <td class="text-right text-h4 text-warning "><span>&#8369;</span> {{ (computedtotal -
                                disc).toLocaleString('en-US') }}</td>
                        </tr>
                    </table>
                    <v-btn to="Confirm" block="" color="red-accent-4" class="mt-6 font-weight-bold">Checkout</v-btn>
                </v-responsive>
            </v-col>
        </v-row>
    </v-container>
    <!-- MODAL -->
    <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
        <v-card color="black">
            <v-toolbar dark color="red-accent-4">
                <v-toolbar-title>Select Package</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <Combo :data=data />
        </v-card>
    </v-dialog>
    <!-- MODAL -->
    <v-dialog v-model="menudialog" fullscreen :scrim="false" scrollable="true" transition="dialog-bottom-transition">
        <v-card color="#111">
            <v-toolbar color="#111">
                <v-btn @click="menudialog=false" icon>
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-toolbar-title>Select Menu</v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn> -->
                <v-btn icon @click="menudialog=false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-tabs v-model="tab" color="orange" align-tabs="center" stacked class="">
                <v-tab value="PO">
                    <v-icon>mdi-pig</v-icon>
                    <div class="text-body-1"> Pork</div>
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
            <v-window v-model="tab" class="h-75"  style="overflow-y: auto;" >
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
                                    <div>
                                        <span>&#8369;</span>{{ Number(item.menuPrice).toLocaleString('en-US') }}
                                        <v-btn @click="items[item.menuCode]=item; menudialog=false" color="" size="small" class="ml-4" density="comfortable" icon>
                                            <v-icon>mdi-cart</v-icon></v-btn>
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
import { ref as fireRef, getDatabase, child, get, set, query, orderByChild, orderByValue, equalTo, limitToFirst } from "firebase/database";
import Item from '@/components/Items.vue'
import Combo from '@/components/Combo.vue'
import { db, storage } from '@/firebase'

const internalInstance = getCurrentInstance()
const emitter = inject('emitter');
const combo = ref({})
const items = ref(internalInstance.appContext.config.globalProperties.gVar.items)
const df = ref(0);
const disc = ref(0);
const permenusub = ref(0)
const combosub = ref(0)
const dialog = ref(false)
const menudialog = ref(false)
const data = ref(null)
const menuData = ref(null)
const show = ref(true)
const updateKey = ref(0)
const tab = ref(null)

// const selecteditems = ref([])
// const selected = ref([])
// const allSelected = ref(false);

const computedtotal = computed(() => {
    const keyup = updateKey.value
    const values = Object.values(items.value);
    permenusub.value = values.reduce((s, a) => s + parseFloat(a.menuPrice), 0);
    combosub.value = 0
    disc.value = 0

    for (const x in combo.value) {
        disc.value += parseFloat(combo.value[x].disc)
        const values2 = Object.values(combo.value[x].members);
        combosub.value += values2.reduce((s, a) => s + parseFloat(a.menuPrice), 0);
    }
    return combosub.value + permenusub.value
})
// watch(items, (a) =>{
// console.log("New value",a)
// })

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
    combo.value = internalInstance.appContext.config.globalProperties.gVar.combo
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
        // internalInstance.appContext.config.globalProperties.gVar.items = items.value
    });
    emitter.on('add-combo', (val) => {   // *Listen* for event
        dialog.value = false;
        combo.value[val.name] = val;
        console.log('COMBO', combo.value)
        updateKey.value += 1
    });

    // selected.value = items
    // emitter.on('check-item', (val) => {   // *Listen* for event
    //     const s = selecteditems.value.includes(val)
    //     if (s) {
    //         var filteredArray = selecteditems.value.filter(e => e !== val)
    //         selecteditems.value=filteredArray
    //         return
    //     }
    //     selecteditems.value.push(val)
    //     console.log(filteredArray);
    // });
})
function OpenMenu() {
    const que = query(fireRef(db, 'MenuCategory'));

    get(que).then((snapshot) => {
        menuData.value = snapshot.val()
    })
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
}</style>