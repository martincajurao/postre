  <template>
    <v-app id="inspire">
        <template v-if="isAuthenticated">
            <v-app-bar>
                <v-toolbar-title>Application Settings</v-toolbar-title>
            </v-app-bar>

            <v-main>
                <v-container>
                    <v-tabs v-model="activeTab" color="primary">
                        <v-tab value="menu">Menu Management</v-tab>
                        <v-tab value="combo">Combo Management</v-tab>
                    </v-tabs>

                    <v-tabs-window v-model="activeTab">
                        <!-- Menu Tab -->
                        <v-tabs-window-item value="menu">
                            <!-- Branch Filter -->
                            <v-row>
                                <v-col cols="12" class="pb-0">
                                    <v-select v-model="selectedBranch" :items="branches" label="Select Branch" dense outlined
                                        class="mb-4" style="max-width: 250px;"></v-select>
                                    <v-select v-model="selectedCategory" :items="categoryOptions" label="Select Category" dense
                                        outlined class="mb-4" style="max-width: 250px;"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-data-table
                                        :headers="headers"
                                        :items="filteredData"
                                        :loading="loading"
                                        class="elevation-1"
                                    >
                                        <template v-slot:item.img="{ item }">
                                            <v-img :key="item.menuCode" :src="item.img || 'https://via.placeholder.com/60x60?text=No+Image'" width="60" height="60" cover></v-img>
                                        </template>
                                        <template v-slot:item.branches="{ item }">
                                            <v-chip v-for="branch in item.branches" :key="branch" size="x-small" color="primary" variant="outlined" class="mr-1">{{ branch }}</v-chip>
                                        </template>
                                        <template v-slot:item.menuPrices="{ item }">
                                            <div v-if="item.menuPrices">
                                                <div v-if="item.menuPrices.small">Small: ₱{{ item.menuPrices.small }}</div>
                                                <div v-if="item.menuPrices.medium">Medium: ₱{{ item.menuPrices.medium }}</div>
                                                <div v-if="item.menuPrices.large">Large: ₱{{ item.menuPrices.large }}</div>
                                            </div>
                                        </template>
                                        <template v-slot:item.actions="{ item }">
                                            <v-btn @click="editItem(item)" size="small" class="mr-1" color="primary">
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                            <v-btn @click="deleteItem(item)" size="small" color="error">
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                        </template>
                                    </v-data-table>
                                    <v-btn @click="openCreateDialog" color="primary" class="mt-4" prepend-icon="mdi-plus">
                                        Add New Menu Item
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-tabs-window-item>

                        <!-- Combo Tab -->
                        <v-tabs-window-item value="combo">
                            <v-row>
                                <v-col cols="12" class="d-flex justify-end mb-4">
                                    <v-btn @click="comboDialog = true" color="primary" prepend-icon="mdi-plus">
                                        Create Combo
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col
                                    v-for="comboItem in Object.values(comboData)"
                                    :key="comboItem.name"
                                    cols="12"
                                    sm="6"
                                    md="4"
                                    lg="3"
                                >
                                    <v-card class="pa-4" elevation="2">
                                        <v-img
                                            :src="comboItem.img || 'https://via.placeholder.com/200x150?text=No+Image'"
                                            height="150"
                                            cover
                                            class="mb-3 rounded"
                                        ></v-img>
                                        <v-card-title class="pa-0 pb-2 text-h6">{{ comboItem.name }}</v-card-title>
                                        <v-card-subtitle class="pa-0 pb-2">{{ comboItem.desc }}</v-card-subtitle>
                                        <div class="mb-2">
                                            <strong>Price: ₱{{ comboItem.price }}</strong>
                                        </div>
                                        <div class="mb-3">
                                            <v-chip
                                                v-for="branch in comboItem.branches"
                                                :key="branch"
                                                size="x-small"
                                                color="primary"
                                                variant="outlined"
                                                class="mr-1 mb-1"
                                            >
                                                {{ branch }}
                                            </v-chip>
                                        </div>
                                        <div class="mb-3">
                                            <small class="text-caption">
                                                Includes: {{ Object.values(comboItem.members || {}).map(m => m.menuName).join(', ') }}
                                            </small>
                                        </div>
                                        <v-card-actions class="pa-0">
                                            <v-btn @click="editCombo(comboItem)" size="small" color="primary" class="mr-1">
                                                <v-icon>mdi-pencil</v-icon>
                                                Edit
                                            </v-btn>
                                            <v-btn @click="deleteCombo(comboItem)" size="small" color="error">
                                                <v-icon>mdi-delete</v-icon>
                                                Delete
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-container>
            </v-main>
    </template>
    </v-app>

    <v-dialog v-model="dialog" :scrim="false" persistent width="auto">
        <v-card color="grey-accent-4">
            <v-card-text>
                Updating file...
                <v-progress-linear indeterminate color="blue" class="mb-0"></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>

    <v-dialog v-model="comboDialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="success">
                <v-btn icon dark @click="comboDialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ isEditingCombo ? 'Edit Combo Package' : 'Create Combo Package' }}</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-row class="pa-4 ">
                <v-col cols="6" class="h-50">
                    <h2>Select Items</h2>
                    <!-- Category filter for combo dialog -->
                    <v-select v-model="comboSelectedCategory" :items="categoryOptions" label="Select Category" dense outlined class="mb-4" style="max-width: 250px;"></v-select>
                    <div v-for="item in comboFilteredItems" :key="item.menuCode" class="ma-2">
                        <v-divider class="mb-2"></v-divider>
                        <v-checkbox
                            :model-value="Array.isArray(combo.members) && combo.members.some(m => m.menuCode === item.menuCode)"
                            @update:model-value="(checked) => toggleMenuItem(item, checked)"
                            :label="item.menuName"
                            density="compact"
                        ></v-checkbox>
                    </div>
                </v-col>
                <v-col cols="6">
                    <v-select
                        v-model="combo.branches"
                        :items="branches"
                        label="Branches"
                        multiple
                        dense
                        outlined
                        class="mb-2"
                    ></v-select>
                    <!-- Combo Image Uploader with Cropper -->
                    <v-file-input
                        v-model="comboImageFile"
                        accept="image/*"
                        label="Combo Image"
                        prepend-icon="mdi-camera"
                        @change="onComboImageSelected"
                        show-size
                        density="comfortable"
                        class="mb-2"
                    ></v-file-input>
                    <div v-if="comboImageUrl" class="mb-2">
                        <v-card class="pa-2" style="background: #222; max-width: 500px; margin: auto;">
                            <VueCropper
                                ref="comboCropper"
                                :src="comboImageUrl"
                                :aspect-ratio="1584/1152"
                                :auto-crop="true"
                                :view-mode="1"
                                :min-container-width="400"
                                :min-container-height="300"
                                :auto-crop-area="1"
                                :background="true"
                                :guides="true"
                                :zoomable="true"
                                :scalable="true"
                                :rotatable="true"
                                :movable="true"
                                :crop-box-movable="true"
                                :crop-box-resizable="true"
                                style="width: 100%; max-width: 480px; height: 350px; border: 2px solid #888; background: #222;"
                            />
                            <div class="d-flex align-center mt-2 justify-center">
                                <v-btn color="primary" class="mr-2" @click="cropComboImage">Crop & Use</v-btn>
                                <v-btn color="grey" variant="outlined" @click="resetComboCropper">Reset</v-btn>
                                <v-btn color="red" variant="outlined" class="ml-2" @click="removeComboImage">Remove</v-btn>
                            </div>
                            <div class="text-caption mt-1 text-white">Drag, zoom, or rotate to adjust. Crop area is fixed to 1584x1152. The preview below updates live as you crop.</div>
                            <!-- Live preview only if cropper is ready and image is loaded -->
                            <div v-if="comboCropper && comboCropper.ready && comboImageUrl" class="mt-2 text-center">
                                <img :src="comboImageUrl" style="max-width: 100%; border: 1px solid #444; background: #111;" alt="Live Preview" />
                                <div class="text-caption text-grey">Live preview</div>
                            </div>
                        </v-card>
                    </div>
                    <v-img v-if="combo.img" :src="combo.img" max-width="350" class="mb-2" />
                    <v-text-field v-model="combo.name" class="mr-" label="Name" density="compact" variant="outlined"></v-text-field>
                    <v-text-field v-model="combo.desc" class="mr-" label="Description" density="compact" variant="outlined"></v-text-field>
                    <v-text-field v-model="combo.disc" class="mr-" label="Discount" density="compact" variant="outlined"></v-text-field>
                    <v-text-field v-model="combo.price" class="mr-" label="Price" density="compact" variant="outlined"></v-text-field>
                    <h3>Includes:</h3>
                    <div v-for="item in combo.members">
                        {{ item.menuName }}
                    </div>
                    <v-btn @click="Savecombo()" :loading="loader" class="mt-5" prepend-icon="mdi-upload" color="blue">Save</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>

    <!-- Menu Edit/Create Dialog -->
    <v-dialog v-model="menuDialog" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ isEditing ? 'Edit Menu Item' : 'Create New Menu Item' }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="menu.menuName" label="Menu Name" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="menu.menuCategory" label="Menu Category"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="menu.menuDesc" label="Description"></v-textarea>
                        </v-col>
                        <v-col v-if="menu.menuCategory === 'MC'" cols="4">
                            <v-text-field v-model="menu.menuPrices.small" label="Small Price" type="number"></v-text-field>
                        </v-col>
                        <v-col :cols="menu.menuCategory === 'MC' ? 4 : 6">
                            <v-text-field v-model="menu.menuPrices.medium" label="Medium Price" type="number"></v-text-field>
                        </v-col>
                        <v-col :cols="menu.menuCategory === 'MC' ? 4 : 6">
                            <v-text-field v-model="menu.menuPrices.large" label="Large Price" type="number"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select v-model="menu.branches" :items="branches" label="Available in Branches" multiple required></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-switch v-model="menu.isHot" label="Hot Menu"></v-switch>
                        </v-col>
                        <v-col cols="12">
                            <v-file-input v-model="image" accept="image/*" label="Menu Image" prepend-icon="mdi-camera" show-size @change="Preview_image"></v-file-input>
                            <v-img v-if="url" :src="url" max-width="200" class="mt-2"></v-img>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeMenuDialog">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="saveMenu" :loading="loading">{{ isEditing ? 'Update' : 'Create' }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Snackbar for notifications -->
    <v-snackbar v-model="showSnackbar" :color="errorMessage ? 'error' : 'success'" timeout="3000">
        {{ errorMessage || successMessage }}
        <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="showSnackbar = false">Close</v-btn>
        </template>
    </v-snackbar>

    <v-dialog v-model="showPasswordPrompt" persistent width="auto">
        <v-card>
            <v-card-title>
                <span class="headline">Admin Access</span>
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="password" label="Password" type="password" @keyup.enter="checkPassword"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="checkPassword">Login</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { ref as fireRef, getDatabase, get, set, query, orderByChild, update } from "firebase/database";
import { ref as strRef, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from '@/firebase'
import { v4 as uuidv4 } from 'uuid';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.min.css';

// --- Combo Image Cropper State ---
const comboImageFile = ref(null);
const comboImageUrl = ref(null);
const comboCropper = ref(null);

function onComboImageSelected(e) {
  let file = null;
  // v-file-input with v-model gives file directly, event gives e.target.files
  if (e && e.target && e.target.files) {
    file = e.target.files[0];
  } else if (e instanceof File) {
    file = e;
  } else if (Array.isArray(e)) {
    file = e[0];
  } else if (e) {
    file = e;
  }
  if (file) {
    comboImageFile.value = file;
    comboImageUrl.value = URL.createObjectURL(file);
    // Reset cropper state if needed
    if (comboCropper.value && comboCropper.value.replace) {
      comboCropper.value.replace(comboImageUrl.value);
    }
  }
}

function cropComboImage() {
  if (!comboCropper.value) return;
  const canvas = comboCropper.value.getCroppedCanvas({ width: 1584, height: 1152 });
  if (!canvas) return;
  canvas.toBlob(blob => {
    if (blob) {
      comboImageFile.value = new File([blob], comboImageFile.value?.name || 'combo.jpg', { type: blob.type });
      combo.img = URL.createObjectURL(comboImageFile.value);
    }
  }, 'image/jpeg');
}

function resetComboCropper() {
  if (comboCropper.value && comboCropper.value.reset) {
    comboCropper.value.reset();
  }
  comboImageFile.value = null;
  comboImageUrl.value = null;
  combo.img = '';
}

function removeComboImage() {
  comboImageFile.value = null;
  comboImageUrl.value = null;
  if (comboCropper.value && comboCropper.value.replace) comboCropper.value.replace('');
  combo.img = '';
}

// Auth
const isAuthenticated = ref(false);
const password = ref('');
const showPasswordPrompt = ref(true);

function checkPassword() {
    if (password.value === 'adm1') {
        isAuthenticated.value = true;
        showPasswordPrompt.value = false;
        getdata(); // Ensure menu items load after login
        getCombos(); // Ensure combo data loads after login
    } else {
        alert('Incorrect password');
    }
}

// Branches
const branches = ["Naga", "Calbayog"];
const selectedBranch = ref(branches[0]);

// Category mapping for user-friendly display
const categoryMapping = {
  'MC': 'Mango Crepe',
  'SF': 'Seafood',
  'CH': 'Chicken',
  'PO': 'Pork',
  'BF': 'Beef',
  'PA': 'Pasta',
  'VE': 'Vegetables'
};

// Category filter
const categoryOptions = computed(() => {
  // Extract unique categories from menu data
  const categories = new Set(Object.values(data.value).map(item => item.menuCategory).filter(Boolean));
  return Array.from(categories).map(code => ({
    title: categoryMapping[code] || code,
    value: code
  }));
});
const selectedCategory = ref('');

const data = ref({});
const comboData = ref({});
const menu = ref({
    menuDesc: "",
    menuStatus: 'Active',
    isHot: false,
    menuCategory: null,
    menuDisc: 0,
    menuCode: null,
    img: '',
    menuName: '',
    menuPrices: {
        small: '',
        medium: '',
        large: ''
    },
    branches: [],
});

const dialog = ref(false)
const comboDialog = ref(false)
const image = ref(null)
const url = ref(null)
const loader = ref(false)
const activeTab = ref('menu')

// CRUD states
const menuDialog = ref(false)
const isEditing = ref(false)
const isEditingCombo = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const showSnackbar = ref(false)

// Data table headers
const headers = [
  { title: 'Image', key: 'img', sortable: false },
  { title: 'Name', key: 'menuName' },
  { title: 'Category', key: 'menuCategory' },
  { title: 'Branches', key: 'branches', sortable: false },
  { title: 'Price', key: 'menuPrices', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false }
]

// Combo data table headers
const comboHeaders = [
  { title: 'Image', key: 'img', sortable: false },
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'desc' },
  { title: 'Price', key: 'price' },
  { title: 'Branches', key: 'branches', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false }
]
const combo = ref({
    name: '',
    desc: '',
    disc: 0,
    img: '',
    price: 0,
    members: [],
    branches: []
})
// Category filter for combo dialog
const comboSelectedCategory = ref('');
const comboFilteredItems = computed(() => {
  let items = Object.values(data.value);
  if (comboSelectedCategory.value) {
    items = items.filter(item => item.menuCategory === comboSelectedCategory.value);
  }
  return items;
});

