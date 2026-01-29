<template>
  <v-app theme="dark">
    <!-- Modern Navigation Drawer for Order Summary -->
    <v-navigation-drawer
      v-model="showOrderSummary"
      location="right"
      width="380"
      temporary
      class="order-summary-drawer"
      elevation="12"
      color="#212121"
    >
      <div class="pa-6">
        <div class="d-flex justify-space-between align-center mb-6">
          <h3 class="text-h5 font-weight-bold text-primary">Order Summary</h3>
          <v-btn
            icon="mdi-close"
            variant="flat"
            size="small"
            color="transparent"
            @click="showOrderSummary = false"
          />
        </div>
        
        <v-divider class="mb-6"></v-divider>
        
        <div class="mb-4">
          <div class="text-subtitle-2 text-medium-emphasis mb-2">Date Filter</div>
          <div class="text-body-1 font-weight-medium text-white">
            {{ formattedDate || 'All Reservations' }}
          </div>
        </div>

        <v-divider class="mb-6"></v-divider>

        <div class="order-items">
          <div v-for="(count, name) in menuCounts" :key="name" class="d-flex justify-space-between align-center py-3 border-b border-opacity-10 border-grey-lighten-2">
            <div class="text-body-1 text-white">{{ name }}</div>
            <v-chip
              color="primary"
              variant="elevated"
              size="small"
              class="font-weight-bold"
            >
              {{ count }}
            </v-chip>
          </div>
        </div>

        <v-divider class="my-6"></v-divider>

        <div class="d-flex justify-space-between align-center">
          <span class="text-h6 font-weight-bold text-white">Total Items</span>
          <span class="text-h6 font-weight-bold text-primary">
            {{ Object.values(menuCounts).reduce((a, b) => a + b, 0) }}
          </span>
        </div>
      </div>
    </v-navigation-drawer>

    <!-- Modern Dark App Bar -->
    <v-app-bar
      app
      color="#212121"
      elevation="4"
      class="px-4"
    >
      <v-app-bar-nav-icon
        v-if="!display.mdAndUp.value"
        @click="drawer = !drawer"
        color="white"
      />
      
      <v-toolbar-title class="text-h5 font-weight-bold text-primary">
        Postre Dashboard
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="toggleOrderSummary"
        :color="showOrderSummary ? 'primary' : 'grey-lighten-1'"
        variant="flat"
        class="mr-2"
      >
        <v-icon>{{ showOrderSummary ? 'mdi-close' : 'mdi-format-list-bulleted' }}</v-icon>
      </v-btn>

      <v-btn
        icon
        color="primary"
        @click="openCreateDialog"
        variant="flat"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="bg-grey-darken-4">
      <v-container fluid class="pa-8">
        <!-- Header Section -->
        <v-row class="mb-8">
          <v-col cols="12">
            <div class="d-flex flex-wrap align-center justify-space-between">
              <div>
                <h1 class="text-h4 font-weight-bold text-white mb-2">
                  Reservations Management
                </h1>
                <p class="text-subtitle-1 text-grey-lighten-2">
                  Manage and track all customer reservations
                </p>
              </div>
              
              <div class="d-flex flex-wrap gap-3 mt-4 mt-md-0">
                <v-btn-group
                  variant="outlined"
                  divided
                  color="primary"
                  class="mr-2"
                >
                  <v-btn
                    @click="selectToday"
                    :variant="isTodaySelected ? 'flat' : 'outlined'"
                  >
                    Today
                  </v-btn>
                  <v-btn
                    @click="selectTomorrow"
                    :variant="isTomorrowSelected ? 'flat' : 'outlined'"
                  >
                    Tomorrow
                  </v-btn>
                  <v-btn
                    @click="displayAll"
                    :variant="!selectedDate && !selectedMonth && !selectedYear ? 'flat' : 'outlined'"
                  >
                    All
                  </v-btn>
                </v-btn-group>

                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      color="primary"
                      prepend-icon="mdi-calendar"
                      variant="flat"
                    >
                      {{ selectedDate ? formattedDate : 'Filter by Date' }}
                    </v-btn>
                  </template>
                  <v-date-picker
                    v-model="selectedDate"
                    @update:model-value="menu = false"
                    color="primary"
                    bg-color="#2a2a2a"
                  />
                </v-menu>

                <v-select
                  v-model="selectedMonth"
                  :items="months"
                  label="Filter by Month"
                  variant="outlined"
                  density="comfortable"
                  clearable
                  hide-details
                  class="month-select"
                  color="primary"
                  bg-color="#2a2a2a"
                ></v-select>

                <v-select
                  v-model="selectedYear"
                  :items="years"
                  label="Filter by Year"
                  variant="outlined"
                  density="comfortable"
                  clearable
                  hide-details
                  class="year-select"
                  color="primary"
                  bg-color="#2a2a2a"
                ></v-select>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- Statistics Cards -->
        <v-row class="mb-8">
          <v-col cols="12" sm="6" md="3">
            <v-card class="pa-5 rounded-lg" elevation="6" color="#2a2a2a">
              <div class="d-flex align-center">
                <v-icon color="primary" size="36" class="mr-4">mdi-calendar-check</v-icon>
                <div>
                  <div class="text-h5 font-weight-bold text-white">{{ filteredReservations.length }}</div>
                  <div class="text-subtitle-2 text-grey-lighten-2">Total Reservations</div>
                </div>
              </div>
            </v-card>
          </v-col>
          
          <v-col cols="12" sm="6" md="3">
            <v-card class="pa-5 rounded-lg" elevation="6" color="#2a2a2a">
              <div class="d-flex align-center">
                <v-icon color="success" size="36" class="mr-4">mdi-package-variant</v-icon>
                <div>
                  <div class="text-h5 font-weight-bold text-white">
                    {{ Object.values(menuCounts).reduce((a, b) => a + b, 0) }}
                  </div>
                  <div class="text-subtitle-2 text-grey-lighten-2">Total Items</div>
                </div>
              </div>
            </v-card>
          </v-col>
          
          <v-col cols="12" sm="6" md="3">
            <v-card class="pa-5 rounded-lg" elevation="6" color="#2a2a2a">
              <div class="d-flex align-center">
                <v-icon color="warning" size="36" class="mr-4">mdi-currency-php</v-icon>
                <div>
                  <div class="text-h5 font-weight-bold text-white">
                    ₱{{ filteredReservations.reduce((sum, item) => sum + item.total, 0).toLocaleString() }}
                  </div>
                  <div class="text-subtitle-2 text-grey-lighten-2">Total Revenue</div>
                </div>
              </div>
            </v-card>
          </v-col>
          
          <v-col cols="12" sm="6" md="3">
            <v-card class="pa-5 rounded-lg" elevation="6" color="#2a2a2a">
              <div class="d-flex align-center">
                <v-icon color="info" size="36" class="mr-4">mdi-clock-outline</v-icon>
                <div>
                  <div class="text-h5 font-weight-bold text-white">
                    {{ filteredReservations.filter(r => moment(r.resdate, 'MMM DD, YYYY, h:mm A').isAfter(moment())).length }}
                  </div>
                  <div class="text-subtitle-2 text-grey-lighten-2">Upcoming</div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Reservations Table -->
        <v-row>
          <v-col cols="12">
            <v-card elevation="6" color="#2a2a2a" class="rounded-lg">
              <v-card-text class="pa-0">
                <v-data-table
                  :headers="headers"
                  :items="filteredReservations"
                  :loading="loading"
                  class="elevation-0"
                  item-key="id"
                  hover
                  :items-per-page="10"
                  :items-per-page-options="[5, 10, 25, 50]"
                  :sort-by="[{ key: 'resdate', order: 'asc' }]"
                >
                  <template v-slot:loading>
                    <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
                  </template>

                  <template v-slot:item.order="{ item }">
                    <div class="order-full-list">
                      <div v-for="orderItem in item.order" :key="orderItem.id" 
                           class="text-caption mb-1 text-white">
                        <span class="font-weight-medium">{{ orderItem.buyQty }}×</span>
                        {{ orderItem.menuName }}
                        <span v-if="orderItem.selectedSize" class="text-medium-emphasis">
                          ({{ orderItem.selectedSize.charAt(0).toUpperCase() }})
                        </span>
                      </div>
                    </div>
                  </template>

                  <template v-slot:item.items="{ item }">
                    <v-chip
                      color="primary"
                      variant="flat"
                      size="small"
                    >
                      {{ item.order?.reduce((sum, orderItem) => sum + (orderItem.buyQty || 0), 0) || 0 }}
                    </v-chip>
                  </template>

                  <template v-slot:item.total="{ item }">
                    <span class="font-weight-bold text-primary">
                      ₱{{ item.total.toLocaleString() }}
                    </span>
                  </template>

                  <template v-slot:item.status="{ item }">
                    <v-chip :color="item.status === 'active' ? 'blue' : 'green'" label>
                      {{ item.status }}
                    </v-chip>
                  </template>

                  <template v-slot:item.actions="{ item }">
                    <div class="d-flex gap-2">
                      <v-btn
                        v-if="item.status === 'active'"
                        icon="mdi-check-circle"
                        variant="text"
                        color="success"
                        size="small"
                        @click="markAsDelivered(item)"
                      />
                      <v-btn
                        icon="mdi-pencil"
                        variant="text"
                        color="primary"
                        size="small"
                        @click="editReservation(item)"
                      />
                      <v-btn
                        icon="mdi-delete"
                        variant="text"
                        color="error"
                        size="small"
                        @click="openDeleteDialog(item)"
                      />
                    </div>
                  </template>

                  <template v-slot:no-data>
                    <div class="text-center pa-8">
                      <v-icon size="64" color="grey-darken-1" class="mb-4">
                        mdi-calendar-blank
                      </v-icon>
                      <div class="text-h6 text-medium-emphasis mb-2">No reservations found</div>
                      <div class="text-body-2 text-medium-emphasis mb-4">
                        {{ selectedDate ? 'No reservations for this date' : 'No reservations yet' }}
                      </div>
                      <v-btn
                        color="primary"
                        @click="openCreateDialog"
                        variant="flat"
                      >
                        Create First Reservation
                      </v-btn>
                    </div>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Enhanced Dialogs -->
    <v-dialog v-model="deleteDialog" max-width="450">
      <v-card color="#2a2a2a" class="rounded-lg">
        <v-card-title class="text-h6 font-weight-bold text-white">
          Confirm Deletion
        </v-card-title>
        <v-card-text class="text-grey-lighten-2">
          Are you sure you want to delete this reservation? This action cannot be undone.
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn
            color="grey-lighten-1"
            variant="text"
            @click="closeDeleteDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            color="error"
            variant="flat"
            @click="confirmDelete"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editDialog" max-width="550">
      <v-card color="#2a2a2a" class="rounded-lg">
        <v-card-title class="text-h6 font-weight-bold text-white">
          Edit Reservation
        </v-card-title>
        <v-card-text class="py-4">
          <v-form>
            <v-text-field
              v-model="editedItem.resname"
              label="Customer Name"
              variant="outlined"
              density="comfortable"
              color="primary"
              class="mb-4"
            />
            <v-text-field
              v-model="editedItem.contact"
              label="Contact Number"
              variant="outlined"
              density="comfortable"
              color="primary"
              class="mb-4"
            />
            <v-text-field
              v-model="editedItem.address"
              label="Delivery Address"
              variant="outlined"
              density="comfortable"
              color="primary"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn
            color="grey-lighten-1"
            variant="text"
            @click="closeEditDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            variant="flat"
            @click="saveEdit"
          >
            Save Changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="createDialog" max-width="650">
      <v-card color="#2a2a2a" class="rounded-lg">
        <v-card-title class="text-h6 font-weight-bold text-white">
          Create New Reservation
        </v-card-title>
        <v-card-text class="py-4">
          <v-textarea
            v-model="pastedText"
            label="Paste reservation details"
            placeholder="Customer name, contact, address, order details..."
            rows="8"
            variant="outlined"
            density="comfortable"
            color="primary"
          />
          <v-progress-circular
            v-if="parsing"
            indeterminate
            color="primary"
            class="mt-4"
          />
          <pre v-if="parsedJson" class="mt-4 bg-grey-darken-3 pa-3 rounded text-white">
            {{ JSON.stringify(parsedJson, null, 2) }}
          </pre>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn
            color="grey-lighten-1"
            variant="text"
            @click="closeCreateDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            @click="parseOrderWithAI"
            :loading="parsing"
            variant="flat"
          >
            Parse & Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="3000"
      location="top"
    >
      {{ snackbarText }}
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useDisplay } from 'vuetify';
import { db } from '@/firebase';
import { ref as dbRef, onValue, remove, update, push, set } from 'firebase/database';
import moment from 'moment';

