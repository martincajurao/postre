<template>
  <v-btn @click="testButton" color="primary" class="ma-4">Test Button</v-btn>
</template>

<script setup>
const testButton = () => {
  alert('Test button clicked');
}
</script>