// Computed property to calculate total price of combo members
const comboTotalPrice = computed(() => {
  return combo.value.members.reduce((total, member) => {
    const menuItem = data.value[member.menuCode];
    if (menuItem && menuItem.menuPrices) {
      // Use medium price as default, or large if available
      const price = menuItem.menuPrices.medium || menuItem.menuPrices.large || menuItem.menuPrices.small || 0;
      return total + parseFloat(price);
    }
    return total;
  }, 0);
});

// Watch for changes in combo members to update price
watch(() => combo.value.members, () => {
  combo.value.price = comboTotalPrice.value;
}, { deep: true });

const dbRef = fireRef(db);

onMounted(() => {
    getdata();
    getCombos();
});

function getdata() {
  const que = query(fireRef(db, 'Menu'));
  get(que).then((snapshot) => {
    const allItems = {}
    if (snapshot.exists()) {
      snapshot.forEach(function (itemSnapshot) {
        const item = itemSnapshot.val()
        if (item && item.menuCode) {
          allItems[item.menuCode] = item
        }
      });
    }
    data.value = allItems
    console.log('Loaded menu data:', allItems)
  }).catch((error) => {
    console.error('Error loading menu data:', error)
    errorMessage.value = 'Failed to load menu data'
    showSnackbar.value = true
  })
}