// Reactive State
const display = useDisplay();
const drawer = ref(display.mdAndUp.value);
const showOrderSummary = ref(false);
const reservations = ref([]);
const loading = ref(true);
const selectedDate = ref(null);
const selectedMonth = ref(null);
const selectedYear = ref(null);
const menu = ref(false);

const months = [
  { title: 'January', value: 0 },
  { title: 'February', value: 1 },
  { title: 'March', value: 2 },
  { title: 'April', value: 3 },
  { title: 'May', value: 4 },
  { title: 'June', value: 5 },
  { title: 'July', value: 6 },
  { title: 'August', value: 7 },
  { title: 'September', value: 8 },
  { title: 'October', value: 9 },
  { title: 'November', value: 10 },
  { title: 'December', value: 11 },
];

const years = computed(() => {
  const currentYear = moment().year();
  const yearsArray = [];
  for (let i = currentYear - 5; i <= currentYear + 1; i++) {
    yearsArray.push(i);
  }
  return yearsArray.reverse();
});
const deleteDialog = ref(false);
const editDialog = ref(false);
const createDialog = ref(false);
const itemToDelete = ref(null);
const editedItem = ref({});
const pastedText = ref('');
const snackbar = ref(false);
const snackbarText = ref('');
const snackbarColor = ref('success');
const parsedJson = ref(null);
const parsing = ref(false);

