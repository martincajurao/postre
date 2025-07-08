<template>
    <div class="mainWrap mb-15">

        <v-card class="mx-auto ">

            <v-img src="" class="align-end text-white banner-img pa-5" height="250" cover>
                <v-card-title class="text-body-1">
                    <span>Home</span>
                    <v-icon icon="mdi-chevron-right"></v-icon>
                    <span>Menu</span>
                    <h1 class="text-h3"
                        style="font-family: Montserrat !important; font-weight: 800; text-transform: uppercase !important;">
                        Our Menu
                    </h1>
                </v-card-title>
                <v-card-subtitle class="">
                    <span class="max-w200">Inspired by recipes and creations of Calbayog Samar.</span>
                </v-card-subtitle>
            </v-img>

            <v-text-field
              v-model="searchQuery"
              label="Search menu"
              clearable
              outlined
              dense
              class="mx-5 my-4"
              append-icon="mdi-magnify"
            ></v-text-field>
        </v-card>
       
        <!-- Pork Dishes -->
        <div v-if="!searchQuery" id="pork" class=" div2nd my-5 px-5 mt-12" style=" text-align: center;">
            <div class="text-body-1 font-weight-bold d-inline bg-red-accent-4 py-1 px-3 header-red ">
                TASTY & AFFORDABLE
            </div>
            <h1 class="text-h2">Pork Dishes</h1>
            <v-card-subtitle class="">
                <span class="">Perfect, tender, well-seasoned</span>
            </v-card-subtitle>
        </div>

<v-container v-if="!fetching">
    <v-row justify="center" align="center" class="">
        <v-col cols="12" sm="6" md="4" v-for="(item, key) in filteredData.PO" :key="item.menuCode"
            style="position: relative !important;">
            <v-img v-if="item.isHot" class="best-seller" src="@/assets/best-seller.png" width="120" cover></v-img>
            <v-card class="menu-card  menu-card align-center d-flex flex-row ">
                <div style="position:relative; display: inline-block;" @click="dialog = true">
                    <v-img class="align-end text-white " aspect-ratio="1" height="170" width="170" cover
                        :src="item.img">
                        <template v-slot:placeholder>
                            <div class="d-flex align-center justify-center fill-height">
                                <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                            </div>
                        </template>
                    </v-img>
                    <v-btn
                      icon
                      class="download-btn"
                      size="small"
                      style="position: absolute; top: 8px; right: 8px; background: #fff; color: #ff1744; box-shadow: 0 2px 8px rgba(0,0,0,0.12); z-index: 2;"
                      @click.stop="downloadImage(item.img, item.menuName)"
                    >
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
                </div>
                <div class="  align-center pa-4">
                    <h4 class="">{{ item.menuName }}</h4>
                    <div class=" text-grey-lighten-1 text-caption">{{ item.menuDesc }}</div>
                    <h5 class="my-2">&#8369;{{ Number(item.menuPrice).toLocaleString() }}</h5>
                    <v-btn @click="AddToCart(item)" class="mt-1 text-subtitle-2" density="comfortable"
                        prepend-icon="mdi-cart" color="amber" variant="outlined">Add to order</v-btn>
                </div>
            </v-card>

        </v-col>
    </v-row>