function getCombos() {
  const que = query(fireRef(db, 'Combo'));
  get(que).then((snapshot) => {
    const allCombos = {}
    if (snapshot.exists()) {
      snapshot.forEach(function (comboSnapshot) {
        const comboItem = comboSnapshot.val()
        if (comboItem && comboItem.name) {
          allCombos[comboSnapshot.key] = comboItem
        }
      });
    }
    comboData.value = allCombos
    console.log('Loaded combo data:', allCombos)
  }).catch((error) => {
    console.error('Error loading combo data:', error)
    errorMessage.value = 'Failed to load combo data'
    showSnackbar.value = true
  })
}

const filteredData = computed(() => {
  // Only show menu items for the selected branch (case-insensitive) and selected category
  let items = Object.values(data.value);
  if (selectedBranch.value) {
    const branchName = selectedBranch.value.toLowerCase();
    items = items.filter(item =>
      Array.isArray(item.branches) &&
      item.branches.some(b => b && b.toLowerCase() === branchName)
    );
  }
  if (selectedCategory.value) {
    items = items.filter(item => item.menuCategory === selectedCategory.value);
  }
  // Debug: log filtered data
  console.log('Filtered menu items:', items);
  return items;
});

async function updateDatabase() {
  const db = getDatabase();
  const menuRef = fireRef(db, 'Menu');
  const comboRef = fireRef(db, 'Combo');

  try {
    // Update Menu
    const menuSnapshot = await get(menuRef);
    if (menuSnapshot.exists()) {
      const updates = {};
      menuSnapshot.forEach(childSnapshot => {
        updates[`/${childSnapshot.key}/branches`] = ['naga', 'calbayog'];
        updates[`/${childSnapshot.key}/branch`] = null;
      });
      await update(menuRef, updates);
    }

    // Update MenuCategory
    const menuCategorySnapshot = await get(menuCategoryRef);
    if (menuCategorySnapshot.exists()) {
      const updates = {};
      menuCategorySnapshot.forEach(categorySnapshot => {
        categorySnapshot.forEach(itemSnapshot => {
          updates[`/${categorySnapshot.key}/${itemSnapshot.key}/branches`] = ['naga', 'calbayog'];
          updates[`/${categorySnapshot.key}/${itemSnapshot.key}/branch`] = null;
        });
      });
      await update(menuCategoryRef, updates);
    }

    // Update Combo
    const comboSnapshot = await get(comboRef);
    if (comboSnapshot.exists()) {
      const updates = {};
      comboSnapshot.forEach(childSnapshot => {
        updates[`/${childSnapshot.key}/branches`] = ['naga', 'calbayog'];
        updates[`/${childSnapshot.key}/branch`] = null;
      });
      await update(comboRef, updates);
    }

    alert('Database updated successfully!');
    getdata(); // Refresh data
  } catch (error) {
    console.error("Error updating database: ", error);
    alert('An error occurred while updating the database.');
  }
}