// Table Headers
const headers = [
  { title: 'Customer', align: 'start', sortable: true, value: 'resname' },
  { title: 'Date & Time', value: 'resdate', sortable: true, width: '150px' },
  { title: 'Contact', value: 'contact' },
  { title: 'Address', value: 'address', class: 'text-caption' },
  { title: 'Order Details', value: 'order', sortable: false, width: '200px' },
  { title: 'Items', value: 'items', align: 'center', sortable: true },
  { title: 'Total', value: 'total', align: 'end', sortable: true },
  { title: 'Status', value: 'status', align: 'center', sortable: true },
  { title: 'Actions', value: 'actions', align: 'center', sortable: false },
];

// Computed Properties
const formattedDate = computed(() => {
  if (selectedDate.value) {
    return moment(selectedDate.value).format('MMMM DD, YYYY');
  } else if (selectedMonth.value !== null && selectedYear.value !== null) {
    return moment().month(selectedMonth.value).year(selectedYear.value).format('MMMM YYYY');
  } else if (selectedMonth.value !== null) {
    return moment().month(selectedMonth.value).format('MMMM');
  } else if (selectedYear.value !== null) {
    return moment().year(selectedYear.value).format('YYYY');
  }
  return '';
});

const isTodaySelected = computed(() => {
  return selectedDate.value && moment(selectedDate.value).isSame(moment(), 'day');
});

