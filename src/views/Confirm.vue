gory <template>
    <v-container class="pb-0">
        <v-img src="" class="align-end text-white py-0" height="150" cover>
            <v-card-title class="text-body-1">
                <span>Home</span>
                <v-icon icon="mdi-chevron-right"></v-icon>
                <span>Order</span>
                <v-icon icon="mdi-chevron-right"></v-icon>
                <span>Confirm</span>
                <h1 class="text-h4"
                    style="font-family: Montserrat !important; font-weight: 800; text-transform: uppercase !important;">
                    Place Order
                </h1>
            </v-card-title>
        </v-img>
    </v-container>
    <v-container>
        <v-form ref="myForm">
        <v-row>
            <v-col class="" cols="12" sm="8" style="background-color: 0E0E10;">
                <v-responsive style="background-color: #0E0E10;" class="px-5 pt-4 my-0">
                    <h3 class="text-h5 font-weight-bold mb-4">
                        Reservation Details
                    </h3>
                    <v-row class="pa-2 mb-2">
                        <!-- <v-col cols="12" class=" pa-1"> -->
                            <!-- <h4>Reservation Details</h4> -->
                        <!-- </v-col> -->
                        <v-col cols="12" class="px-1 text-body-2" sm="6">
                            <v-text-field hide-details="auto" class="mr-" label="Name" required v-model="data.name" :rules ="data.inputRules" density="compact"
                                variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="px-1 text-body-2" sm="6"> 
                            <v-text-field hide-details="auto" class="ml-" required :rules ="data.inputRules" v-model="data.contact" label="Contact" density="compact"
                                variant="outlined" prefix="+63" prepend-inner-icon="mdi-phone"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="px-1 text-body-2" sm="12">
                            <v-textarea
                                label="Delivery Address"
                                :rules ="data.inputRules"
                                required
                                v-model="data.address"
                                row-height="40"
                                rows="2"
                                variant="outlined"
                                density="compact"
                                auto-grow
                            ></v-textarea>
                        </v-col>
                     <!--
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
                        </v-col> -->
                        <v-col cols="12" class=" pa-1">
                            <h4>Date & Time <v-icon size="small">mdi-information-outline</v-icon></h4>
                        </v-col>
<v-col cols="6" class="px-1 text-body-2" sm="6">
  <v-menu
    v-model="menuDate"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ props }">
      <v-text-field
        v-model="date"
        label="Select Date"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="props"
        density="compact"
        variant="outlined"
        required
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      scrollable
      @input="menuDate = false"
    ></v-date-picker>
  </v-menu>
</v-col>
<v-col cols="6" class="px-1 text-body-2" sm="6">
  <v-menu
    v-model="menuTime"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ props }">
      <v-text-field
        v-model="time"
        label="Select Time"
        prepend-icon="mdi-clock-outline"
        readonly
        v-bind="props"
        density="compact"
        variant="outlined"
        required
      ></v-text-field>
    </template>
    <v-time-picker
      v-model="time"
      format="ampm"
      @input="menuTime = false"
    ></v-time-picker>
  </v-menu>
