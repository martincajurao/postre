<template>
  <v-main>
    <router-view />
  </v-main>
</template>

<script setup>
  //

</script>

<style>
@keyframes slideInLeft {
  0% {
    transform: translateY(200%);
  }
  100% {
    transform: translateY(0);
  }
}

.mainWrap {
  animation: 1s ease-out 0s 1 slideInLeft;
}
</style>
