<template>
  <div class="mainWrap mb-15">
    <v-card class="mx-auto ">
      <v-img src="" class="align-end text-white banner-img pa-5" height="250" cover>
        <v-row align="end" class="fill-height">
          <v-col cols="12" md="6">
            <v-card-title class="text-body-1">
              <span>Home</span>
              <v-icon icon="mdi-chevron-right"></v-icon>
              <span>Menu</span>
              <h1
                class="text-h3"
                style="font-family: Montserrat !important; font-weight: 800; text-transform: uppercase !important;"
              >
                Our Menu
              </h1>
            </v-card-title>
            <v-card-subtitle>
              <span class="max-w200">Inspired by recipes and creations of Calbayog Samar.</span>
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-img>
    </v-card>

    <template v-if="fetching">
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="i in 6" :key="i">
            <Skeletor height="170" />
          </v-col>
        </v-row>
      </v-container>
    </template>

    <template v-else-if="!fetching && Object.keys(data).length > 0">
      <div> <!-- Added wrapper div -->
        <div
          v-for="category in menuCategories"
          :key="category.id"
          :id="category.id"
          class="div2nd my-5 px-5 mt-12"
          style="text-align: center;"
        >
          <div class="text-body-1 font-weight-bold d-inline bg-red-accent-4 py-1 px-3 header-red">
            TASTY & AFFORDABLE
          </div>
          <h1 class="text-h2">{{ category.name }}</h1>
          <v-card-subtitle>
            <span>{{ category.description }}</span>
          </v-card-subtitle>

          <v-container>
            <v-row justify="center" align="center" v-if="data[category.code] && typeof data[category.code] === 'object'">
              <v-col
                v-for="item in (data[category.code] || {})"
                :key="item.menuCode"
                cols="12"
                sm="6"
                md="4"
                style="position: relative !important;"
              >
                <template v-if="!itemSizes[item.menuCode]">
                  {{ itemSizes[item.menuCode] = 'medium' }}
                </template>
                <v-img
                  v-if="item.isHot"
                  class="best-seller"
                  src="@/assets/best-seller.png"
                  width="120"
                  cover
                ></v-img>
                <v-card class="menu-card align-center d-flex flex-row">
                  <div style="position:relative; display: inline-block;" @click="dialog = true">
                    <v-img
                      class="align-end text-white"
                      aspect-ratio="1"
                      height="170"
                      width="170"
                      cover
                      :src="item.img"
                    >
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
                  <div class="align-center pa-4">
                    <h4>{{ item.menuName }}</h4>
                    <div class="text-grey-lighten-1 text-caption">{{ item.menuDesc }}</div>
<h5 class="my-2">
  Php {{ typeof getCurrentPrice(item) === 'number' ? Number(getCurrentPrice(item)).toLocaleString() : '' }}
<span v-if="item.menuPrices" class="text-caption ml-2">
    ({{ itemSizes[item.menuCode] === 'medium' ? 'Medium' : 'Large' }})
