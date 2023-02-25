<template>
        <v-container class="">
            <v-img src="" class="align-end text-white banner-img py-0" height="160" cover>
                <v-card-title class="">
                    <div class="text-body-1">Order | Checkout | Confirm</div>
                    <h1 class="text-h4"
                        style="font-family: Montserrat !important; font-weight: 800; text-transform: uppercase !important;">
                        Place Order</h1>
                </v-card-title>
            </v-img>
        </v-container>
    <v-container>
        <v-row class="checkout ">
            <v-col class="" cols="12" sm="8" style="background-color: 0E0E10;">
                <v-responsive style="background-color: #0E0E10;" class="px-5 pt-4 my-4">
                    <h3 class="text-h5 font-weight-bold mb-4">
                        DELIVERY
                    </h3>
                    <v-row class="pa-2 mb-2">
                        <v-col cols="12" class=" pa-1">
                            <h4>Delivery Address</h4>
                        </v-col>
                        <v-col cols="12" class="px-1 text-body-2" sm="6">
                            <v-text-field hide-details="auto" class="mr-" label="Name" density="compact"
                                variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="px-1 text-body-2" sm="6">
                            <v-text-field hide-details="auto" class="ml-" label="Contact" density="compact"
                                variant="outlined" prefix="+63" prepend-inner-icon="mdi-phone"></v-text-field>
                        </v-col>
                        <v-col cols="6" class="px-1 text-body-2" sm="6">
                            <v-select hide-details="auto" class="mr-" density="compact" variant="outlined" label="Province"
                                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
                        </v-col>
                        <v-col cols="6" class="px-1 text-body-2" sm="6">
                            <v-select hide-details="auto" class="ml-" density="compact" variant="outlined" label="City"
                                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
                        </v-col>
                        <v-col cols="9" class="px-1 text-body-2" sm="9">
                            <v-select hide-details="auto" class="ml-" density="compact" variant="outlined" label="Barangay"
                                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
                        </v-col>
                        <v-col cols="3" class="px-1 text-body-2" sm="3">
                            <v-text-field hide-details="auto" class="ml-" label="Zip" density="compact"
                                variant="outlined"></v-text-field>

                        </v-col>
                        <v-col cols="12" class="px-1 text-body-2" sm="12">
                            <v-text-field hide-details="auto" label="Street / Block No. / Zone / Brgy." density="compact"
                                variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="px-1 text-body-2" sm="12">
                            <v-text-field hide-details="auto" label="Apt / Unit / House / Lot" density="compact"
                                variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" class=" pa-1">
                            <h4>Reservation Date <v-icon size="small">mdi-information-outline</v-icon></h4>
                        </v-col>
                        <v-col cols="6" class="px-1 text-body-2" sm="6">
                            <VueDatePicker placeholder="Select Date" :offset="-20" dark v-model="date"
                                :enable-time-picker="false" />
                        </v-col>
                        <v-col cols="6" class="px-1 text-body-2" sm="6">
                            <VueDatePicker placeholder="Select Time" :offset="-20" dark v-model="time" time-picker
                                :is-24="false" />
                        </v-col>
                    </v-row>
                </v-responsive>

                <v-responsive style="background-color: #0E0E10;" class="px-5 pt-4 my-4">
                    <h3 class="text-h5 font-weight-bold mb-4">
                        ORDERED ITEMS (4)
                    </h3>
                    <h4 class="py-2">Comida Combo #1</h4 >
                    <div v-for="x in 4">
                        
                        <v-divider></v-divider>
                        <div class="d-flex align-center py-2 justify-space-between">
                            <div class="d-flex align-center">
                                <div class="mr-1">
                                    <v-img class="align-end text-white " aspect-ratio="1" height="50" width="50" cover
                                        src="https://firebasestorage.googleapis.com/v0/b/postres-c30e4.appspot.com/o/img%2FIMG_20220420_133639.jpg?alt=media&token=bc565fbc-7776-4c8d-90c4-604d758e767a">
                                        <template v-slot:placeholder>
                                            <div class="d-flex align-center justify-center fill-height">
                                                <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                            </div>
                                        </template>
                                    </v-img>
                                </div>
                                <div class=" mx-3 ">
                                    <h4 class="text-grey">{{ data.name }}</h4>
                                    <div class="text-grey text-caption py-"> Fried Spare Ribs</div>
                                </div>
                            </div>
                            <div>
                                <div v-if="data.disc" class="text-caption text-green-accent-3">Discounted</div>
                            </div>
                            <div>
                                <div  class="text-body-2 ">Qty (1)</div>
                            </div>
                            <div>
                                <div class="font-weight-bold text-body-2 me-auto"><span>&#8369;</span> {{ data.price }}</div>
                            </div>
                        </div>
                    </div>
                </v-responsive>
                <div class="d-flex justify-center my-10">
                    <v-btn prepend-icon="mdi-arrow-left-drop-circle" size="x-large" variant="outlined" color="orange-accent-4" class="font-weight-bold ">Go to Menu</v-btn>
                </div>
            </v-col>
            <v-col class="" cols="12" sm="4" style="background-color: 15141B;">
                <v-responsive style="background-color: #15141B;" class="pa-5 my-4 ">
                    <h3 class="text-h6 font-weight-bold  text-uppercase">Payment Methods</h3>
                    <div class="payment-mode d-flex align-center justify-space-between">
                        <div class="w-50 " style="height: 4rem;">
                            <v-img class=" " cover src="@/assets/cod.jpg"></v-img>
                        </div>
                        <v-radio inline color="blue-accent-2" label="" value=""></v-radio>
                    </div>
                    <div class="payment-mode d-flex align-center justify-space-between ">
                        <div class="w-50 h-25">
                            <v-img class=" " cover
                                src="https://i0.wp.com/gcashresource.com/wp-content/uploads/2023/02/GCash_Horizontal-Full-Blue-Transparent.png?resize=1536%2C511&ssl=1"></v-img>
                        </div>
                        <v-radio inline color="blue-accent-2" label="" value=""></v-radio>
                    </div>
                    <v-radio-group v-model="inline" inline>
                    </v-radio-group>
                    <h3 class="text-h6 font-weight-bold my-2">SUMMARY</h3>
                    <!-- <div class="text-caption  text-grey ">Your order Sumarry</div> -->
                    <v-divider class="my-4"></v-divider>
                    <table class="w-100 pt-4">
                        <tbody>
                            <tr>
                                <td class="text-grey text-body-2 py-1">Subtotal (4 items)</td>
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
                            <td class="text-grey text-body-2 text-uppercase">Amount to pay</td>
                            <td class="text-right text-h5 text-orange-accent-4"><span>&#8369;</span> 1050</td>
                        </tr>
                    </table>
                    <v-btn block="" color="orange-accent-4" class="mt-6 font-weight-bold">Place Order</v-btn>
                </v-responsive>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
const date = ref(null)
const time = ref(null)
const data = ref({
    name: 'Pork Spare ribs',
    price: 1400,
    disc: true
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

.payment-mode {
    border: 1px solid rgb(85, 194, 245);
    border-radius: 1rem;
    margin: 1rem 0;
    padding: 1rem 1rem;
}
</style>