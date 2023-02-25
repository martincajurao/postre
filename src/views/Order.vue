<template>
    <v-container>
        <v-row class="checkout mt-15">
            <v-col class="" cols="12" sm="8" style="background-color: 0E0E10;">
                <v-responsive style="background-color: #0E0E10;" class="px-5 pt-4 my-4">
                    <h3 class="text-h5 font-weight-bold">
                        Your Order
                    </h3>
                    <div class="d-flex align-center justify-space-between">
                        <v-checkbox color="red-accent-1" chips="true" hide-details="true" label="Select all items"
                            class="text-body-2"></v-checkbox>
                        <v-btn density="comfortable" variant="text" size="small" icon="mdi-delete-empty"></v-btn>
                    </div>
                </v-responsive>
                <v-responsive style="background-color: #0E0E10;" class="pa-5 my-4 ">
                    <div class="d-flex align-center justify-space-between">
                        <h3>Package Combo </h3>
                        <div>
                            <v-btn density="comfortable" variant="text" size="small" icon="mdi-plus"></v-btn>
                            <v-btn density="comfortable" variant="text" size="small" icon="mdi-delete-empty"></v-btn>
                        </div>
                    </div>
                    <div class="d-flex align-center justify-left">
                        <v-checkbox label="Comida Combo #1" class="text-body-2 d-inline-flex font-weight-bold">
                        </v-checkbox>
                        <v-btn density="comfortable" variant="text" size="small" icon="mdi-swap-horizontal"></v-btn>
                    </div>

                    <Item :data="gVar.items" v-for="item in gVar.itemsx"  />
                

                </v-responsive>
                <v-responsive style="background-color: #0E0E10;" class="pa-5 my-4 ">
                    <div class="d-flex justify-space-between align-center mb-5">
                        <h3 class="mt-">Per Menu</h3>
                        <v-btn prepend-icon="mdi-plus" variant="text" size="small">Add item</v-btn>
                    </div>
                    <div  v-for="item in gVar.items">
                        <Item :data="item" />
                    </div>

                </v-responsive>
            </v-col>
            <v-col class="" cols="12" sm="4" style="background-color: 15141B;">
                <v-responsive style="background-color: #15141B;" class="pa-5 my-4 ">
                    <h3 class="text-h5 font-weight-bold">Order Summary</h3>
                    <!-- <div class="text-caption  text-grey ">Your order Sumarry</div> -->
                    <v-divider class="my-4"></v-divider>
                    <table class="w-100 pt-4">
                        <tbody>
                            <tr>
                                <td class="text-grey text-body-2 py-1">Subtotal</td>
                                <td class="text-right text-body-2 py-1"><span>&#8369;</span> 1200</td>
                            </tr>
                            <tr>
                                <td class="text-grey text-body-2 py-1">Discount</td>
                                <td class="text-right text-body-2 py-1"><span>&#8369;</span> 200</td>
                            </tr>
                            <tr>
                                <td class="text-grey text-body-2 py-1">Delivery fee</td>
                                <td class="text-right text-body-2 py-1"><span>&#8369;</span> 50</td>
                            </tr>
                        </tbody>
                    </table>
                    <v-divider class="my-4"></v-divider>
                    <table class="w-100">
                        <tr>
                            <td class="text-grey text-body-2">Total Amount</td>
                            <td class="text-right "><span>&#8369;</span> 1050</td>
                        </tr>
                    </table>
                    <v-btn to="Confirm" block="" color="orange-accent-4" class="mt-6 font-weight-bold">Checkout (2)</v-btn>
                </v-responsive>
            </v-col>
        </v-row>
    </v-container>
    <!-- {{ gVar.items }} -->
</template>
<script setup>
import { ref, onMounted,  inject } from 'vue'
import Item from '@/components/Items.vue'

const emitter = inject('emitter'); 

const items = ref()

onMounted( () => {
    // items = this.gVar.home

    // emitter.on('add-permenu-items', (i) => {   // *Listen* for event
        
    //     items.value = "dsadf"
    // });
    // console.log('asdasdsadasda', gVar.home)
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
</style>