</v-col>
                        <v-col cols="12" sm="12">
                            <label v-show="dateError" class="text-red">Please Select Date & Time.</label>
                        </v-col>
                    </v-row>
                </v-responsive>

                <v-responsive style="background-color: #0E0E10;" class="px-5 py-4 my-4">
                    <h3 class="text-h8 font-weight-bold mb-4">
                        ORDERED ITEMS ({{ cartStore.orders.items ? cartStore.orders.items.length : 0 }})
                    </h3>
                    <v-table density="comfortable" style="background-color: #0E0E10;">
                        <thead >
                            <tr class="font-weight-bold">
                                <th class="text-left" style="width: 15px;">
                                    #
                                </th>
                                <th class="text-left pl-0 ">
                                    Item
                                </th>
                                <th class="text-right">
                                    Qty
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, i) in (cartStore.orders.items || [])" :key="i">
                                <td  style="width: 15px;">{{ i+1 }}</td>
                                <td class="pl-0">
                                    <div class="d-flex align-center ">
                                        <div class="img-wrapper" style="position: relative; display: inline-block;">
                                            <v-img class="align-end text-white my-3" aspect-ratio="1" height="50" width="50"
                                                cover
                                                :src="item.img">
                                                <template v-slot:placeholder>
                                                    <div class="d-flex align-center justify-center fill-height">
                                                        <v-progress-circular color="grey-lighten-4"
                                                            indeterminate></v-progress-circular>
                                                    </div>
                                                </template>
                                            </v-img>
                                            <!-- Download button removed as per request -->
                                        </div>
                                        <div class=" ml-3 ">
                                            <h4 class="text-grey">{{ item.menuName }} <small v-if="item.selectedSize">({{ item.selectedSize }})</small></h4>
                                            <div class="text-grey text-caption py-"> Fried Spare Ribs</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-right">{{ item.buyQty }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                    <!-- <div v-for="x in 4">

                        <v-divider></v-divider>
                        <div class="d-flex align-center py-2 justify-space-between">
                            <div class="d-flex align-center">
                                <div class="mr-1">
                                    <v-img class="align-end text-white " aspect-ratio="1" height="50" width="50" cover
                                        src="https://firebasestorage.googleapis.com/v0/b/postres-c30e4.appspot.com/o/img%2FIMG_20220420_133639.jpg?alt=media&token=bc565fbc-7776-4c8d-90c4-604d758e767a">
                                        <template v-slot:placeholder>
                                            <div class="d-flex align-center justify-center fill-height">
                                                <v-progress-circular color="grey-lighten-4"
                                                    indeterminate></v-progress-circular>
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
                                <div class="text-body-2 ">Qty (1)</div>
                            </div>
                            <div>
                                <div class="font-weight-bold text-body-2 me-auto"><span>&#8369;</span> {{ data.price }}
                                </div>
                            </div>
                        </div>
                    </div> -->
                </v-responsive>
                <div class="d-flex justify-center my-10">
                    <router-link :to="{ name: 'Menu' }"> 
                            <v-btn prepend-icon="mdi-arrow-left-drop-circle" size="x-large" variant="outlined"
                                color="orange-accent-4" class="font-weight-bold ">Go to Menu</v-btn>

                        </router-link>
                </div>
            </v-col>
            <v-col class="" cols="12" sm="4" style="background-color: 15141B;">
                <v-responsive style="background-color: #15141B;" class="pa-5 my-0 ">
                    
                    <!-- <div class="payment-mode d-flex align-center justify-space-between ">
                        <div class="w-50 h-25">
                            <v-img class=" " cover
                                src="https://i0.wp.com/gcashresource.com/wp-content/uploads/2023/02/GCash_Horizontal-Full-Blue-Transparent.png?resize=1536%2C511&ssl=1"></v-img>
                        </div>
                        <v-radio inline color="blue-accent-2" label="" value=""></v-radio>
                    </div> -->
                  
                    <h3 class="text-h6 font-weight-bold my-0 pt-0">ORDER SUMMARY</h3>
                    <v-divider class="my-4"></v-divider>
                    <table class="w-100 pt-4">
                        <tbody>
                            <tr>
                                <td class="text-grey text-body-2 py-1">Subtotal</td>
                                <td class="text-right text-body-2 py-1"><span>&#8369;</span> {{ subtotal.toLocaleString('en-US') }}</td>
                                
                            </tr>
                            <tr>
                                <td class="text-grey text-body-2 py-1">Discount</td>
                                <td class="text-right text-body-2 py-1"><span>&#8369;</span> {{ cartStore.orders.disctotal.toLocaleString('en-US')  }}</td>
                            </tr>
                            <tr>
                                <td class="text-grey text-body-2 py-1">Delivery fee</td>
                                <td class="text-right text-body-2 py-1"><span>&#8369;</span> 0</td>
                            </tr>
                        </tbody>
                    </table>
                    <v-divider class="my-4"></v-divider>
                    
                    <table class="w-100">
                        <tr>
                            <td class="text-grey text-body-2 text-uppercase">Amount to pay</td>
                            <td class="text-right text-h5 text-orange-accent-4"><span>&#8369;</span> {{ (cartStore.orders.total ).toLocaleString('en-US')  }}</td>
                        </tr>
                    </table>
                    
                    <!-- <br/>
                    <h3 class="text-h10 font-weight-bold  text-uppercase">Payment Method</h3>
                    <div class="payment-mode d-flex align-center justify-space-between">
                        <div class="w-50 " style="height: 4rem; ">
                            <v-img class=" " cover src="@/assets/cod.jpg"></v-img>
                        </div>
                        <v-radio inline color="blue-accent-2" vallue="1"></v-radio>
                    </div> -->

                    <v-btn block="" color="orange-accent-4" @click="submit" class="mt-6 font-weight-bold">Generate Details</v-btn>
                </v-responsive>
            </v-col>
        </v-row>
    </v-form>
    </v-container>

    <!-- MODAL -->
    <v-dialog v-model="menudialog" fullscreen :scrim="false" scrollable transition="dialog-bottom-transition">
        <v-card color="#111">
            <v-toolbar color="#111">
                <v-btn @click="menudialog = false" icon>
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-toolbar-title>Reservation Details</v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn> -->
                <v-btn icon @click="menudialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text>
    
      
      <v-container fluid class="fill-height">
      <v-row style="border:1px solid greenyellow;">
         <v-col cols="12" sm="12" class="d-flex justify-center">
