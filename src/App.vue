<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
    <FloatingCart v-if="cartItems !== null && cartItems !== undefined" :cart-items="cartItems" :items="cartItemsObj" :combo="cartComboObj" />
  </router-view>
</template>

<script setup>
import { ref, getCurrentInstance, watchEffect } from 'vue'
import FloatingCart from './components/FloatingCart.vue'

const internalInstance = getCurrentInstance()
const cartItems = ref(0)
const cartItemsObj = ref({})
const cartComboObj = ref({})

watchEffect(() => {
  // Get cartItems from AppBar if available
  const appBar = internalInstance.appContext.config.globalProperties.cartItemsRef
  cartItems.value = appBar ? appBar.cartItems : 0
  cartItemsObj.value = internalInstance.appContext.config.globalProperties.gVar.items || {}
  cartComboObj.value = internalInstance.appContext.config.globalProperties.gVar.combo || {}
})
</script>

<style>
html,body{
  font-family: Comfortaa, Helvetica, sans-serif;
  scroll-behavior: smooth;
}

</style>