</span>
</h5>
<div class="d-flex align-center mt-1" v-if="item.menuPrices && typeof item.menuPrices === 'object' && showSizeSelector">
  <v-menu offset-y>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" density="compact" size="small">
        {{ itemSizes[item.menuCode] === 'medium' ? 'Medium' : 'Large' }}
        <v-icon right>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="itemSizes[item.menuCode] = 'medium'">
        <v-list-item-title>Medium</v-list-item-title>
      </v-list-item>
      <v-list-item @click="itemSizes[item.menuCode] = 'large'">
        <v-list-item-title>Large</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</div>
                    <v-btn
                      @click="AddToCart(item, itemSizes[item.menuCode], getCurrentPrice(item))"
                      class="mt-1 text-subtitle-2"
                      density="comfortable"
                      prepend-icon="mdi-cart"
                      color="amber"
                      variant="outlined"
                    >
                      Add to order
                    </v-btn>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div> <!-- Closing wrapper div -->
    </template>

    <div class="btm-fix py-2 bg-black" style="z-index: 1;">
      <div class="d-flex justify-space-around mx-auto" style="max-width: 500px;">
        <div
          v-for="(category, index) in menuCategories"
          :key="category.id"
          @click="navigateTo(category.id); selectedCategory = index + 1"
          class="fixed-icons d-flex flex-column align-center"
          :class="{ active: selectedCategory === index + 1 }"
        >
          <v-icon :icon="category.icon"></v-icon>
          <small class="text-caption">{{ category.name.split(' ')[0] }}</small>
        </div>
        <div
          @click="moreDialog = true; selectedCategory = menuCategories.length + 1"
          class="fixed-icons d-flex flex-column align-center"
          :class="{ active: selectedCategory === menuCategories.length + 1 }"
        >
          <v-icon icon="mdi-dots-horizontal"></v-icon>
          <small class="text-caption">More</small>
        </div>
      </div>
    </div>
  </div>

  <div class="text-center">
    <v-dialog v-model="dialog" class="pa-0" max-width="500" max-height="600">
      <v-card>
        <v-img class="align-end text-white" aspect-ratio="1" cover :src="img" />
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
            <v-list-item
              @click="navigateTo('beef'); moreDialog = false; selectedCategory = menuCategories.length + 2"
              prepend-icon="mdi-food-steak"
            >
              <v-list-item-title>Beef Dishes</v-list-item-title>
            </v-list-item>
            <v-list-item
              @click="navigateTo('seafood'); moreDialog = false; selectedCategory = menuCategories.length + 3"
              prepend-icon="mdi-fish"
            >
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
import { ref, getCurrentInstance, onMounted, inject, computed, reactive, nextTick } from "vue";
import { update, ref as fireRef, ref as fireRefUpdate, onValue } from "firebase/database";
import { db } from '@/firebase';

const fetching = ref(false);
const selectedCategory = ref(0);
const moreDialog = ref(false);
const dialog = ref(false);
const img = ref('');
const itemSizes = reactive({});
const showSizeSelector = false;
const data = reactive({});


function generateUniqueDesc(name) {
  const words = name.split(/\s+/).slice(0, 3);
  while (words.length < 3) {
    words.push("X");
  }
  return words.join("-").toLowerCase();
}

async function updateMenuDesc(category, key, menuName) {
  console.log(`updateMenuDesc called with category=${category}, key=${key}, menuName=${menuName}`);
  const newDesc = generateUniqueDesc(menuName);
  console.log(`Generated newDesc: ${newDesc}`);
  const path = `MenuCategory/${category}/${key}`;
  const dbRef = fireRefUpdate(db, path);
  try {
    await update(dbRef, { menuDesc: newDesc });
    if (data.value[category] && data.value[category][key]) {
      data.value[category][key].menuDesc = newDesc;
    }
    alert(`Updated menuDesc to "${newDesc}" for ${menuName}`);
  } catch (error) {
    console.error("Failed to update menuDesc:", error);
    alert("Failed to update menuDesc. See console for details.");
  }
}

function downloadImage(url, name) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = name ? `${name}.jpg` : "image.jpg";
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      }, 100);
    });
}


import { useCartStore } from '@/stores/cart'; // Import the Pinia store
// ... other imports

const internalInstance = getCurrentInstance();
const cartStore = useCartStore(); // Initialize the store
// ... other refs

 // Ensure computed is imported

const categoryMapping = {
  BF: { id: 'beef', name: 'Beef Dishes', icon: 'mdi-food-steak', code: 'BF', description: 'Delicious beef dishes.' },
  CH: { id: 'chicken', name: 'Chicken Dishes', icon: 'mdi-food-drumstick', code: 'CH', description: 'Savory chicken dishes.' },
  SF: { id: 'seafood', name: 'Seafood Dishes', icon: 'mdi-fish', code: 'SF', description: 'Fresh seafood dishes.' },
  PO: { id: 'pork', name: 'Pork Dishes', icon: 'mdi-pig', code: 'PO', description: 'Tender pork dishes.' },
  VE: { id: 'vegetables', name: 'Vegetable Dishes', icon: 'mdi-carrot', code: 'VE', description: 'Healthy vegetable options.' },
  MC: { id: 'desserts', name: 'Desserts', icon: 'mdi-cake', code: 'MC', description: 'Sweet treats.' },
  PA: { id: 'pasta', name: 'Pasta Dishes', icon: 'mdi-food-variant', code: 'PA', description: 'Delicious pasta dishes.' },
};

