<template>
  <v-app id="inspire">
    <template v-if="isAuthenticated">
      <v-navigation-drawer v-model="drawer">
        <div class="d-flex flex-column pa-4">
          <h1>Postre Admin</h1>
          <v-divider class="my-4"></v-divider>
          <v-btn @click="comboDialog = true" size="small" color="success" variant="flat"
            prepend-icon="mdi-plus">Create Combo</v-btn>
        </div>
        <!-- <v-btn @click="updateDatabase" color="warning" class="ma-4">Update DB</v-btn> -->
      </v-navigation-drawer>

      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Application Settings</v-toolbar-title>
      </v-app-bar>

      <v-main>
        <v-container>
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
            <v-col cols="6">
              <v-divider></v-divider>
              <div class="d-flex align-center py-4" v-for="item in filteredData" :key="item.menuCode">
                <div class="ma-0 pa-0">
                  <v-checkbox density="comfortable" label=""
                    class="text-body-2 d-inline-flex"></v-checkbox>
                </div>
                <div class="mr-1">
                  <v-img class="align-end text-white" aspect-ratio="1" height="90" width="90" cover
                    :src="item.img">
                    <template v-slot:placeholder>
                      <div class="d-flex align-center justify-center fill-height">
                        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                      </div>
                    </template>
                  </v-img>
                </div>
                <div class="mx-3 w-100">
                  <div class="d-flex align-center mb-1">
                    <h4 class="text-grey me-2">{{ item.menuName }}</h4>
                    <v-chip v-for="branch in item.branches" :key="branch" size="x-small"
                      color="primary" variant="outlined" class="mr-1">{{ branch }}</v-chip>
                  </div>
                  <div class="text-grey text-caption py-"> {{ item.menuDesc }}</div>
                  <div v-if="item.disc" class="text-caption text-green-accent-3">Discounted</div>
                  <div class="d-flex align-center">
                    <div class="font-weight-bold text-body-2 me-auto">
                      <span>&#8369;</span> {{ item.menuPrice }}
                    </div>
                    <v-btn @click="editItem(item)" size="small" class="mr-1">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn @click="deleteItem(item)" size="small">
                      <v-icon>mdi-delete-empty</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
            </v-col>

            <v-col cols="6">
              <v-card class="mx-auto mt-5 pa-4" max-width="344" title="Update Menu">
                <div class="d-flex">
                  <div class="pa-1 w-50">
                    <v-img :src="imagePreview" cover></v-img>
                  </div>
                  <v-file-input show-size accept="image/*" @change="previewImage" v-model="imageFile"
                    density="comfortable" label="File input"
                    prepend-icon="mdi-camera"></v-file-input>
                </div>

                <v-select v-model="menu.branches" :items="branches" label="Available in Branches" dense
                  outlined class="mb-2" multiple
                  :rules="[v => v && v.length > 0 || 'Select at least one branch']" required clearable
                  hint="Menu will be available in the selected branches."
                  persistent-hint></v-select>

                <v-text-field v-model="menu.menuCategory" label="Menu Category"></v-text-field>
                <v-text-field clearable v-model="menu.menuName" color="primary" label="Menu Name"
                  variant="underlined"></v-text-field>
                <v-text-field clearable v-model="menu.menuDesc" color="primary" label="Menu Description"
                  variant="underlined"></v-text-field>
                <v-text-field clearable v-model="menu.menuPrice" color="primary" label="Price"
                  type="number" variant="underlined"></v-text-field>
                <v-switch color="green" v-model="menu.isHot" label="Hot Menu"></v-switch>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="clearForm" color="info" variant="outlined">
                    Create New
                    <v-icon icon="mdi-plus" end></v-icon>
                  </v-btn>
                  <v-btn v-if="!menu.menuCode" @click="createMenu" color="primary">
                    Create Menu
                    <v-icon icon="mdi-content-save" end></v-icon>
                  </v-btn>
                  <v-btn v-else @click="updateMenu" color="success">
                    Update Menu
                    <v-icon icon="mdi-chevron-right" end></v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </template>

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
          <v-toolbar-title>Create Combo Package</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>
        <v-row class="pa-4">
          <v-col cols="6" class="h-50">
            <h2>Select Items</h2>
            <v-select v-model="comboSelectedCategory" :items="categoryOptions" label="Select Category" dense
              outlined class="mb-4" style="max-width: 250px;"></v-select>
            <div v-for="item in comboFilteredItems" :key="item.menuCode">
              <div class="d-flex flex-wrap justify-space-between ma-2">
                <v-divider class="mb-2"></v-divider>
                <div class="w-50">{{ item.menuName }}</div>
                <v-btn @click="addToCombo(item)" density="comfortable" color="green" prepend-icon="mdi-plus"
                  size="small">Add</v-btn>
              </div>
            </div>
          </v-col>
          <v-col cols="6">
            <v-select v-model="combo.branches" :items="branches" label="Branches" multiple dense
              outlined class="mb-2"></v-select>
            <v-file-input v-model="comboImageFile" accept="image/*" label="Combo Image"
              prepend-icon="mdi-camera" @change="onComboImageSelected" show-size
              density="comfortable" class="mb-2"></v-file-input>
            <v-img v-if="combo.img" :src="combo.img" max-width="350" class="mb-2" />
            <v-text-field v-model="combo.name" label="Name" density="compact" variant="outlined"></v-text-field>
            <v-text-field v-model="combo.desc" label="Description" density="compact" variant="outlined"></v-text-field>
            <v-text-field v-model="combo.disc" label="Discount" type="number" density="compact"
              variant="outlined"></v-text-field>
            <v-text-field v-model="combo.price" label="Price" type="number" density="compact"
              variant="outlined"></v-text-field>
            <h3>Includes:</h3>
            <div v-for="item in combo.members" :key="item.menuCode">
              {{ item.menuName }}
            </div>
            <v-btn @click="saveCombo" :loading="loader" class="mt-5" prepend-icon="mdi-upload"
              color="blue">Save</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showPasswordPrompt" persistent width="auto">
      <v-card>
        <v-card-title>
          <span class="headline">Admin Access</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="password" label="Password" type="password"
            @keyup.enter="checkPassword"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="checkPassword">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ref as fireRef, getDatabase, get, set, query, orderByChild, update } from "firebase/database";
