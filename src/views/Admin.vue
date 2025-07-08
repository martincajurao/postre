<template>
    <v-app id="inspire">
        <template v-if="isAuthenticated">
            <v-navigation-drawer v-model="drawer">
                <div class="d-flex flex-column pa-4">
                    <h1>Postre</h1>
                    <v-divider class="my-4"></v-divider>
                    <v-btn @click="comboDialog = true" size="small" color="success" variant="flat"
                        prepend-icon="mdi-plus">Create
                        Combo</v-btn>
                </div>
                <v-btn @click="updateDatabase" color="warning" class="ma-4">Update DB</v-btn>
                <!--  -->
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
                            <div class="d-flex align-center py-4 " v-for="item in filteredData" :key="item.menuCode">
                                <div class="ma-0 pa-0 ">
                                    <v-checkbox density="comfortable" label=""
                                        class="text-body-2 d-inline-flex"></v-checkbox>
                                </div>
                                <div class="mr-1">
                                    <v-img class="align-end text-white " aspect-ratio="1" height="90" width="90" cover
                                        :src="item.img">
                                        <template v-slot:placeholder>
                                            <div class="d-flex align-center justify-center fill-height">
                                                <v-progress-circular color="grey-lighten-4"
                                                    indeterminate></v-progress-circular>
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
                                    <div class="text-grey text-caption py-"> Lorem ipsum dolor sit.</div>
                                    <div v-if="item.disc" class="text-caption text-green-accent-3">Discounted</div>
                                    <div class="d-flex align-center">
                                        <div class="font-weight-bold text-body-2 me-auto"><span>&#8369;</span> {{
        item.menuPrice }}
                                        </div>
                                        <v-btn @click="edit(item)" size="small" class="mr-1"><v-icon>mdi-pencil</v-icon></v-btn>
                                        <v-btn @click="remove(item)" size="small"><v-icon>mdi-delete-empty</v-icon></v-btn>
                                    </div>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="6">
                            <v-card class="mx-auto mt-5 pa-4" max-width="344" title="Update Menu">
                                <div class="d-flex">
                                    <div class="pa-1 w-50">
                                        <v-img :src="url" cover></v-img>
                                    </div>
                                    <v-file-input show-size accept="image/*" @change="Preview_image" v-model="image"
                                        density="comfortable" label="File input"
                                        prepend-icon="mdi-camera"></v-file-input>
                                </div>
                                <!-- Branches Multi-Select for Menu Item -->
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
                                    variant="underlined"></v-text-field>
                                <v-switch color="green" v-model="menu.isHot" label="Hot Menu"></v-switch>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="clearForm" color="info" variant="outlined">
                                        Create New
                                        <v-icon icon="mdi-plus" end></v-icon>
                                    </v-btn>
                                    <v-btn v-if="!menu.menuCode" @click="updateMenu" color="primary">
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
                <v-toolbar-title>Create combo package</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-row class="pa-4 ">
                <v-col cols="6" class="h-50">
                    <h2>Select Items</h2>
                    <!-- Category filter for combo dialog -->
                    <v-select v-model="comboSelectedCategory" :items="categoryOptions" label="Select Category" dense outlined class="mb-4" style="max-width: 250px;"></v-select>
                    <div v-for="item in comboFilteredItems">
                        <div class="d-flex flex-wrap justify-space-between ma-2">
                            <v-divider class="mb-2"></v-divider>
                            <div class="w-50">{{ item.menuName }}</div>
                            <v-btn @click="Addtocombo(item)" density="comfortable" color="green" prepend-icon="mdi-plus" size="small">Add</v-btn>
                        </div>
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
import { ref, computed, onMounted } from 'vue'
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
    } else {
        alert('Incorrect password');
    }
}

// Branches
const branches = ["Naga", "Calbayog"];
const selectedBranch = ref(branches[0]);

// Category filter
const categoryOptions = computed(() => {
  // Extract unique categories from menu data
  const categories = new Set(Object.values(data.value).map(item => item.menuCategory).filter(Boolean));
  return Array.from(categories);
});
const selectedCategory = ref('');

const data = ref({});
const menu = ref({
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
});
const drawer = ref(null)
const dialog = ref(false)
const comboDialog = ref(false)
const image = ref(null)
const url = ref(null)
const loader = ref(false)
const combo = ref({
    name: '',
    desc: '',
    disc: 0,
    img: '',
    price: 0,
    members: {},
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

const dbRef = fireRef(db);

onMounted(() => {
    getdata()
});

function getdata() {
  const que = query(fireRef(db, 'Menu'), orderByChild('menuName'));
  get(que).then((snapshot) => {
    const sorted = {}
    snapshot.forEach(function (child) {
      sorted[child.val().menuCode] = child.val()
    });
    data.value = sorted
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
  const menuCategoryRef = fireRef(db, 'MenuCategory');
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
    menuPrice: '',
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
  set(fireRef(db, 'MenuCategory/' + val.menuCategory + '/' + val.menuCode), null);
  getdata();
  clearForm();
}

function Addtocombo(val) {
  combo.value.members[val.menuCode] = val;
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
    await set(fireRef(db, 'Combo/' + sanitizeKey(combo.value.name)), combo.value);
    console.log("Combo saved successfully.");
    loader.value = false;
    comboDialog.value = false;
    combo.value = { name: '', desc: '', disc: 0, img: '', price: 0, members: {}, branches: [] };
    comboImageFile.value = null;
    comboImageUrl.value = null;
  } catch (error) {
    console.error("Error saving combo:", error);
    alert("An error occurred while saving the combo.");
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
  set(fireRef(db, 'MenuCategory/' + menu.value.menuCategory + '/' + menu.value.menuCode), menu.value);
  set(fireRef(db, 'Menu/' + menu.value.menuCode), menu.value).then(() => {
    dialog.value = false;
    getdata();
    clearForm();
  });
}
</script>