function Preview_image(e) {
  const file = e.target.files[0];
  url.value = URL.createObjectURL(file);
  image.value = file;
}

function clearForm() {
  menu.value = {
    menuDesc: "",
    menuStatus: 'Active',
    isHot: false,
    menuCategory: null,
    menuDisc: 0,
    menuCode: null,
    img: '',
    menuName: '',
    menuPrices: {
      small: '',
      medium: '',
      large: ''
    },
    branches: [],
  };
  image.value = null;
  url.value = null;
}

function edit(val) {
  menu.value = { ...val };
  url.value = val.img;
  image.value = null;
}

function remove(val) {
  if (!confirm('Are you sure you want to delete this menu item?')) return;
  set(fireRef(db, 'Menu/' + val.menuCode), null);
  getdata();
  clearForm();
}

function toggleMenuItem(item, checked) {
  if (checked) {
    if (!combo.value.members.some(m => m.menuCode === item.menuCode)) {
      combo.value.members.push(item);
    }
  } else {
    combo.value.members = combo.value.members.filter(m => m.menuCode !== item.menuCode);
  }
}

function sanitizeKey(str) {
  return str.replace(/[.#$\[\]]/g, '_');
}

async function Savecombo() {
  console.log("Savecombo called with combo:", combo.value);
  loader.value = true;
  if (!combo.value.name) {
    console.error("Combo name is required to save.");
    alert("Please enter a name for the combo.");
    loader.value = false;
    return;
  }
  try {
    if (comboImageFile.value) {
      const storageRef = strRef(storage, 'img/combo_' + Date.now() + '_' + comboImageFile.value.name);
      await uploadBytes(storageRef, comboImageFile.value);
      combo.img = await getDownloadURL(storageRef);
      console.log("Uploaded combo image URL:", combo.img);
      combo.value.img = combo.img;
    }
    const key = sanitizeKey(combo.value.name);
    await set(fireRef(db, 'Combo/' + key), combo.value);
    console.log("Combo saved successfully.");
    successMessage.value = isEditingCombo.value ? 'Combo updated successfully!' : 'Combo created successfully!';
    showSnackbar.value = true;
    loader.value = false;
    comboDialog.value = false;
    combo.value = { name: '', desc: '', disc: 0, img: '', price: 0, members: [], branches: [] };
    comboImageFile.value = null;
    comboImageUrl.value = null;
    isEditingCombo.value = false;
    getCombos(); // Refresh combo data
  } catch (error) {
    console.error("Error saving combo:", error);
    errorMessage.value = 'Failed to save combo.';
    showSnackbar.value = true;
    loader.value = false;
  }
}

function updateMenu() {
  // Require at least one branch selection
  if (!menu.value.branches || menu.value.branches.length === 0) {
    alert('Please select at least one branch for this menu item.');
    return;
  }
  dialog.value = true;
  // If creating new, generate a new code
    if (!menu.value.menuCode) {
      menu.value.menuCode = uuidv4();
    }
  const dbInstance = getDatabase();
  // If image is selected, upload it first
  if (image.value) {
    const storageRef = strRef(storage, 'img/' + image.value.name);
    uploadBytes(storageRef, image.value).then((snapshot) => {
getDownloadURL(storageRef)
  .then((imgUrl) => {
    menu.value.img = imgUrl;
    saveMenuData(dbInstance);
  })
  .catch((error) => {
    console.error("Error getting image URL:", error);
    // Handle missing image gracefully, e.g., set to placeholder or empty string
    menu.value.img = '';
    saveMenuData(dbInstance);
  })
    });
  } else {
    saveMenuData(dbInstance);
  }
}

function saveMenuData(dbInstance) {
  // Lowercase the first letter of each branch before saving
  if (Array.isArray(menu.value.branches)) {
    menu.value.branches = menu.value.branches.map(b =>
      b ? b.charAt(0).toLowerCase() + b.slice(1) : b
    );
  }
  set(fireRef(db, 'Menu/' + menu.value.menuCode), menu.value).then(() => {
    dialog.value = false;
    getdata();
    clearForm();
  });
}

// New CRUD functions
async function createMenu(menuData) {
  try {
    loading.value = true;
    errorMessage.value = '';
    successMessage.value = '';

    // Validate required fields
    if (!menuData.menuName || !menuData.branches || menuData.branches.length === 0) {
      throw new Error('Menu name and at least one branch are required.');
    }

    // Generate unique code
    menuData.menuCode = uuidv4();

    // Handle image upload if present
    if (image.value) {
      const storageRef = strRef(storage, 'img/' + image.value.name);
      await uploadBytes(storageRef, image.value);
      menuData.img = await getDownloadURL(storageRef);
    }

    // Lowercase branches
    if (Array.isArray(menuData.branches)) {
      menuData.branches = menuData.branches.map(b =>
        b ? b.charAt(0).toLowerCase() + b.slice(1) : b
      );
    }

    await set(fireRef(db, 'Menu/' + menuData.menuCode), menuData);
    successMessage.value = 'Menu item created successfully!';
    showSnackbar.value = true;
    getdata();
    closeMenuDialog();
  } catch (error) {
    errorMessage.value = error.message || 'Failed to create menu item.';
    showSnackbar.value = true;
    console.error('Error creating menu:', error);
  } finally {
    loading.value = false;
  }
}

async function updateMenuItem(menuData) {
  try {
    loading.value = true;
    errorMessage.value = '';
    successMessage.value = '';

    // Validate required fields
    if (!menuData.menuName || !menuData.branches || menuData.branches.length === 0) {
      throw new Error('Menu name and at least one branch are required.');
    }

    // Handle image upload if present
    if (image.value) {
      const storageRef = strRef(storage, 'img/' + image.value.name);
      await uploadBytes(storageRef, image.value);
      menuData.img = await getDownloadURL(storageRef);
    }

    // Lowercase branches
    if (Array.isArray(menuData.branches)) {
      menuData.branches = menuData.branches.map(b =>
        b ? b.charAt(0).toLowerCase() + b.slice(1) : b
      );
    }

    await set(fireRef(db, 'Menu/' + menuData.menuCode), menuData);
    successMessage.value = 'Menu item updated successfully!';
    showSnackbar.value = true;
    getdata();
    closeMenuDialog();
  } catch (error) {
    errorMessage.value = error.message || 'Failed to update menu item.';
    showSnackbar.value = true;
    console.error('Error updating menu:', error);
  } finally {
    loading.value = false;
  }
}

async function deleteMenuItem(menuCode) {
  try {
    loading.value = true;
    errorMessage.value = '';
    successMessage.value = '';

    await set(fireRef(db, 'Menu/' + menuCode), null);
    successMessage.value = 'Menu item deleted successfully!';
    showSnackbar.value = true;
    getdata();
  } catch (error) {
    errorMessage.value = error.message || 'Failed to delete menu item.';
    showSnackbar.value = true;
    console.error('Error deleting menu:', error);
  } finally {
    loading.value = false;
  }
}

// Dialog functions
function openCreateDialog() {
  isEditing.value = false;
  clearForm();
  menuDialog.value = true;
}

function editItem(item) {
  isEditing.value = true;
  menu.value = { ...item };
  url.value = item.img;
  image.value = null;
  menuDialog.value = true;
}

async function deleteItem(item) {
  if (confirm('Are you sure you want to delete this menu item?')) {
    await deleteMenuItem(item.menuCode);
  }
}

function closeMenuDialog() {
  menuDialog.value = false;
  clearForm();
}

async function saveMenu() {
  if (isEditing.value) {
    await updateMenuItem(menu.value);
  } else {
    await createMenu(menu.value);
  }
}

// Combo CRUD functions
function editCombo(item) {
  isEditingCombo.value = true;
  combo.value = { ...item };
  // Ensure members is an array (convert from object if needed)
  if (!Array.isArray(combo.value.members)) {
    combo.value.members = Object.values(combo.value.members || {});
  }
  comboImageUrl.value = item.img;
  comboImageFile.value = null;
  comboDialog.value = true;
}

async function deleteCombo(item) {
  if (confirm('Are you sure you want to delete this combo?')) {
    try {
      loading.value = true;
      errorMessage.value = '';
      successMessage.value = '';
      const key = sanitizeKey(item.name);
      await set(fireRef(db, 'Combo/' + key), null);
      successMessage.value = 'Combo deleted successfully!';
      showSnackbar.value = true;
      getCombos();
    } catch (error) {
      errorMessage.value = 'Failed to delete combo.';
      showSnackbar.value = true;
      console.error('Error deleting combo:', error);
    } finally {
      loading.value = false;
    }
  }
}
</script>