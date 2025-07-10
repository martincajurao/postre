<template lang="">
        <v-container>
        <v-row class="d-flex align-center">
<v-col cols="12" sm="6" md="4" v-for="item in comboList" :key="item.name" style="position:relative">

            <v-img class="best-seller" src="@/assets/best-seller.png" width="150" cover ></v-img>

            <v-card :loading="loading" class="mx-auto my-2" style="position:relative;" >
              <template v-slot:loader="{ isActive }">
                <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
              </template>

              <div style="position:relative;">
                <v-img  cover :src="item.img">
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular color="deep-purple" indeterminate></v-progress-circular>
                    </div>
                  </template>
                  <div class="d-flex justify-end align-end h-100">
                    <h4 class="text-h5 font-weight-bold bg-red-accent-4 px-4 py-2">{{item.name}}</h4>
                  </div>
                </v-img>
                <v-btn
                  icon
                  class="download-btn"
                  size="small"
                  style="position: absolute; top: 8px; right: 8px; background: transparent; color: #fff; box-shadow: none; z-index: 2; border: none;"
                  @click="downloadImage(item.img, item.name)"
                  aria-label="Download image"
                >
                  <v-icon color="#fff">mdi-download</v-icon>
                </v-btn>
              </div>
              <v-card-item>
                <h3 >{{ item.desc }}</h3>
                <v-chip class="mt-1" size="small" color="green-accent-4">Save &#8369;{{Number(item.disc).toLocaleString()}}
                </v-chip>
              </v-card-item>
              <!-- Uncommented v-card-text -->
              <v-card-text>
                <div class=" text-grey-lighten-1">
                  <h4 class="text-body-2 "> Package Inclusion:</h4>
                  <div class=" d-flex flex-wrap justify-start">
                    <div class="text-body-2 mr-1 mt-2" v-for="member in item.members">
                      <v-tooltip >
                        <div class="mt-2" v-if="member.img"> <!-- Only show div if img exists -->
                          <img :src="member.img" height="150" style="object-fit: cover;" alt="">
                        </div>
                        <template v-slot:activator="{ props }">
                          <span v-bind="props"> <!-- Wrap v-chip in a span -->
                            <v-chip   color="" size="small"> {{ member.menuName }}</v-chip>
                          </span>
                        </template>
                      </v-tooltip>
                    </div>
                  </div>
                </div>
              </v-card-text>
              <v-divider class="mx-4 mb-1"></v-divider>
              <!-- Commented out v-card-actions -->
              <!--
              <v-card-actions class="px-4 pb-4 pt-3">
                <v-btn  prepend-icon="mdi-cart" class=" px-3"  color="#DF2C00" variant="flat" @click="AddCombo(item)">
                  order
                </v-btn>
                <v-spacer></v-spacer>
                <h3 class="text-h4"> &#8369;{{Number(item.price).toLocaleString()}}</h3>
              </v-card-actions>
              -->
            </v-card>
          </v-col>

        </v-row>
      </v-container>
</template>
<script setup>
// Download image utility
function downloadImage(url, name) {
  fetch(url, { mode: 'cors' })
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
    })
    .catch(() => {
      // fallback: open in new tab if download fails
      window.open(url, '_blank');
    });
}
import { ref, getCurrentInstance, onMounted, inject, computed } from 'vue'
import { db, storage } from '@/firebase'
import { ref as refS, getDownloadURL } from "firebase/storage";
import { useCartStore } from '@/stores/cart'; // Import the Pinia store

const emitter = inject('emitter');
const internalInstance = getCurrentInstance()
const cartStore = useCartStore(); // Initialize the store
const loading = ref(false); // Add this line
// ... other refs and props

const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
})

const comboList = computed(() => {
  if (!props.data) {
    return [];
  }
  const result = Array.isArray(props.data) ? props.data : Object.values(props.data);
  return result;
});


function AddCombo(val) {
    // Use cartStore.combo instead of gVar.combo
    cartStore.combo[val.name] = val;
    emitter.emit('add-combo', val);
    emitter.emit('add-per-menu', 1);
}
</script>
<style lang="scss">
    .best-seller{
      position: absolute !important;
      top: .6rem;
      left: 2px;
      z-index: 2 !important;
    }
    .download-btn {
      border-radius: 50% !important;
      min-width: 32px !important;
      min-height: 32px !important;
      width: 32px !important;
      height: 32px !important;
      background: transparent !important;
      color: #fff !important;
      border: none !important;
      box-shadow: none !important;
      transition: background 0.2s, color 0.2s;
      z-index: 2;
    }
    .download-btn:hover {
      background: transparent !important;
      color: #fff !important;
    }
</style>