<div ref="copytextRef" style="white-space: pre-line;">
                𝙍𝙀𝙎𝙀𝙍𝙑𝘼𝙏𝙄𝙊𝙉 𝙁𝙊𝙍𝙈  <br>
                𝑷𝒐𝒔𝒕𝒓𝒆 𝑪𝒓𝒆𝒑𝒆 𝒅𝒆 𝑴𝒂𝒏𝒈𝒐'𝒔: <br>
                𝑫𝒂𝒕𝒆&𝑻𝒊𝒎𝒆: {{ format_date(date) }}, {{format_time(time)}}<br>
                𝑵𝒂𝒎𝒆: {{ data.name }}<br>
                𝑪𝒐𝒏𝒕𝒂𝒄𝒕#: {{ data.contact }}<br>
                𝑶𝒓𝒅𝒆𝒓: <br>
<span v-for="(item, i) in cartStore.orders.items" :key="i">
  {{ item.buyQty }}x {{ item.selectedSize ? item.selectedSize.charAt(0).toUpperCase() : '' }} {{ item.menuName }}<br>
</span>
                Delivery Fee: (unknown)<br>
                Total: {{ cartStore.orders.total.toLocaleString('en-US') }}<br>
                𝑳𝒐𝒄𝒂𝒕𝒊𝒐𝒏,,𝒍𝒂𝒏𝒅𝒎𝒂𝒓𝒌: {{ data.address }}
            </div>
        </v-col>
    </v-row>
    <div class="mt-2 text-subtitle-2">
        <v-alert
            border="top"
            colored-border
            type="info"
            elevation="2"
            >
            Copy the details and send it to <a href="https://www.facebook.com/nikotinzxcv">Postre Niko</a> or send it via SMS to 09914680084 <br>
            Delivery Fee is not included in the total amount.
        </v-alert>
    </div>
    <v-col cols="12" sm="12" class="d-flex justify-center">
            <v-btn
            class="text-none"
            color="green-accent-4"
            rounded="0"
            variant="tonal"
            v-bind="props"
            size = "x-large"
            @click="copy"
          >
            COPY TEXT
          </v-btn>
     </v-col>
   </v-container>
    </v-card-text>
        </v-card>
    </v-dialog>

    <v-snackbar
      v-model="copySnackbar"
      :color="copySnackbarColor"
      :timeout="4000"
    >
      {{ copySnackbarText }}
    </v-snackbar>
    
</template>
<script setup>
import { getCurrentInstance, onMounted, computed, ref } from 'vue';
import moment from 'moment';
import { useCartStore } from '@/stores/cart'; // Import the Pinia store
import { ref as dbRef, push, set } from 'firebase/database';
import { db } from '@/firebase';

// Download image utility
function downloadImage(url, name) {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = name ? `${name}.jpg` : 'image.jpg';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      }, 100);
    });
}

// Initialize the store
const cartStore = useCartStore();

