<template>
<div ref="locationSection">
    <div class="div2nd my-15 px-5" style="text-align: center;">
      <div class="text-body-1 d-inline bg-red-accent-4 py-1 px-3 my-2 header-red ">
        OUR LOCATION
      </div>
      <h1 class="text-h2 mt-4">Come visit us~</h1>
      <v-card-subtitle class="">
        <!-- <span class="">Inspired by recipes and creations of world’s best chefs.</span> -->
      </v-card-subtitle>
      
    </div>
    <v-row class="ma-0 pa-0 mt-10 bg-grey-darken-4" align="center" justify="center">
      <v-col cols="12" sm="6" class="ma-0 pa-0 ">
        <iframe class="w-100 mb-0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2663.3720050182!2d123.1749404432955!3d13.661052996212474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a1f39d94a080b1%3A0x3c2a18b2cd4f86aa!2sPostre%20Mango%20Crepe!5e0!3m2!1sen!2sph!4v1675739075207!5m2!1sen!2sph" height="450" style="border:0; margin-bottom: -7px !important;" allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </v-col>
      <v-col cols="12" sm="6" class="d-flex align-center justify-center ma-0 pa-0">
        <div class="text-center py-10">
          <h4 class="header-red bg-red-accent-4 d-inline px-3 py-1">CALL US</h4>
          <h1 class="text-h4 font-weight-bold mt-3"><v-icon icon="mdi-phone-dial"></v-icon> +63 091-468-0084</h1>
          <div>
            mon-thu: 11.00 – 23.00
          </div>
          <div>
            mon-thu: 11.00 – 23.00
          </div>
          <div>
            mon-thu: 11.00 – 23.00
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row class="ma-0 pa-6 bg-red-accent-4" align="center" justify="center">
      <small class="text-grey-lighten-1">Copyright@Postre 2020</small>
    </v-row>
  </div>
</template>

<script setup>
import { inject } from 'vue';

// Injected from Main.vue for branch selection
const openBranchDialog = inject('openBranchDialog');
const currentBranchName = inject('currentBranchName');
</script>

<style scoped>
.branch-switch-btn-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: transparent;
  z-index: 1001;
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
  &:hover {
    background: #1565c0 !important;
    color: #fff !important;
    box-shadow: 0 4px 16px rgba(25, 118, 210, 0.18);
  }
}
.text-h1 {
  font-family: 'Satisfy', cursive !important;
}

.text-h2,
.text-h3 {
  font-family: 'Satisfy', helvetica !important;
}
.header-red{
    font-family: 'Montserrat' !important;
  font-weight: 600;
}
</style>