</v-container>
        <v-container v-else-if="fetching">
            <v-row>
                <v-col cols="12" sm="6" md="4" v-for="i in 6">
                    <Skeletor height="170" />
                </v-col>
            </v-row>
        </v-container>
        <!-- end -->

        <!-- Beef Dishes -->
        <div v-if="!searchQuery" id="beef" class=" div2nd my-5 px-5 mt-12" style=" text-align: center;">
            <div class="text-body-1 font-weight-bold d-inline bg-red-accent-4 py-1 px-3 header-red ">
                TASTY & AFFORDABLE
            </div>
            <h1 class="text-h2">Beef Dishes</h1>
            <v-card-subtitle class="">
                <span class="">Rich, tender, and flavorful</span>
            </v-card-subtitle>
        </div>
        <v-container v-if="!fetching">
            <v-row justify="center" align="center" class="">
                <v-col cols="12" sm="6" md="4" v-for="(item, key) in filteredData.BF" :key="item.menuCode"
                    style="position: relative !important;">
                    <v-img v-if="item.isHot" class="best-seller" src="@/assets/best-seller.png" width="120" cover></v-img>
                    <v-card class="menu-card  menu-card align-center d-flex flex-row ">
                        <div style="position:relative; display: inline-block;" @click="dialog = true">
                            <v-img class="align-end text-white " aspect-ratio="1" height="170" width="170" cover
                                :src="item.img">
                                <template v-slot:placeholder>
                                    <div class="d-flex align-center justify-center fill-height">
                                        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                    </div>
                                </template>
                            </v-img>
                            <v-btn
                              icon
                              class="download-btn"
                              size="small"
                              style="position: absolute; top: 8px; right: 8px; background: #fff; color: #ff1744; box-shadow: 0 2px 8px rgba(0,0,0,0.12); z-index: 2;"
                              @click.stop="downloadImage(item.img, item.menuName)"
                            >
                              <v-icon>mdi-download</v-icon>
                            </v-btn>
                        </div>
                        <div class="  align-center pa-4">
                            <h4 class="">{{ item.menuName }}</h4>
                            <div class=" text-grey-lighten-1 text-caption">{{ item.menuDesc }}</div>
                            <h5 class="my-2">Php {{ item.menuPrice }}</h5>
                            <v-btn @click="AddToCart(item)" class="mt-1 text-subtitle-2" density="comfortable"
                                prepend-icon="mdi-cart" color="amber" variant="outlined">Add to order</v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <!-- end -->

        <!-- Chicken Dishes -->
        <div v-if="!searchQuery" id="chicken" class=" div2nd my-5 px-5 mt-12" style=" text-align: center;">
            <div class="text-body-1 font-weight-bold d-inline bg-red-accent-4 py-1 px-3 header-red ">
                TASTY & AFFORDABLE
            </div>
            <h1 class="text-h2">Chicken Dishes</h1>
            <v-card-subtitle class="">
                <span class="">Perfect, tender, well-seasoned</span>
            </v-card-subtitle>
        </div>
        <v-container>
            <v-row justify="center" align="center" class="">
                <v-col cols="12" sm="6" md="4" v-for="(item, key) in filteredData.CH" :key="item.menuCode"
                    style="position: relative !important;">
                    <v-img v-if="item.isHot" class="best-seller" src="@/assets/best-seller.png" width="120" cover></v-img>
                    <v-card class="menu-card  menu-card align-center d-flex flex-row ">
                <div style="position:relative; display: inline-block;" @click="dialog = true">
                    <v-img class="align-end text-white " aspect-ratio="1" height="170" width="170" cover
                        :src="item.img">
                        <template v-slot:placeholder>
                            <div class="d-flex align-center justify-center fill-height">
                                <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                            </div>
                        </template>
                    </v-img>
                    <v-btn
                      icon
                      class="download-btn"
                      size="small"
                      style="position: absolute; top: 8px; right: 8px; background: #fff; color: #ff1744; box-shadow: 0 2px 8px rgba(0,0,0,0.12); z-index: 2;"
                      @click.stop="downloadImage(item.img, item.menuName)"
                    >
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
                </div>
                        <div class="  align-center pa-4">
                            <h4 class="">{{ item.menuName }}</h4>
                            <div class=" text-grey-lighten-1 text-caption">{{ item.menuDesc }}</div>
                            <h5 class="my-2">Php {{ item.menuPrice }}</h5>
                            <v-btn @click="AddToCart(item)" class="mt-1 text-subtitle-2" density="comfortable"
                                prepend-icon="mdi-cart" color="amber" variant="outlined">Add to order</v-btn>
                        </div>
                    </v-card>

                </v-col>
            </v-row>
        </v-container>
        <!-- end -->
        <!-- Pasta Dishes -->
        <div v-if="!searchQuery" id="pasta" class=" div2nd my-5 px-5 mt-12" style=" text-align: center;">
            <div class="text-body-1 font-weight-bold d-inline bg-red-accent-4 py-1 px-3 header-red ">
                TASTY & AFFORDABLE
            </div>
            <h1 class="text-h2">Pasta Dishes</h1>
            <v-card-subtitle class="">
                <span class="">Tasty, fresh, well-seasoned</span>
            </v-card-subtitle>
        </div>
        <v-container>
            <v-row justify="center" align="center" class="">
                <v-col cols="12" sm="6" md="4" v-for="(item, key) in filteredData.PA" :key="item.menuCode"
                    style="position: relative !important;">
                    <v-img v-if="item.isHot" class="best-seller" src="@/assets/best-seller.png" width="120" cover></v-img>
                    <v-card class="menu-card  menu-card align-center d-flex flex-row ">
                        <div style="position:relative; display: inline-block;" @click="dialog = true">
                            <v-img class="align-end text-white " aspect-ratio="1" height="170" width="170" cover
                                :src="item.img">
                                <template v-slot:placeholder>
                                    <div class="d-flex align-center justify-center fill-height">
                                        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                    </div>
                                </template>
                            </v-img>
                            <v-btn
                              icon
                              class="download-btn"
                              size="small"
                              style="position: absolute; top: 8px; right: 8px; background: #fff; color: #ff1744; box-shadow: 0 2px 8px rgba(0,0,0,0.12); z-index: 2;"
                              @click.stop="downloadImage(item.img, item.menuName)"
                            >
                              <v-icon>mdi-download</v-icon>
                            </v-btn>
                        </div>
                        <div class="  align-center pa-4">
                            <h4 class="">{{ item.menuName }}</h4>
                            <div class=" text-grey-lighten-1 text-caption">{{ item.menuDesc }}</div>
                            <h5 class="my-2">Php {{ item.menuPrice }}</h5>
                            <v-btn @click="AddToCart(item)" class="mt-1 text-subtitle-2" density="comfortable"
                                prepend-icon="mdi-cart" color="amber" variant="outlined">Add to order</v-btn>
                        </div>
                    </v-card>

                </v-col>
            </v-row>
        </v-container>
        <!-- end -->

        <!-- Vegetable Dishes -->
        <div v-if="!searchQuery" id="vegetable" class=" div2nd my-5 px-5 mt-12" style=" text-align: center;">
            <div class="text-body-1 font-weight-bold d-inline bg-red-accent-4 py-1 px-3 header-red ">
                TASTY & AFFORDABLE
            </div>
            <h1 class="text-h2">Vegetable Dishes</h1>
            <v-card-subtitle class="">
                <span class="">Tasty, fresh, well-seasoned</span>
            </v-card-subtitle>
        </div>
        <v-container>
            <v-row justify="center" align="center" class="">
                <v-col cols="12" sm="6" md="4" v-for="(item, key) in filteredData.VE" :key="item.menuCode"
                    style="position: relative !important;">
                    <v-img v-if="item.isHot" class="best-seller" src="@/assets/best-seller.png" width="120" cover></v-img>
                    <v-card class="menu-card  menu-card align-center d-flex flex-row ">
                        <div style="position:relative; display: inline-block;" @click="dialog = true">
                            <v-img class="align-end text-white " aspect-ratio="1" height="170" width="170" cover
                                :src="item.img">
                                <template v-slot:placeholder>
                                    <div class="d-flex align-center justify-center fill-height">
                                        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                    </div>
                                </template>
                            </v-img>
                            <v-btn
                              icon
                              class="download-btn"
                              size="small"
                              style="position: absolute; top: 8px; right: 8px; background: #fff; color: #ff1744; box-shadow: 0 2px 8px rgba(0,0,0,0.12); z-index: 2;"
                              @click.stop="downloadImage(item.img, item.menuName)"
                            >
                              <v-icon>mdi-download</v-icon>
                            </v-btn>
                        </div>
                        <div class="  align-center pa-4">
                            <h4 class="">{{ item.menuName }}</h4>
                            <div class=" text-grey-lighten-1 text-caption">{{ item.menuDesc }}</div>
                            <h5 class="my-2">Php {{ item.menuPrice }}</h5>
                            <v-btn @click="AddToCart(item)" class="mt-1 text-subtitle-2" density="comfortable"
                                prepend-icon="mdi-cart" color="amber" variant="outlined">Add to order</v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <!-- end -->

        <!-- Dessert Dishes -->
        <div v-if="!searchQuery" id="dessert" class=" div2nd my-5 px-5 mt-12" style=" text-align: center;">
            <div class="text-body-1 font-weight-bold d-inline bg-red-accent-4 py-1 px-3 header-red ">
                TASTY & AFFORDABLE
            </div>
            <h1 class="text-h2">Dessert Dishes</h1>
            <v-card-subtitle class="">
                <span class="">Tasty, fresh, well-seasoned</span>
            </v-card-subtitle>
        </div>
        <v-container>
            <v-row justify="center" align="center" class="">
                <v-col cols="12" sm="6" md="4" v-for="(item, key) in filteredData.MC" :key="item.menuCode"
                    style="position: relative !important;">
                    <v-img v-if="item.isHot" class="best-seller" src="@/assets/best-seller.png" width="120" cover></v-img>
                    <v-card class="menu-card  menu-card align-center d-flex flex-row ">
                        <div style="position:relative; display: inline-block;" @click="dialog = true">
                            <v-img class="align-end text-white " aspect-ratio="1" height="170" width="170" cover
                                :src="item.img">
                                <template v-slot:placeholder>
                                    <div class="d-flex align-center justify-center fill-height">
                                        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                    </div>
                                </template>
                            </v-img>
                            <v-btn
                              icon
                              class="download-btn"
                              size="small"
                              style="position: absolute; top: 8px; right: 8px; background: #fff; color: #ff1744; box-shadow: 0 2px 8px rgba(0,0,0,0.12); z-index: 2;"
                              @click.stop="downloadImage(item.img, item.menuName)"
                            >
                              <v-icon>mdi-download</v-icon>
                            </v-btn>
                        </div>
                        <div class="  align-center pa-4">
                            <h4 class="">{{ item.menuName }}</h4>
                            <div class=" text-grey-lighten-1 text-caption">{{ item.menuDesc }}</div>
                            <h5 class="my-2">Php {{ item.menuPrice }}</h5>
                            <v-btn @click="AddToCart(item)" class="mt-1 text-subtitle-2" density="comfortable"
                                prepend-icon="mdi-cart" color="amber" variant="outlined">Add to order</v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <!-- end -->

        <!-- Seafood Dishes -->
        <div v-if="!searchQuery" id="seafood" class=" div2nd my-5 px-5 mt-12" style=" text-align: center;">
            <div class="text-body-1 font-weight-bold d-inline bg-red-accent-4 py-1 px-3 header-red ">
                TASTY & AFFORDABLE
            </div>
            <h1 class="text-h2">Seafood Dishes</h1>
            <v-card-subtitle class="">
                <span class="">Tasty, fresh, well-seasoned</span>
            </v-card-subtitle>
        </div>
        <v-container>
            <v-row justify="center" align="center" class="">
                <v-col cols="12" sm="6" md="4" v-for="(item, key) in filteredData.SF" :key="item.menuCode"
                    style="position: relative !important;">
                    <v-img v-if="item.isHot" class="best-seller" src="@/assets/best-seller.png" width="120" cover></v-img>
                    <v-card class="menu-card  menu-card align-center d-flex flex-row ">
                        <div style="position:relative; display: inline-block;" @click="dialog = true">
                            <v-img class="align-end text-white " aspect-ratio="1" height="170" width="170" cover
                                :src="item.img">
                                <template v-slot:placeholder>
                                    <div class="d-flex align-center justify-center fill-height">
                                        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                    </div>
                                </template>
                            </v-img>
                            <v-btn
                              icon
                              class="download-btn"
                              size="small"
                              style="position: absolute; top: 8px; right: 8px; background: #fff; color: #ff1744; box-shadow: 0 2px 8px rgba(0,0,0,0.12); z-index: 2;"
                              @click.stop="downloadImage(item.img, item.menuName)"
                            >
                              <v-icon>mdi-download</v-icon>
                            </v-btn>
                        </div>
                        <div class="  align-center pa-4">
                            <h4 class="">{{ item.menuName }}</h4>
                            <div class=" text-grey-lighten-1 text-caption">Tasty & Crispy Spare Ribs</div>
                            <h5 class="my-2">Php {{ item.menuPrice }}</h5>
                            <v-btn @click="AddToCart(item)" class="mt-1 text-subtitle-2" density="comfortable"
                                prepend-icon="mdi-cart" color="amber" variant="outlined">Add to order</v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <!-- end -->

        
        <div class=" btm-fix  py-2 bg-black" style="z-index: 1;">
            
            <div class="d-flex justify-space-around mx-auto " style="max-width: 500px;">
                <div @click="navigateTo('pork'); selectedCategory = 1 " class="fixed-icons d-flex flex-column align-center"
                :class="{ active: selectedCategory === 1 }"
                >
                    <v-icon icon="mdi-pig"></v-icon>
                    <small class="text-caption">Pork</small>
                </div>
                <div @click="navigateTo('chicken');selectedCategory = 2 " class="fixed-icons d-flex flex-column align-center"
                :class="{ active: selectedCategory === 2 }">
                    <v-icon icon="mdi-food-turkey"></v-icon>
                    <small class="text-caption">Chicken</small>
                </div>
                <div @click="navigateTo('pasta'); selectedCategory = 3" class="fixed-icons d-flex flex-column align-center"
                :class="{ active: selectedCategory === 3 }">
                    <v-icon icon="mdi-noodles"></v-icon>
                    <small class="text-caption">Pasta</small>
                </div>
                <div @click="navigateTo('vegetable');selectedCategory = 4 " class="fixed-icons d-flex flex-column align-center"
                :class="{ active: selectedCategory === 4 }">
                    <v-icon icon="mdi-leaf-circle"></v-icon>
                    <small class="text-caption">Veges</small>
                </div>
                <div @click="navigateTo('dessert'); selectedCategory = 5" class="fixed-icons d-flex flex-column align-center"
                :class="{ active: selectedCategory === 5 }">
                    <v-icon icon="mdi-cake-variant"></v-icon>
                    <small class="text-caption">Dessert</small>
                </div>
                <div @click="moreDialog = true; selectedCategory = 6" class="fixed-icons d-flex flex-column align-center"
                :class="{ active: selectedCategory === 6 }">
                    <v-icon icon="mdi-dots-horizontal"></v-icon>
                    <small class="text-caption">More</small>
                </div>
            </div>
        </div>
    </div>


    <div class="text-center">
        <v-dialog v-model="dialog" class="pa-0" max-width="500" max-height="600">
            <v-card>
                <v-img class="align-end text-white " aspect-ratio="1" cover :src="img" />
                <v-card-actions>
                    <v-btn prepend-icon="mdi-close" color="primary" block @click="dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>

    <div class="text-center">
        <v-dialog v-model="moreDialog" max-width="300">
            <v-card>
                <v-card-title class="headline">More Categories</v-card-title>
                <v-card-text>
                    <v-list>
                        <v-list-item @click="navigateTo('beef'); moreDialog = false; selectedCategory = 8" prepend-icon="mdi-food-steak">
                            <v-list-item-title>Beef Dishes</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="navigateTo('seafood'); moreDialog = false; selectedCategory = 9" prepend-icon="mdi-fish">
                            <v-list-item-title>Seafood Dishes</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="moreDialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>