import { ref as strRef, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from '@/firebase'
import { v4 as uuidv4 } from 'uuid';

// Authentication
const isAuthenticated = ref(false);
const password = ref('');
const showPasswordPrompt = ref(true);

// UI State
const drawer = ref(null);
const dialog = ref(false);
const comboDialog = ref(false);
const loader = ref(false);

// Data
const branches = ["Naga", "Calbayog"];
const selectedBranch = ref(branches[0]);
const selectedCategory = ref('');
const data = ref({});
const menu = ref(createEmptyMenu());
const combo = ref(createEmptyCombo());
const imageFile = ref(null);
const comboImageFile = ref(null);
const comboSelectedCategory = ref('');

// Computed
const categoryOptions = computed(() => {
  const categories = new Set(Object.values(data.value).map(item => item.menuCategory).filter(Boolean));
  return Array.from(categories);
});

const filteredData = computed(() => {
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
  return items;
});

const comboFilteredItems = computed(() => {
  let items = Object.values(data.value);
  if (comboSelectedCategory.value) {
    items = items.filter(item => item.menuCategory === comboSelectedCategory.value);
  }
  return items;
});

const imagePreview = computed(() => {
  return menu.value.img || 'https://via.placeholder.com/150';
});

// Lifecycle
onMounted(() => {
  if (isAuthenticated.value) {
    loadData();
  }
});

// Utility Functions
function createEmptyMenu() {
  return {
    menuDesc: "",
    menuStatus: 'Active',
    isHot: false,
    menuCategory: null,
    menuDisc: 0,
    menuCode: null,
    img: '',
    menuName: '',
    menuPrice: '',
    branches: [],
  };
}

function createEmptyCombo() {
  return {
    name: '',
    desc: '',
    disc: 0,
    img: '',
    price: 0,
    members: {},
    branches: []
  };
}

function sanitizeKey(str) {
  return str.replace(/[.#$\[\]]/g, '_');
}

// Authentication
function checkPassword() {
  if (password.value === 'adm1') {
    isAuthenticated.value = true;
    showPasswordPrompt.value = false;
    loadData();
  } else {
    alert('Incorrect password');
  }
}

// Data Loading
async function loadData() {
  try {
    const que = query(fireRef(db, 'Menu'), orderByChild('menuName'));
    const snapshot = await get(que);
    const sorted = {};
    snapshot.forEach(child => {
      sorted[child.val().menuCode] = child.val();
    });
    data.value = sorted;
  } catch (error) {
    console.error('Error loading data:', error);
    alert('Error loading menu data');
  }
}

// Image Handling
function previewImage(e) {
  const file = e.target.files?.[0];
  if (file) {
    menu.value.img = URL.createObjectURL(file);
  }
}

function onComboImageSelected(e) {
  const file = e.target.files?.[0];
  if (file) {
    combo.value.img = URL.createObjectURL(file);
  }
}

// CRUD Operations
async function createMenu() {
  if (!validateMenu()) return;

  try {
    dialog.value = true;
    const menuCode = uuidv4();
    const menuData = { ...menu.value, menuCode };
    
    if (imageFile.value) {
      menuData.img = await uploadImage(imageFile.value);
    }

    await Promise.all([
      set(fireRef(db, `Menu/${menuCode}`), menuData),
      set(fireRef(db, `MenuCategory/${menuData.menuCategory}/${menuCode}`), menuData)
    ]);

    await loadData();
    clearForm();
  } catch (error) {
    console.error('Error creating menu:', error);
    alert('Error creating menu');
  } finally {
    dialog.value = false;
  }
}

async function updateMenu() {
  if (!validateMenu()) return;

  try {
    dialog.value = true;
    const menuData = { ...menu.value };
    
    if (imageFile.value) {
      menuData.img = await uploadImage(imageFile.value);
    }

    await Promise.all([
      set(fireRef(db, `Menu/${menuData.menuCode}`), menuData),
      set(fireRef(db, `MenuCategory/${menuData.menuCategory}/${menuData.menuCode}`), menuData)
    ]);

    await loadData();
    clearForm();
  } catch (error) {
    console.error('Error updating menu:', error);
    alert('Error updating menu');
  } finally {
    dialog.value = false;
  }
}

async function deleteItem(item) {
  if (!confirm('Are you sure you want to delete this menu item?')) return;

  try {
    await Promise.all([
      set(fireRef(db, `Menu/${item.menuCode}`), null),
      set(fireRef(db, `MenuCategory/${item.menuCategory}/${item.menuCode}`), null)
    ]);
    await loadData();
    clearForm();
  } catch (error) {
    console.error('Error deleting menu:', error);
    alert('Error deleting menu');
  }
}

async function uploadImage(file) {
  const storageRef = strRef(storage, `img/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
}

// Combo Operations
async function saveCombo() {
  if (!combo.value.name) {
    alert('Please enter a name for the combo');
    return;
  }

  try {
    loader.value = true;
    const comboData = { ...combo.value };
    
    if (comboImageFile.value) {
      comboData.img = await uploadImage(comboImageFile.value);
    }

    await set(fireRef(db, `Combo/${sanitizeKey(comboData.name)}`), comboData);
    
    comboDialog.value = false;
    combo.value = createEmptyCombo();
    comboImageFile.value = null;
  } catch (error) {
    console.error('Error saving combo:', error);
    alert('Error saving combo');
  } finally {
    loader.value = false;
  }
}

function addToCombo(item) {
  combo.value.members[item.menuCode] = item;
}

// Form Management
function editItem(item) {
  menu.value = { ...item };
}

function clearForm() {
  menu.value = createEmptyMenu();
  imageFile.value = null;
}

// Database Update
async function updateDatabase() {
  try {
    dialog.value = true;
    
    const updates = {
      branches: ['naga', 'calbayog'],
      branch: null
    };

    const menuRef = fireRef(db, 'Menu');
    const menuCategoryRef = fireRef(db, 'MenuCategory');
    const comboRef = fireRef(db, 'Combo');

    const [menuSnapshot, comboSnapshot] = await Promise.all([
      get(menuRef),
      get(comboRef)
    ]);

    const updatePromises = [];

    menuSnapshot.forEach(child => {
      updatePromises.push(update(fireRef(db, `Menu/${child.key}`), updates));
    });

    comboSnapshot.forEach(child => {
      updatePromises.push(update(fireRef(db, `Combo/${child.key}`), updates));
    });

    const categorySnapshot = await get(menuCategoryRef);
    categorySnapshot.forEach(category => {
      category.forEach(item => {
        updatePromises.push(update(fireRef(db, `MenuCategory/${category.key}/${item.key}`), updates));
      });
    });

    await Promise.all(updatePromises);
    await loadData();
    
    alert('Database updated successfully!');
  } catch (error) {
    console.error('Error updating database:', error);
    alert('Error updating database');
  } finally {
    dialog.value = false;
  }
}

// Validation
function validateMenu() {
  if (!menu.value.menuName) {
    alert('Menu name is required');
    return false;
  }
  if (!menu.value.menuPrice || menu.value.menuPrice <= 0) {
    alert('Valid price is required');
    return false;
  }
  if (!menu.value.branches || menu.value.branches.length === 0) {
    alert('Please select at least one branch');
    return false;
  }
  return true;
}
</script>

<style scoped>
.text-caption {
  font-size: 0.75rem;
}
</style>