const isTomorrowSelected = computed(() => {
  return selectedDate.value && moment(selectedDate.value).isSame(moment().add(1, 'day'), 'day');
});

const filteredReservations = computed(() => {
  let filtered = reservations.value;

  if (selectedDate.value) {
    const selected = moment(selectedDate.value);
    filtered = filtered.filter(reservation => {
      return moment(reservation.resdate, 'MMM DD, YYYY, h:mm A').isSame(selected, 'day');
    });
  } else if (selectedMonth.value !== null || selectedYear.value !== null) {
    filtered = filtered.filter(reservation => {
      const resMoment = moment(reservation.resdate, 'MMM DD, YYYY, h:mm A');
      const matchesMonth = selectedMonth.value === null || resMoment.month() === selectedMonth.value;
      const matchesYear = selectedYear.value === null || resMoment.year() === selectedYear.value;
      return matchesMonth && matchesYear;
    });
  }

  // Add filter for active reservations
  filtered = filtered.filter(reservation => reservation.status === 'active');

  return filtered;
});

const menuCounts = computed(() => {
  const counts = {};
  filteredReservations.value.forEach(reservation => {
    if (reservation.order && Array.isArray(reservation.order)) {
      reservation.order.forEach(item => {
        if (item.menuName) {
          counts[item.menuName] = (counts[item.menuName] || 0) + (item.buyQty || 0);
        }
      });
    }
  });
  return counts;
});

// Lifecycle Hooks
onMounted(() => {
  const reservationsRef = dbRef(db, 'reservations');
  onValue(reservationsRef, (snapshot) => {
    const data = snapshot.val();
    const reservationsArray = data ? Object.keys(data).map(key => {
      const reservation = data[key];
      let formattedDate;
      
      if (reservation.resdate && typeof reservation.resdate === 'object' && reservation.resdate.seconds) {
        formattedDate = moment(reservation.resdate.seconds * 1000).format('MMM DD, YYYY, h:mm A');
      } else if (reservation.resdate) {
        formattedDate = moment(reservation.resdate).format('MMM DD, YYYY, h:mm A');
      } else {
        formattedDate = moment().format('MMM DD, YYYY, h:mm A');
      }
      
      return {
        id: key,
        ...reservation,
        resdate: formattedDate,
        status: reservation.status || 'active' // Ensure status is set
      };
    }) : [];
    
    reservations.value = reservationsArray.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date();
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date();
      return dateB - dateA;
    });
    loading.value = false;
  });

  // Initialize month and year filters to current month/year if no specific date is selected
  if (!selectedDate.value) {
    selectedMonth.value = moment().month();
    selectedYear.value = moment().year();
  }
});