</template>

<script setup>
import { update, ref as fireRefUpdate } from "firebase/database";

function generateUniqueDesc(name) {
  // Generate a unique 3-word value based on the menuName
  // For simplicity, split the name into words and take first 3 words or pad with 'X'
  const words = name.split(/\s+/).slice(0, 3);
  while (words.length < 3) {
    words.push('X');
  }
  return words.join('-').toLowerCase();
}

async function updateMenuDesc(category, key, menuName) {
  console.log(`updateMenuDesc called with category=${category}, key=${key}, menuName=${menuName}`);
  const newDesc = generateUniqueDesc(menuName);
  console.log(`Generated newDesc: ${newDesc}`);
  const path = `MenuCategory/${category}/${key}`;
  const dbRef = fireRefUpdate(db, path);
  try {
    // Disable button or show loading state could be added here
    await update(dbRef, { menuDesc: newDesc });
    console.log(`Firebase update successful for path: ${path}`);
    // Update local data to reflect change
    if (data.value[category] && data.value[category][key]) {
      data.value[category][key].menuDesc = newDesc;
    }
    alert(`Updated menuDesc to "${newDesc}" for ${menuName}`);
  } catch (error) {
    console.error("Failed to update menuDesc:", error);
    alert("Failed to update menuDesc. See console for details.");
  } finally {
    // Re-enable button or hide loading state here if implemented
  }
}
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
import { ref, computed, getCurrentInstance, onMounted, inject } from 'vue'
// import { collection, getDocs } from "firebase/firestore";
import { ref as fireRef, child, get, query, orderByChild, equalTo } from "firebase/database";
import { ref as refS, getDownloadURL } from "firebase/storage";
import { db, storage } from '@/firebase'
import 'vue-skeletor/dist/vue-skeletor.css';
import { Skeletor } from 'vue-skeletor';