// Reactive state
const date = ref(null);
const time = ref(null);
const menuDate = ref(false);
const menuTime = ref(false);
const myForm = ref();
const dateError = ref(false);
const menudialog = ref(false);
const copySnackbar = ref(false);
const copySnackbarText = ref('');
const copySnackbarColor = ref('success');
const copytextRef = ref(null);
const data = ref({
  name: '',
  contact: '',
  address: '',
  inputRules: [
    value => (value ? true : 'Field is required.'),
  ],
});

// Computed properties
const subtotal = computed(() => {
  return cartStore.orders.items.reduce((sum, item) => {
    const price =
      item.menuPrices && typeof item.menuPrices === 'object' && item.selectedSize
        ? Number(item.menuPrices[item.selectedSize]) || 0
        : Number(item.menuPrices) || 0;
    const qty = Number(item.buyQty) || 0;
    return sum + price * qty;
  }, 0);
});

// Lifecycle hooks
onMounted(() => {
  window.scrollTo(0, 0);
});

// Methods
const submit = async () => {
  myForm.value?.validate().then(async ({ valid: isValid }) => {
    if (time.value == null || date.value == null) {
      dateError.value = true;
      window.scrollTo(0, 0);
    } else {
      dateError.value = false;

      try {
        // Create reservation object with proper order structure
        const reservationData = {
          resname: data.value.name,
          resdate: moment(date.value).format('YYYY-MM-DD') + ' ' + moment(time.value, 'HH:mm').format('HH:mm:ss'),
          contact: data.value.contact,
          address: data.value.address,
          order: cartStore.orders.items.map((item, index) => ({
            id: item.id || `item_${index}_${Date.now()}`,
            menuName: item.menuName || 'Unknown Item',
            selectedSize: item.selectedSize || null,
            buyQty: item.buyQty || 0,
            price: item.menuPrices && typeof item.menuPrices === 'object' && item.selectedSize
              ? Number(item.menuPrices[item.selectedSize]) || 0
              : Number(item.menuPrices) || 0,
            img: item.img || '',
            menuPrices: item.menuPrices || {}
          })),
          total: cartStore.orders.total,
                    createdAt: new Date().toISOString(),
          status: 'active'
        };

        // Save to Firebase
        const reservationsRef = dbRef(db, 'reservations');
        const newReservationRef = push(reservationsRef);
        await set(newReservationRef, reservationData);

        // Show success message
        copySnackbarText.value = 'Reservation saved successfully!';
        copySnackbarColor.value = 'success';
        copySnackbar.value = true;

        // Show confirmation dialog
        menudialog.value = true;
      } catch (error) {
        console.error('Error saving reservation:', error);
        copySnackbarText.value = 'Error saving reservation: ' + error.message;
        copySnackbarColor.value = 'error';
        copySnackbar.value = true;
      }
    }
  });
};

const copy = async () => {
  try {
    if (!copytextRef.value) {
      throw new Error('Copy text element not initialized');
    }
    
    const textToCopy = copytextRef.value.textContent?.trim();
    if (!textToCopy) {
      throw new Error('Text content is empty');
    }

    await navigator.clipboard.writeText(textToCopy);
    copySnackbarText.value = 'Text copied to clipboard!';
    copySnackbarColor.value = 'success';
  } catch (error) {
    copySnackbarText.value = 'Failed to copy text: ' + error.message;
    copySnackbarColor.value = 'error';
    console.error('Copy failed:', error);
  } finally {
    copySnackbar.value = true;
  }
};

const format_date = (value) => {
  if (value) {
    return moment(String(value)).format('MMM DD, YYYY');
  }
};

const format_time = (value) => {
  if (value) {
    return moment(value, 'HH:mm').format('h:mm A');
  }
};
</script>
<style lang="scss" scoped>
.download-btn {
  border-radius: 50% !important;
  min-width: 32px !important;
  min-height: 32px !important;
  width: 32px !important;
  height: 32px !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  transition: background 0.2s, color 0.2s;
  z-index: 2;
}
.download-btn:hover {
  background: #ff1744 !important;
  color: #fff !important;
}
table,
tr,
td,
h4,
h3 {
    font-family: 'Roboto' !important;
    border: none !important;
}

.payment-mode {
    border: 1px solid rgb(85, 194, 245);
    border-radius: 1rem;
    margin: 1rem 0;
    padding: 1rem 1rem;
}
</style>