watch(selectedDate, (newValue) => {
  if (newValue !== null) {
    selectedMonth.value = null;
    selectedYear.value = null;
  }
});

watch([selectedMonth, selectedYear], ([newMonth, newYear]) => {
  if (newMonth !== null || newYear !== null) {
    selectedDate.value = null;
  }
});

// Methods
const selectToday = () => {
  selectedDate.value = new Date();
};

const selectTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  selectedDate.value = tomorrow;
};

const displayAll = () => {
  selectedDate.value = null;
  selectedMonth.value = null;
  selectedYear.value = null;
};

const editReservation = (item) => {
  editedItem.value = { ...item };
  editDialog.value = true;
};

const closeEditDialog = () => {
  editDialog.value = false;
  editedItem.value = {};
};

const saveEdit = () => {
  if (editedItem.value.id) {
    const reservationRef = dbRef(db, 'reservations/' + editedItem.value.id);
    const updates = {
      resname: editedItem.value.resname,
      contact: editedItem.value.contact,
      address: editedItem.value.address,
    };
    update(reservationRef, updates);
    showSnackbar('Reservation updated successfully', 'success');
  }
  closeEditDialog();
};

const openDeleteDialog = (item) => {
  itemToDelete.value = item;
  deleteDialog.value = true;
};

const closeDeleteDialog = () => {
  itemToDelete.value = null;
  deleteDialog.value = false;
};

const confirmDelete = () => {
  if (itemToDelete.value) {
    const reservationRef = dbRef(db, 'reservations/' + itemToDelete.value.id);
    remove(reservationRef);
    showSnackbar('Reservation deleted successfully', 'success');
  }
  closeDeleteDialog();
};

const markAsDelivered = async (item) => {
  try {
    const reservationRef = dbRef(db, 'reservations/' + item.id);
    await update(reservationRef, { status: 'delivered' });
    showSnackbar('Reservation marked as delivered!', 'success');
  } catch (error) {
    console.error('Error marking reservation as delivered:', error);
    showSnackbar('Failed to mark reservation as delivered.', 'error');
  }
};

const openCreateDialog = () => {
  pastedText.value = '';
  parsedJson.value = null;
  createDialog.value = true;
};

const closeCreateDialog = () => {
  createDialog.value = false;
  pastedText.value = '';
  parsedJson.value = null;
  parsing.value = false;
};

