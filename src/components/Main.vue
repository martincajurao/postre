<template>
  <div class="mainWrap">
    <div ref="home"></div>
    <v-container fluid class="wrapper">
      <v-row class="align-center text-left banner">
        <div v-el:home class="content">
          <div class="text-body-1  d-inline bg-red-accent-4 py-2 px-3 header-red ">
            Mango Crepe & Food Packages
          </div>
          <h1 class="text-h1  pt-5">Postre's</h1>
          <h2 class="text-h3 ">Crepe de Mango</h2>
          <v-btn class="mt-8 px-6 btnMenu " height="50" color="red-accent-4" rounded="0" variant="flat"
            prepend-icon="mdi-view-carousel">
            OUR MENU
          </v-btn>
        </div>
      </v-row>



      <div class="div2nd px-5 py-3" style=" text-align: center;">
        <div class="text-body-1  d-inline bg-red-accent-4 py-1 px-3 header-red ">
          OUR BEST OFFER
        </div>
        <h1 class="text-h2">Choose & enjoy</h1>
        <p ref="offer" class="font-weight-thin text-grey-darken-1">
          Inspired by recipes and creations of world’s best chefs
        </p>
      </div>
      <v-container>
        <v-row class="d-flex align-center">
          <v-col cols="12" sm="6" md="4" v-for="item in data">
            <v-card :loading="loading" class="mx-auto my-2" >
              <template v-slot:loader="{ isActive }">
                <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
              </template>

              <v-img cover height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
              <v-card-item>
                <h3 class="text-h4" style="font-family: Satisfy !important;">{{ item.desc }}</h3>
                <v-card-subtitle>
                  <span class="me-1">Best Seller</span>
                  <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                </v-card-subtitle>
              </v-card-item>
              <v-card-text>

                <div class="mb- text-subtitle-1 d-flex align-center">
                  &#8369;{{ item.price }}<v-chip density="comfortable" class="text-green-accent-3 ml-2" size="small"> Save
                    &#8369;{{ item.disc }}</v-chip>
                </div>
                <v-divider class="my-2"></v-divider>
                <div class="me-1 text-grey-lighten-1">
                  <h4 class="mb-1"> Package Inclusion:</h4>
                  <div class=" d-flex flex-wrap justify-start">
                    <div class="text-body-2 ma-1" v-for="member in item.members">
                      <v-tooltip >
                        <div class="mt-2">
                          <img  height="150" cover :src="member.img" alt="">
                        </div>
                        <template v-slot:activator="{ props }">
                          <v-chip color="" v-bind="props"  size="small"> {{ member.menuName }}</v-chip>
                        </template>
                      </v-tooltip>
                    </div>
                  </div>
                </div>
              </v-card-text>
              <v-divider class="mx-4 mb-1"></v-divider>
              <v-card-actions class="px-4 pb-4 pt-3">
                <v-btn prepend-icon="mdi-cart" class=" w-100" color="amber" variant="text" @click="reserve">
                  Reserve
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

        </v-row>
      </v-container>

      <!-- <SlidesCombo/> -->
      <div ref="about" class="div2nd px-5 py-3 w-75 mx-auto" style=" text-align: center;">
        <div class="text-body-1  d-inline bg-red-accent-4 py-1 px-3 header-red ">
          ABOUT US
        </div>
        <h1 class="text-h3">Postre Crepe & Food Packages</h1>
        <p class=" font-weight-thin text-grey-darken-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit eveniet, blanditiis inventore officia beatae
          delectus architecto nemo! Exercitationem, nulla velit?
        </p>
      </div>

    </v-container>

    <div ref="location"></div>
  </div>
</template>

<script setup>

import SlidesCombo from '@/components/SlidesCombo.vue'
import { ref, onMounted, inject, getCurrentInstance } from 'vue'
import { ref as fireRef, getDatabase, child, get, set, query, orderByChild, orderByValue, limitToFirst } from "firebase/database";
import { ref as strRef, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from '@/firebase'

const offer = ref(null);
const about = ref(null);
const location = ref(null);
const data = ref(null)
const imgPreview = ref(false)

const internalInstance = getCurrentInstance()

onMounted(() => {
  internalInstance.appContext.config.globalProperties.gVar.offer = offer.value;
  internalInstance.appContext.config.globalProperties.gVar.about = about.value;
  internalInstance.appContext.config.globalProperties.gVar.location = location.value;

  const que = query(fireRef(db, 'Combo'));

  get(que).then((snapshot) => {

    data.value = snapshot.val()
  })
})
function ShowmenuImg(val) {
  alert(val)
}




    // this.emitter.on("update", val => {
    //   alert(val)
    // })



</script>
<style lang="scss" scoped>
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

  H3 {
    display: inline;
    background-color: #F79F00;
    padding: .5rem;
  }

  h1 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
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

