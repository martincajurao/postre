<template>
  <div class="mainWrap">
    <div ref="home"></div>
    <!-- Branch Selector Dialog -->
    <v-container fluid class="wrapper">
      <v-row class="align-center text-left banner">
        <div v-el:home class="content">
          <div class="text-body-1 d-inline bg-red-accent-4 py-2 px-3 header-red">
            Mango Crepe & Food Packages
          </div>
          <h1 class="text-h1 pt-5">Postre's</h1>
          <h2 class="text-h3">Crepe de Mango</h2>
          <router-link :to="{ name: 'Menu' }" class="router-menu-link">
            <v-btn class="mt-8 px-6 btnMenu" height="50" color="red-accent-4" rounded="0" variant="flat" prepend-icon="mdi-view-carousel">
              OUR MENU
            </v-btn>
          </router-link>
        </div>
      </v-row>

      <div class="div2nd px-5 py-3" style="text-align: center;">
        <div class="text-body-1 d-inline bg-red-accent-4 py-1 px-3 header-red">
          OUR BEST OFFER
        </div>
        <h1 class="text-h2">Choose & enjoy</h1>
        <p ref="offer" class="font-weight-thin text-grey-darken-1">
          Inspired by recipes and creations of world’s best chefs
        </p>
      </div>

      <Combo :data="data" />
      <Cropper />
      <div ref="about" class="div2nd px-5 py-3 w-75 mx-auto" style="text-align: center;">
        <div class="text-body-1 d-inline bg-red-accent-4 py-1 px-3 header-red">
          ABOUT US
        </div>
        <h1 class="text-h3">Postre Crepe & Food Packages</h1>
        <p class="font-weight-thin text-grey-darken-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit eveniet, blanditiis inventore officia beatae delectus architecto nemo! Exercitationem, nulla velit?
        </p>
      </div>
    </v-container>
    <!-- removed unused location div -->
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, inject } from 'vue';
import { ref as fireRef, query, get } from "firebase/database";
import { db } from '@/firebase';
import Combo from '@/components/Combo.vue';
import Location from '@/components/Location.vue';
import Cropper from '@/components/Cropper.vue';

const home = ref(null);
const offer = ref(null);
const about = ref(null);
const locationRef = ref(null);
const data = ref(null);
const internalInstance = getCurrentInstance();

const emitter = inject('emitter');

const selectedBranch = ref(localStorage.getItem('selectedBranch') || 'naga');

function fetchDataForBranch() {
  if (!selectedBranch.value) return;
  const que = query(fireRef(db, 'Combo'));
  get(que).then((snapshot) => {
    const allData = snapshot.val();
    if (allData && typeof allData === 'object') {
      const branchName = selectedBranch.value.toLowerCase();
      const filtered = Object.fromEntries(
        Object.entries(allData).filter(([k, v]) =>
          Array.isArray(v.branches) && v.branches.some(b => b && b.toLowerCase() === branchName)
        )
      );
      data.value = filtered;
    } else {
      data.value = allData;
    }
  });
}

onMounted(() => {
  const $smoothScroll = getCurrentInstance()?.proxy?.$smoothScroll;

  emitter.on('scroll-to', (refName) => {
    console.log('Scroll-to event received:', refName); // Add this line
    let element;
    if (refName === 'home') element = home.value;
    if (refName === 'offer') element = offer.value;
    if (refName === 'about') element = about.value;
    if (refName === 'location') element = locationRef.value?.$el;

    if (element && $smoothScroll) {
      $smoothScroll({
        scrollTo: element,
        behavior: 'smooth',
      });
    }
  });

  if (selectedBranch.value) {
    fetchDataForBranch();
  }
});

function ShowmenuImg(val) {
  alert(val);
}
</script>

<style lang="scss" scoped>
.branch-switch-btn-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1.5rem 0.5rem 0;
  background: transparent;
  z-index: 1001;
}
.router-menu-link {
  text-decoration: none;
}
.branch-switch-btn {
  transition: box-shadow 0.2s, background 0.2s;
  background: #1976d2 !important;
  color: #fff !important;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 24px;
  min-width: 180px;
}
.branch-switch-btn:hover {
  background: #1565c0 !important;
  color: #fff !important;
  box-shadow: 0 4px 16px rgba(25, 118, 210, 0.18);
}
.wrapper {
  padding: 0;
}
.rowCategory {
  width: 90%;
  margin: auto !important;
}
.banner {
  width: 100%;
  margin: 0;
  height: 100vh;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg?w=2000);
}
.content {
  width: 90%;
  margin: auto;
}
.btnMenu {
  transition: .5s ease all;
  border: solid 3px #ED0000;
  font-family: 'Montserrat' !important;
  font-weight: 600;
}
.btnMenu:hover {
  background-color: transparent !important;
  border: solid 3px #ED0000;
  color: #ED0000;
}
.flex-column {
  min-width: 100px;
  cursor: pointer;
  transition: .8s ease all;
}
.flex-column:hover {
  transition: .5s ease all;
  background-color: #333;
  margin-top: -.5rem !important;
}
.div2nd {
  padding-bottom: 0;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.div2nd H3 {
  display: inline;
  background-color: #F79F00;
  padding: .5rem;
}
.div2nd h1 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.text-h1 {
  font-family: 'Satisfy', cursive !important;
}
.text-h2,
.text-h3 {
  font-family: 'Satisfy', helvetica !important;
}
.header-red {
  font-family: 'Montserrat' !important;
  font-weight: 600;
}
</style>