const menuCategories = computed(() => {
  return Object.keys(data).filter(code => code !== 'null').map(code => categoryMapping[code]).filter(Boolean);
});



const emitter = inject("emitter");

function getCurrentPrice(item) {
  if (!item) {
    return 0;
  }

  // Case 1: menuPrices is an object with size-specific prices
  if (item.menuPrices && typeof item.menuPrices === 'object' && item.menuPrices !== null) {
    const selectedSize = itemSizes[item.menuCode] || 'medium'; // Default to medium
    return Number(item.menuPrices[selectedSize] || item.menuPrices.medium || 0);
  }

  // Case 2: menuPrices is a single numeric value
  if (item.menuPrices && !isNaN(item.menuPrices)) {
    return Number(item.menuPrices);
  }

  // Case 3: Fall back to menuPrice if menuPrices is not available
  if (item.menuPrice && !isNaN(item.menuPrice)) {
    return Number(item.menuPrice);
  }

  return 0; // Default case
}

function AddToCart(val, selectedSize, currentPrice) {
  console.log("DEBUG: AddToCart - item being added:", val);
  console.log("DEBUG: AddToCart - selectedSize:", selectedSize);
  console.log("DEBUG: AddToCart - currentPrice:", currentPrice);
  cartStore.addItem(val, selectedSize, currentPrice);
}

function navigateTo(val) {
  console.log("navigateTo called with", val);
  nextTick(() => {
    const element = document.getElementById(val);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

onMounted(async () => {
  fetching.value = true;
  const selectedBranch = localStorage.getItem("selectedBranch") || "naga";
  const dbRef = fireRef(db, "Menu");

  onValue(dbRef, (snapshot) => {
    const fetchedData = snapshot.val();
    if (fetchedData) {
      const grouped = {};
      Object.values(fetchedData).forEach(item => {
        const cat = item.menuCategory;
        if (!grouped[cat]) grouped[cat] = {};
        grouped[cat][item.menuCode] = item;
      });
      Object.assign(data, grouped);
    }
    fetching.value = false;
  }, {
    onlyOnce: true
  });
});

</script>

<style scoped>
.download-btn {
  border-radius: 50% !important;
  min-width: 36px !important;
  min-height: 36px !important;
  width: 36px !important;
  height: 36px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease, color 0.3s ease;
  z-index: 2;
  background: rgba(0, 0, 0, 0.4) !important;
  color: #fff !important;
}
.download-btn:hover {
  background: #ff1744 !important;
  color: #fff !important;
}

.banner-img {
  background-size: cover;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.65),
      rgba(0, 0, 0, 0.65)
    ),
    url(https://firebasestorage.googleapis.com/v0/b/postres-c30e4.appspot.com/o/img%2FIMG_20220420_133639.jpg?alt=media&token=bc565fbc-7776-4c8d-90c4-604d758e767a);
}

.div2nd {
  padding-bottom: 0;
  margin-top: 2rem;
  margin-bottom: 2rem;
  scroll-margin-top: 100px;
}
.div2ndh3 {
  display: inline;
  background-color: #ed0000;
}
.div2ndh1 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.text-h2 {
  font-family: "Satisfy", helvetica !important;
}

.header-red {
  font-family: "Montserrat" !important;
  font-weight: 600;
}

.btm-fix {
  position: fixed;
  width: 100%;
  bottom: 0;
}
.fixed-icons {
  color: #aaaaaa;
  transition: ease all 0.5s;
  cursor: pointer;
  max-width: 100px !important;
}
.fixed-icons:hover {
  color: rgb(250, 185, 8) !important;
  transform: scale(1.1);
}
.fixed-icons.active {
  color: rgb(250, 185, 8) !important;
}

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