const internalInstance = getCurrentInstance()
const img = ref(null);
const dialog = ref(false);
const moreDialog = ref(false);
const selectedCategory = ref(null);
const fetching = ref(true);
const timeout = ref(10000);
const data = ref({});
const items = ref({})
const searchQuery = ref('');
const emitter = inject('emitter');
const smoothScroll = inject('smoothScroll');

function AddToCart(val) {
    internalInstance.appContext.config.globalProperties.gVar.items[val.menuCode] = val
    emitter.emit('add-per-menu', 1);
}
function OpenCart() {
    // emitter.emit('add-permenu-items', items);

}
function navigateTo(val) {
    // Close the dialog first if it's open
    if (moreDialog.value) {
        moreDialog.value = false;
    }

    // Add a small delay to ensure the dialog has closed and DOM is stable
    setTimeout(() => {
        const myEl = document.getElementById(val);
        if (myEl) {
            smoothScroll({
                scrollTo: myEl,
                // duration: 500,
                // offset: -50,
            });
        } else {
            console.warn(`Element with ID "${val}" not found for scrolling.`);
        }
    }, 300); // Increased delay to 300ms
}

const filteredData = computed(() => {
  if (!searchQuery.value) {
    return data.value;
  }
  const lowerQuery = searchQuery.value.toLowerCase();
  const result = {};
  for (const category in data.value) {
    const filteredItems = {};
    for (const key in data.value[category]) {
      const item = data.value[category][key];
      if (item.menuName.toLowerCase().includes(lowerQuery)) {
        filteredItems[key] = item;
      }
    }
    if (Object.keys(filteredItems).length > 0) {
      result[category] = filteredItems;
    }
  }
  return result;
});

