<template>
    <header :class="{ 'scrolled-nav': scrollPosition }">
        <nav>
            <div class="branding">
                <img class="logo" src="@/assets/postre_new.png" alt="">
            </div>

            <ul class="navigation" v-show="!mobile">

                <li> <router-link @click="setActive(1, 'home')" class="link"
                        :class="{ 'clickedActive': activeTab === 1 ? 'clickedActive' : '' }"
                        :to="{ name: 'Home' }">Home</router-link></li>
                <li> <router-link @click="setActive(2, 'offer')" class="link"
                        :class="{ 'clickedActive': activeTab === 2 ? 'clickedActive' : '' }" :to="{ name: 'Home' }">Best
                        Offer</router-link></li>
                <li> <router-link @click="setActive(3, 'menu')" class="link"
                        :class="{ 'clickedActive': activeTab === 3 ? 'clickedActive' : '' }" :to="{ name: 'Menu' }">Our
                        Menu</router-link></li>
                <li> <router-link @click="setActive(4, 'location')" class="link"
                        :class="{ 'clickedActive': activeTab === 4 ? 'clickedActive' : '' }"
                        :to="{ name: 'Home' }">Location</router-link></li>
                <li> <router-link @click="setActive(5, 'about')" class="link"
                        :class="{ 'clickedActive': activeTab === 5 ? 'clickedActive' : '' }" :to="{ name: 'Home' }">About
                        Us</router-link></li>
                <li> <router-link @click="setActive(6, 'dashboard')" class="link"
                        :class="{ 'clickedActive': activeTab === 6 ? 'clickedActive' : '' }" :to="{ name: 'Dashboard' }">Dashboard</router-link></li>
          

            </ul>
             <div class="branch-selector-wrapper">
               <v-select
                 v-model="selectedBranch"
                 :items="branches"
                 item-title="name"
                 item-value="id"
                 label="Location"
                 dense
                 variant="outlined"
                 hide-details
                 class="branch-selector"
                 @update:modelValue="onBranchChanged"
               ></v-select>
             </div>
            <div class="icon">
                <router-link v-show="mobile" @click="setActive(0)" class="mr-4 mt-2"  :to="{ name: 'Order' }">
                    <v-badge v-show="cartItems > 0" class="ml-4 text-grey-lighten-2" style="cursor: pointer;"
                        :content="cartItems" color="red">
                        <v-icon x-large>mdi-cart-variant</v-icon>
                    </v-badge>
                </router-link>
                <v-icon icon="mdi-account-group" size="large" @click="toggleMobileNav" v-show="mobile" class="mdi-menu"
                    :class="{ 'iconActive': mobileNav }" />
            </div>
            <Transition name="mobile-nav">
                <ul class="dropDown-nav" v-show="mobileNav">
                    <div class="branding mb-2">
                        <img class="logo" src="@/assets/postre_new.png" alt="">
                        <h2 class=" ml-2">Postre</h2>

                    </div>
                    <li> <router-link @click="setActive(1, 'home')"
                            :class="{ 'clickedSideTab': activeTab === 1 ? 'clickedActiveTab' : '' }" class="link"
                            :to="{ name: 'Home' }"> <v-icon class="pr-4" size="x-large" icon="mdi-home"></v-icon>
                            Home</router-link></li>
                    <li> <router-link @click="setActive(2, 'offer')"
                            :class="{ 'clickedSideTab': activeTab === 2 ? 'clickedActiveTab' : '' }" class="link"
                            :to="{ name: 'Home' }"> <v-icon class="pr-4" size="x-large" icon="mdi-cart-check"></v-icon>
                            Best
                            Offer</router-link></li>
                    <li> <router-link @click="setActive(3, 'menu')"
                            :class="{ 'clickedSideTab': activeTab === 3 ? 'clickedActiveTab' : '' }" class="link"
                            :to="{ name: 'Menu' }"> <v-icon class="pr-4" size="x-large" icon="mdi-sitemap"></v-icon> Our
                            Menu</router-link></li>
                    <li> <router-link @click="setActive(4, 'location')"
                            :class="{ 'clickedSideTab': activeTab === 4 ? 'clickedActiveTab' : '' }" class="link"
                            :to="{ name: 'Home' }"> <v-icon class="pr-4" size="x-large" icon="mdi-map"></v-icon>
                            Location</router-link></li>
                    <li> <router-link @click="setActive(5, 'about')"
                            :class="{ 'clickedSideTab': activeTab === 5 ? 'clickedActiveTab' : '' }" class="link"
                            :to="{ name: 'Home' }"> <v-icon class="pr-4" size="x-large" icon="mdi-information"></v-icon>
                            About</router-link></li>
                    <li> <router-link @click="setActive(6, 'dashboard')"
                            :class="{ 'clickedSideTab': activeTab === 6 ? 'clickedActiveTab' : '' }" class="link"
                            :to="{ name: 'Dashboard' }"> <v-icon class="pr-4" size="x-large" icon="mdi-view-dashboard"></v-icon>
                            Dashboard</router-link></li>
                </ul>
            </Transition>
        </nav>
</header>
</template>

