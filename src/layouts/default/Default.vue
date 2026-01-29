<template>
  <v-app>
    <default-bar v-if="!isDashboardRoute" />
    <default-view />
  </v-app>
</template>

<script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'

  const route = useRoute();
  const isDashboardRoute = computed(() => route.name === 'Dashboard');
</script>