onMounted(async () => {

    const selectedBranch = localStorage.getItem('selectedBranch') || 'naga';

    const dbRef = fireRef(db, 'MenuCategory');
    
    get(dbRef).then((snapshot) => {
        const allData = snapshot.val();
        const filteredData = {};

        for (const category in allData) {
            const categoryItems = allData[category];
            const filteredItems = {};
            for (const key in categoryItems) {
                if (Array.isArray(categoryItems[key].branches) && categoryItems[key].branches.includes(selectedBranch)) {
                    filteredItems[key] = categoryItems[key];
                }
            }
            if(Object.keys(filteredItems).length > 0){
                 filteredData[category] = filteredItems;
            }
        }
        data.value = filteredData;
        fetching.value = false;
    }).catch((error) => {
        console.error(error);
        fetching.value = false;
    });


    const imagesRef = refS(storage, 'img/IMG_20220420_133639.jpg');
    getDownloadURL(imagesRef)
        .then((url) => {
            img.value = url
        })

    window.scrollTo(0, 0)
});
// Remove filteredData and branchDialog logic
// function trigger(){
//     this.emitter.emit('update', 1)
// }
</script>

<style scoped>
/* Download button */
.download-btn {
  border-radius: 50% !important;
  min-width: 36px !important; /* Increased size */
  min-height: 36px !important; /* Increased size */
  width: 36px !important; /* Increased size */
  height: 36px !important; /* Increased size */
  box-shadow: 0 2px 8px rgba(0,0,0,0.2); /* Slightly stronger shadow */
  transition: background 0.3s ease, color 0.3s ease; /* Smoother transition */
  z-index: 2;
  background: rgba(0, 0, 0, 0.4) !important; /* Semi-transparent dark background */
  color: #fff !important; /* White icon */
}
.download-btn:hover {
  background: #ff1744 !important; /* Keep the red accent on hover */
  color: #fff !important;
}

/* Banner image */
.banner-img {
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(https://firebasestorage.googleapis.com/v0/b/postres-c30e4.appspot.com/o/img%2FIMG_20220420_133639.jpg?alt=media&token=bc565fbc-7776-4c8d-90c4-604d758e767a);
}

/* Section header */
.div2nd {
  padding-bottom: 0;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.div2ndh3 {
  display: inline;
  background-color: #ED0000;
}
.div2ndh1 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.text-h2 {
  font-family: 'Satisfy', helvetica !important;
}

.header-red {
  font-family: 'Montserrat' !important;
  font-weight: 600;
}

/* Bottom fixed bar */
.btm-fix {
  position: fixed;
  width: 100%;
  bottom: 0;
}
.fixed-icons {
  color: #AAAAAA;
  transition: ease all .5s;
  cursor: pointer;
  max-width: 100px !important;
}
.fixed-icons.active {
  color: rgb(250, 185, 8) !important;
}

/* Menu card */
.menu-card {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
  transition: all ease 0.3s;
}
.menu-card-hover {
  box-shadow: rgba(121, 188, 243, 0.35) 0px 5px 15px;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}

.best-seller {
  position: absolute !important;
  top: 4px;
  left: 4px;
  z-index: 1 !important;
}
</style>