<script setup>
import { inject, ref, computed, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue' // Removed reactive
import { useCartStore } from '@/stores/cart'; // Import the Pinia store

const scrollPosition = ref(null)
const mobile = ref(null)
const mobileNav = ref(null)
const activeTab = ref(false)
const windowWidth = ref(null)

const cartStore = useCartStore(); // Initialize the store
const branches = ref([
  { id: 'naga', name: 'Naga' },
  { id: 'calbayog', name: 'Calbayog' },
]);
const selectedBranch = ref(localStorage.getItem('selectedBranch') || 'naga');

function onBranchChanged(newBranch) {
  localStorage.setItem('selectedBranch', newBranch);
  // refresh the page to reflect changes
  window.location.reload();
}
 
 function checkScreen() {
  windowWidth.value = window.innerWidth
  if (windowWidth.value <= 750) {
    mobile.value = true
    return
  }
  mobile.value = false
  mobileNav.value = false
  return
}

function updateScroll() {
  const pos = window.scrollY
  if (pos > 50) {
    scrollPosition.value = true
    return
  }
  scrollPosition.value = false
}

function toggleMobileNav() {
  mobileNav.value = !mobileNav.value
}

const emitter = inject('emitter');

function setActive(val, refName) {
  activeTab.value = val;
  if (refName) {
    emitter.emit('scroll-to', refName);
  }
  mobileNav.value = false;
}

const cartItems = computed(() => cartStore.items.itemsCount || 0)

onMounted(() => {
  window.addEventListener('resize', checkScreen)
  window.addEventListener('scroll', updateScroll)
  checkScreen()
  // Sync cartItems to global for FloatingCart
  const internalInstance = getCurrentInstance();
  if (internalInstance) {
    internalInstance.appContext.config.globalProperties.cartItemsRef = cartStore.items // Use cartStore.items
  }
  const emitter = inject('emitter')
  if (emitter) {
    emitter.on('add-per-menu', (value) => {
      // Assuming cartStore.items is an object where you want to track total items
      // You might need to adjust this based on how you want to count items in the store
      cartStore.items.itemsCount = (cartStore.items.itemsCount || 0) + value; // Update cartStore.items
    })
    emitter.on('remove', (value) => {
      cartStore.items.itemsCount = Math.max(0, (cartStore.items.itemsCount || 0) - value); // Update cartStore.items
    })
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreen)
  window.removeEventListener('scroll', updateScroll)
})
</script>
<style lang="scss" scoped>
.branch-selector-wrapper {
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.branch-selector {
    min-width: 150px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    color: white;
}

.mdi-menu {
    transition: .8s ease all;
    ;
}

header {
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 99;
    width: 100%;
    position: fixed;
    transition: 0.5s ease all;
    color: #fff;


    nav {
        display: flex;
        position: relative;
        flex-direction: row;
        padding: 12px 0;
        transition: .5s ease all;
        width: 90%;
        margin: 0 auto;

        @media(min-width: 1140px) {
            max-width: 1140px;
        }

        ul,
        .link {
            font-weight: bold;
            color: #fff;
            list-style: none;
            text-decoration: none;
        }

        li {

            padding: 10px 16px;
            margin-left: 16px;
        }

        .link {
            font-size: 14px;
            transition: .5s ease all;
            padding-bottom: 4px;
            border-bottom: 1px solid transparent;
        }

        .branding {
            display: flex;
            align-items: center;

            img {
                width: 50px;
                transition: .5s ease all;
            }

        }

        .navigation {
            display: flex;
            align-items: center;
            flex: 1;
            justify-content: flex-end;

            li {
                .link {
                    color: #AAAAAA;
                    text-transform: uppercase;

                    &:hover {
                        transition: .3s ease all;
                        border-bottom: solid 3px #ED0000;
                        color: #fff;
                        padding-bottom: 15px !important;
                    }

                }
            }
        }

        .icon {
            display: flex;
            align-items: center;
            position: absolute;
            top: 0;
            right: 24px;
            height: 100%;

            v-icon {
                cursor: pointer;
                transition: .8s ease all;
            }
        }

        .dropDown-nav {
            display: flex;
            flex-direction: column;
            position: fixed;
            width: 100%;
            max-width: 250px;
            height: 100%;
            background-color: #000;
            top: 0;
            left: 0;
            padding-left: 15px;
            padding-top: 15px;

            li {
                margin-left: 2px;

                .link {
                    color: #AAAAAA;
                    font-size: 12px;

                    &:hover {
                        color: #fff;
                        font-weight: bold;
                        transition: .5s ease all;

                    }

                }
            }
        }

        .mobile-nav-enter-active,
        .mobile-nav-leave-active {
            transition: 1s ease all;
        }

        .mobile-nav-enter-from,
        .mobile-nav-leave-to {
            transform: translateX(-250px);
        }

        .mobile-nav-enter-to {
            transform: translateX(0);
        }
    }
}

.clickedActive {
    border-bottom: solid 3px #ED0000 !important;
    padding-bottom: 15px !important;
    color: #fff !important;
}

.clickedSideTab {
    color: #fff !important;

    .pr-4 {
        margin-left: 8px;
        animation: rotation 2s infinite;
        transition: 1s ease all;
    }
}

.scrolled-nav {
    background-color: #000;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    nav {
        padding: 8px 0;

        .branding {
            img {
                width: 40px;
            }
        }
    }
}


.iconActive {
    transform: rotate(180deg);
    transition: .8s ease all;
    color: #fff;
}


.navbar {
    position: fixed;
    width: 80%;
    margin: auto;
    padding: 25px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0;
    left: 10%;
    right: 10%;
    z-index: 1;
}

.logo {
    width: 100px;
    cursor: pointer;
}

.logo:hover {
    width: 101px;
    transition: 0.3s ease-in-out;
}

.navbar ul li {
    list-style: none;
    display: inline-block;
    margin: 0 20px;
    position: relative;
    transition: ease all;
}

.navbar ul li::after {
    content: '';
    width: 0%;
    height: 3px;
    background: #ED0000;
    position: absolute;
    left: 0;
    bottom: -10px;
    transition: 0.3s ease-in-out;
}

.navbar ul li:hover::after {
    width: 100%;
}

.navbar ul li a {
    text-decoration: none;
    color: #fff;
    text-transform: capitalize;
}
</style>
