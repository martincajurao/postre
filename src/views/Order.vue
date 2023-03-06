<template>
    <v-container :key="updateKey">
        <v-row class="checkout mt-15" >
            <v-col class="" cols="12" sm="8" style="background-color: 0E0E10;">
                <v-responsive style="background-color: #0E0E10;" class="px-5 pt-4 my-4">
                    <h3 class="text-h5 font-weight-bold mb-4">
                        Your Order
                    </h3>
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
                            <v-btn @click="dialog = true" density="comfortable" variant="text" size="small"
                                icon="mdi-plus"></v-btn>
                            <v-btn @click="combo = {}; gVar.combo={}" density="comfortable" variant="text" size="small"
                                icon="mdi-delete-empty"></v-btn>
                        </div>
                    </div>
                    <TransitionGroup name="list" tag="ul" >
                    <div v-for="item in combo" >
                        <v-divider class="mt-4"></v-divider>
                        <div class="d-flex align-center justify-space-between">
                            <!-- <v-checkbox :label="item.desc" class="text-body-2 d-inline-flex font-weight-bold">
                            </v-checkbox> -->
                            <div class="font-weight-bold text-grey mt-4 my-2">{{ item.desc }}</div>
                            <v-btn @click="delete combo[item.name]" density="comfortable" variant="text" size="small"
                                icon="mdi-delete-empty"></v-btn>
                        </div>
                            <div v-for="menuitem in item.members">
                                <Item :data="menuitem" :isCombo="true" />
                            </div>
                            <div class=" d-flex justify-center">
                                <v-chip color="green-accent-4">Discount: P{{ item.disc }}</v-chip>
                            </div>
                        </div>
                    </TransitionGroup>
                </v-responsive>
                <v-responsive style="background-color: #0E0E10;" class="pa-5 my-4 ">
                    <div class="d-flex justify-space-between align-center mb-5">
                        <h3 class="mt-">Per Menu</h3>
                        <v-btn prepend-icon="mdi-plus" variant="text" size="small">Add item</v-btn>
                    </div>
                    <!-- <v-checkbox @click="selectAll" v-model="allSelected">Select all</v-checkbox> -->
                    <TransitionGroup name="list" tag="ul">
                        <div v-for="item in items">
                            <Item :data="item" :selecteditems="selecteditems" />
                        </div>
                    </TransitionGroup>
                </v-responsive>
            </v-col>
            <v-col class="" cols="12" sm="4" style="background-color: 15141B;">
                <v-responsive style="background-color: #15141B;" class="pa-5 my-4 " >
                    <h3 class="text-h5 font-weight-bold">Order Summary</h3>
                    <!-- <div class="text-caption  text-grey ">Your order Sumarry</div> -->
                    <v-divider class="my-4"></v-divider>
                    <table class="w-100 pt-4">
                        <tbody>
                            <tr>
                                <td class="text-grey text-body-2 py-1">Subtotal</td>
                                <td class="text-right text-body-2 py-1" ><span>&#8369;</span>
                                    {{ computedtotal.toLocaleString('en-US') }}</td>
                            </tr>
                            <tr>
                                <td class="text-grey text-body-2 py-1">Discount</td>
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
                    <v-btn to="Confirm" block="" color="orange-accent-4" class="mt-6 font-weight-bold">Checkout (2)</v-btn>
                </v-responsive>
            </v-col>
        </v-row>
    </v-container>
    <!-- MODAL -->
    <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
        <v-card color="black">
            <v-toolbar dark color="red-accent-4">
                <v-toolbar-title>Select from our Packages</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>

            </v-toolbar>
            <!-- <v-divider></v-divider> -->
            <Combo :data=data />
        </v-card>
    </v-dialog>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance, inject, watch, computed } from 'vue'
import { ref as fireRef, getDatabase, child, get, set, query, orderByChild, orderByValue, limitToFirst } from "firebase/database";
import Item from '@/components/Items.vue'
import Combo from '@/components/Combo.vue'
import { db, storage } from '@/firebase'

const internalInstance = getCurrentInstance()
const emitter = inject('emitter');
const combo = ref({})
const items = ref(internalInstance.appContext.config.globalProperties.gVar.items)
const df = ref(0);
const disc = ref(0);
const dialog = ref(false)
const data = ref(null)
const show = ref(true)
const updateKey =ref(0)

// const selecteditems = ref([])
// const selected = ref([])
// const allSelected = ref(false);

const computedtotal = computed(() => {
    const keyup = updateKey.value
    const values = Object.values(items.value);
    const sumItems = values.reduce((s, a) => s + parseFloat(a.menuPrice), 0);
    let sumCombo = 0
    disc.value = 0

    for (const x in combo.value) {
        disc.value += parseFloat(combo.value[x].disc)
        const values2 = Object.values(combo.value[x].members);
        sumCombo += values2.reduce((s, a) => s + parseFloat(a.menuPrice), 0);
    }
    return sumCombo + sumItems
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
    const que = query(fireRef(db, 'Combo'));
    combo.value =  internalInstance.appContext.config.globalProperties.gVar.combo

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
        console.log('COMBO',combo.value)
        updateKey.value+=1
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
</style>