const parseOrderWithAI = async () => {
  if (!pastedText.value.trim()) {
    showSnackbar('Please enter order details', 'error');
    return;
  }

  parsing.value = true;
  const currentYear = new Date().getFullYear();
  
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new Error('OpenAI API key not configured. Please set VITE_OPENAI_API_KEY in your .env file');
    }
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an expert order text parser. Extract only the menu items, quantity, price, and other structured info from messy text. Return a JSON object with this structure:
              {
                "name": "customer name",
                "contact": "phone number",
                "address": "delivery address",
                "dateTime": "Full date & time (use the current year: ${currentYear} if year is missing)",
                "location": "location",
                "orders": [
                  {
                    "item": "MENU ITEM NAME (always uppercase, normalize variants)",
                    "quantity": number,
                    "price": number
                  }
                ],
                "total": total amount
              }

              Rules for normalization:
              - Treat "Bami", "Bam-i", and "Pancit Bam.i" as the same item → "PANCIT BAM-I"
              - Treat "Palabok" and "Pancit Palabok" as the same item → "PANCIT PALABOK"
              - Treat "Spare ribs", "Ribs" as "PORK SPARE RIBS"
              - Treat "MC" as "MANGO CREPE"
              - Items has Sizes like "Medium", "Large", "Small" should be normalized to "M", "L", "S".
              - Always save "item" with size in uppercase, e.g., "PANCIT BAM-I (M)" if no size is indicated, set (M) as default.
              - Always save "item" in uppercase.
              - Keep prices as numbers without currency symbols.
              - Ensure date always uses the current year: ${currentYear} if missing in the text.
              - Keep only relevant structured data, ignore any unrelated text.
              - If information is missing, leave the field as "N/A".
              - Output JSON must be valid and parseable.
              - Each detected order is its own object in the array.
              `
          }, 
          {
            role: "user",
            content: pastedText.value
          }
        ],
        temperature: 0
      })
    });

    const data = await response.json();
    let responseContent = data.choices[0].message.content;
    
    // Clean the response content to extract valid JSON
    // Remove markdown code blocks and backticks
    responseContent = responseContent.replace(/```json\s*/g, '');
    responseContent = responseContent.replace(/```\s*/g, '');
    responseContent = responseContent.trim();
    
    // Ensure we have valid JSON
    try {
      parsedJson.value = JSON.parse(responseContent);
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError);
      console.error('Response content:', responseContent);
      
      // Try to extract JSON from the response using regex as fallback
      const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          parsedJson.value = JSON.parse(jsonMatch[0]);
        } catch (fallbackError) {
          throw new Error('Unable to parse order data. Please check the format and try again.');
        }
      } else {
        throw new Error('No valid JSON found in response');
      }
    }
    
    await addParsedOrderToFirebase(parsedJson.value);
    showSnackbar('Order parsed and added successfully!', 'success');
    closeCreateDialog();
    
  } catch (error) {
    console.error('Error parsing order:', error);
    showSnackbar('Error parsing order. Please try again.', 'error');
  } finally {
    parsing.value = false;
  }
};

const addParsedOrderToFirebase = async (parsedOrder) => {
  try {
    // If parsedOrder is an array of orders, save each separately
    if (Array.isArray(parsedOrder)) {
      const reservationsRef = dbRef(db, 'reservations');
      for (const orderEntry of parsedOrder) {
        const orders = Array.isArray(orderEntry.orders) ? orderEntry.orders : [];
        const reservationData = {
          resname: orderEntry.name || 'Unknown',
          contact: orderEntry.contact || '',
          address: orderEntry.address || '',
          resdate: orderEntry.dateTime || moment().utcOffset(8).format(),
          location: orderEntry.location || '',
          order: orders.map(order => ({
            menuName: order.item || 'Unknown Item',
            buyQty: order.quantity || 1,
            price: order.price || 0,
            selectedSize: ''
          })),
          total: orderEntry.total || orders.reduce((sum, order) => sum + ((order.price || 0) * (order.quantity || 1)), 0),
          createdAt: moment().utcOffset(8).format()
        };
        const newReservationRef = push(reservationsRef);
        await set(newReservationRef, reservationData);
      }
    } else {
      // Single order object
      const orders = Array.isArray(parsedOrder.orders) ? parsedOrder.orders : [];
      const reservationData = {
        resname: parsedOrder.name || 'Unknown',
        contact: parsedOrder.contact || '',
        address: parsedOrder.address || '',
        resdate: parsedOrder.dateTime || moment().utcOffset(8).format(),
        location: parsedOrder.location || '',
        order: orders.map(order => ({
          menuName: order.item || 'Unknown Item',
          buyQty: order.quantity || 1,
          price: order.price || 0,
          selectedSize: ''
        })),
        total: parsedOrder.total || orders.reduce((sum, order) => sum + ((order.price || 0) * (order.quantity || 1)), 0),
        createdAt: moment().utcOffset(8).format()
      };
      const reservationsRef = dbRef(db, 'reservations');
      const newReservationRef = push(reservationsRef);
      await set(newReservationRef, reservationData);
    }
  } catch (error) {
    console.error('Error adding to Firebase:', error);
    throw error;
  }
};

const showSnackbar = (text, color) => {
  snackbarText.value = text;
  snackbarColor.value = color;
  snackbar.value = true;
};

const toggleOrderSummary = () => {
  showOrderSummary.value = !showOrderSummary.value;
};
</script>

<style scoped>
.order-summary-drawer {
  border-left: 1px solid #333;
}

.order-items > div:not(:last-child) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.order-full-list {
  max-width: 300px;
}

.v-data-table :deep(.v-data-table__tr:hover) {
  background-color: rgba(var(--v-theme-primary), 0.08) !important;
}

.v-data-table :deep(th) {
  font-weight: bold !important;
  color: #fff !important;
}

.v-data-table :deep(td) {
  color: rgba(255, 255, 255, 0.8) !important;
}

.v-data-table :deep(.v-data-table__tr:nth-child(even)) {
  background-color: rgba(var(--v-theme-surface), 0.1) !important;
}

.gap-3 {
  gap: 12px;
}

@media (max-width: 600px) {
  .v-data-table :deep(.v-data-table__mobile-row) {
    padding: 16px;
  }
}
</style>
