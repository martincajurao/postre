<template>
    <div class="mainWrap">
        <v-card class="mx-auto ">
            <v-img src="" class="align-end text-white banner-img pa-5" height="350" cover>
                <v-card-title class="">
                    <h1 class="text-h3"
                        style="font-family: Montserrat !important; font-weight: 800; text-transform: uppercase !important;">
                        Our Menu</h1>
                       
                </v-card-title>
                <v-card-subtitle class="">
                    <span class="max-w200">Inspired by recipes and creations of Calbayog Samar.</span>
                </v-card-subtitle>
            </v-img>

        </v-card>
        {{ items }}
        <!-- Pork Dishes -->
        <div id="pork" class=" div2nd my-5 px-5 mt-12" style=" text-align: center;">
            <div class="text-body-1 font-weight-bold d-inline bg-red-accent-4 py-1 px-3 header-red ">
                TASTY & AFFORDABLE
            </div>
            <h1 class="text-h2">Pork Dishes</h1>
            <v-card-subtitle class="">
                <span class="">Perfect, tender, well-seasoned</span>
            </v-card-subtitle>
        </div>

        <v-container v-if="!fetching">
            <v-row justify="center" align="center" class="">
                <v-col cols="12" sm="6" md="4" v-for="item in data.PO" :key="item.menuCode">
                    <v-card class="menu-card  menu-card align-center d-flex flex-row ">
                        <div @click="dialog = true">
                            <v-img class="align-end text-white " aspect-ratio="1" height="170" width="170" cover :src="item.img">
                                <template v-slot:placeholder>
                                    <div class="d-flex align-center justify-center fill-height">
                                        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                    </div>
                                </template>
                            </v-img>
                        </div>
                        <div class="  align-center pa-4">
                            <h4 class="">{{ item.menuName }}</h4>
                            <div class=" text-grey-lighten-1 text-caption">Tasty & Crispy Spare Ribs</div>
                            <h5 class="my-2">Php {{ item.menuPrice }}</h5>
                            <v-btn @click="AddToCart(item)" class="mt-1 text-subtitle-2" density="comfortable"
                                prepend-icon="mdi-cart" color="amber" variant="outlined">Add to order</v-btn>
                        </div>
                    </v-card>

                </v-col>
            </v-row>
        </v-container>
        <v-container v-else-if="fetching">
            <v-row>
                <v-col cols="12" sm="6" md="4" v-for="i in 6">
                    <Skeletor height="170" />
                </v-col>
            </v-row>
        </v-container>
        <!-- end -->

        <!-- Chicken Dishes -->
        <div id="chicken" class=" div2nd my-5 px-5 mt-12" style=" text-align: center;">
            <div class="text-body-1 font-weight-bold d-inline bg-red-accent-4 py-1 px-3 header-red ">
                TASTY & AFFORDABLE
            </div>
            <h1 class="text-h2">Chicken Dishes</h1>
            <v-card-subtitle class="">
                <span class="">Perfect, tender, well-seasoned</span>
            </v-card-subtitle>
        </div>
        <v-container>
            <v-row justify="center" align="center" class="">
                <v-col cols="12" sm="6" md="4" v-for="item in data.CH" :key="item.menuCode">
                    <v-card class="menu-card  align-center d-flex flex-row ">
                        <div>
                            <v-img class="align-end text-white " aspect-ratio="1" height="170" width="170" cover :src="item.img">
                                <v-card-title></v-card-title>
                            </v-img>
                        </div>
                        <div class="  align-center pa-4">
                            <h4 class="">{{ item.menuName }}</h4>
                            <div class=" text-grey-lighten-1 text-caption">Tasty & Crispy Spare Ribs</div>
                            <h5 class="my-2">Php {{ item.menuPrice }}</h5>
                            <v-btn class="mt-1 text-subtitle-2" density="comfortable" prepend-icon="mdi-cart" color="amber"
                                variant="outlined">Add to order</v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <!-- end -->
        <!-- Pasta Dishes -->
        <div id="pasta" class=" div2nd my-5 px-5 mt-12" style=" text-align: center;">
            <div class="text-body-1 font-weight-bold d-inline bg-red-accent-4 py-1 px-3 header-red ">
                TASTY & AFFORDABLE
            </div>
            <h1 class="text-h2">Pasta Dishes</h1>
            <v-card-subtitle class="">
                <span class="">Tasty, fresh, well-seasoned</span>
            </v-card-subtitle>
        </div>
        <v-container>
            <v-row justify="center" align="center" class="">
                <v-col cols="12" sm="6" md="4" v-for="item in data.PA" :key="item.menuCode">
                    <v-card class="menu-card  align-center d-flex flex-row ">
                        <div>
                            <v-img class="align-end text-white " aspect-ratio="1" height="170" width="170" cover :src="item.img">
                                <v-card-title></v-card-title>
                            </v-img>
                        </div>
                        <div class="  align-center pa-4">
                            <h4 class="">{{ item.menuName }}</h4>
                            <div class=" text-grey-lighten-1 text-caption">Tasty & Crispy Spare Ribs</div>
                            <h5 class="my-2">Php {{ item.menuPrice }}</h5>
                            <v-btn class="mt-1 text-subtitle-2" density="comfortable" prepend-icon="mdi-cart" color="amber"
                                variant="outlined">Add to order</v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <!-- end -->
        <!-- Vegetable Dishes -->
        <div id="vegetable" class=" div2nd my-5 px-5 mt-12" style=" text-align: center;">
            <div class="text-body-1 font-weight-bold d-inline bg-red-accent-4 py-1 px-3 header-red ">
                TASTY & AFFORDABLE
            </div>
            <h1 class="text-h2">Vegetable Dishes</h1>
            <v-card-subtitle class="">
                <span class="">Tasty, fresh, well-seasoned</span>
            </v-card-subtitle>
        </div>
        <v-container>
            <v-row justify="center" align="center" class="">
                <v-col cols="12" sm="6" md="4" v-for="item in data.VE" :key="item.menuCode">
                    <v-card class="menu-card  align-center d-flex flex-row ">
                        <div>
                            <v-img class="align-end text-white " aspect-ratio="1" height="170" width="170" cover :src="item.img">
                                <v-card-title></v-card-title>
                            </v-img>
                        </div>
                        <div class="  align-center pa-4">
                            <h4 class="">{{ item.menuName }}</h4>
                            <div class=" text-grey-lighten-1 text-caption">Tasty & Crispy Spare Ribs</div>
                            <h5 class="my-2">Php {{ item.menuPrice }}</h5>
                            <v-btn class="mt-1 text-subtitle-2" density="comfortable" prepend-icon="mdi-cart" color="amber"
                                variant="outlined">Add to order</v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <!-- end -->
        <!-- Dessert Dishes -->
        <div id="dessert" class=" div2nd my-5 px-5 mt-12" style=" text-align: center;">
            <div class="text-body-1 font-weight-bold d-inline bg-red-accent-4 py-1 px-3 header-red ">
                TASTY & AFFORDABLE
            </div>
            <h1 class="text-h2">Dessert Dishes</h1>
            <v-card-subtitle class="">
                <span class="">Tasty, fresh, well-seasoned</span>
            </v-card-subtitle>
        </div>
        <v-container>
            <v-row justify="center" align="center" class="">
                <v-col cols="12" sm="6" md="4" v-for="item in data.MC" :key="item.menuCode">
                    <v-card class="menu-card  align-center d-flex flex-row ">
                        <div>
                            <v-img class="align-end text-white " aspect-ratio="1" height="170" width="170" cover :src="item.img">
                                <v-card-title></v-card-title>
                            </v-img>
                        </div>
                        <div class="  align-center pa-4">
                            <h4 class="">{{ item.menuName }}</h4>
                            <div class=" text-grey-lighten-1 text-caption">Tasty & Crispy Spare Ribs</div>
                            <h5 class="my-2">Php {{ item.menuPrice }}</h5>
                            <v-btn class="mt-1 text-subtitle-2" density="comfortable" prepend-icon="mdi-cart" color="amber"
                                variant="outlined">Add to order</v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <!-- end -->
        <!-- Seafood Dishes -->
        <div id="seafood" class=" div2nd my-5 px-5 mt-12" style=" text-align: center;">
            <div class="text-body-1 font-weight-bold d-inline bg-red-accent-4 py-1 px-3 header-red ">
                TASTY & AFFORDABLE
            </div>
            <h1 class="text-h2">Seafood Dishes</h1>
            <v-card-subtitle class="">
                <span class="">Tasty, fresh, well-seasoned</span>
            </v-card-subtitle>
        </div>
        <v-container>
            <v-row justify="center" align="center" class="">
                <v-col cols="12" sm="6" md="4" v-for="item in data.SF" :key="item.menuCode">
                    <v-card class="menu-card  align-center d-flex flex-row ">
                        <div>
                            <v-img class="align-end text-white " aspect-ratio="1" height="170" width="170" cover :src="item.img">
                                <v-card-title></v-card-title>
                            </v-img>
                        </div>
                        <div class="  align-center pa-4">
                            <h4 class="">{{ item.menuName }}</h4>
                            <div class=" text-grey-lighten-1 text-caption">Tasty & Crispy Spare Ribs</div>
                            <h5 class="my-2">Php {{ item.menuPrice }}</h5>
                            <v-btn class="mt-1 text-subtitle-2" density="comfortable" prepend-icon="mdi-cart" color="amber"
                                variant="outlined">Add to order</v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <!-- end -->
        <v-snackbar v-model="snackbar" :timeout="timeout" color="grey-darken-4">
            An item has been added to your Order.

            <template v-slot:actions>
                <router-link class="" style="text-decoration: none !important" :to="{ name: 'Order' }">
                    <v-btn density="comfortable" color="blue" variant="outlined" @click="OpenCart">
                        View Orders
                    </v-btn>
                </router-link>
            </template>
        </v-snackbar>

        <div class=" btm-fix d-flex justify-space-around py-2 bg-black">
            <div @click="navigateTo('pork')" class="fixed-icons d-flex flex-column align-center">
                <v-icon icon="mdi-pig"></v-icon>
                <small class="text-caption">Pork</small>
            </div>
            <div @click="navigateTo('chicken')" class="fixed-icons d-flex flex-column align-center">
                <v-icon icon="mdi-food-turkey"></v-icon>
                <small class="text-caption">Chicken</small>
            </div>
            <div @click="navigateTo('pasta')" class="fixed-icons d-flex flex-column align-center">
                <v-icon icon="mdi-noodles"></v-icon>
                <small class="text-caption">Pasta</small>
            </div>
            <div @click="navigateTo('vegetable')" class="fixed-icons d-flex flex-column align-center">
                <v-icon icon="mdi-leaf-circle"></v-icon>
                <small class="text-caption">Veges</small>
            </div>
            <div @click="navigateTo('dessert')" class="fixed-icons d-flex flex-column align-center">
                <v-icon icon="mdi-cake-variant"></v-icon>
                <small class="text-caption">Dessert</small>
            </div>
            <div @click="navigateTo('seafood')" class="fixed-icons d-flex flex-column align-center">
                <v-icon icon="mdi-fish"></v-icon>
                <small class="text-caption">Seafood</small>
            </div>
        </div>
    </div>

    <div class="text-center">
        <v-dialog v-model="dialog" class="pa-0" max-width="500" max-height="600">
            <v-card>
                <v-img class="align-end text-white " aspect-ratio="1" cover :src="img">
                    <v-card-title></v-card-title>
                </v-img>
                <v-card-actions>
                    <v-btn prepend-icon="mdi-close" color="primary" block @click="dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
  
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, inject } from 'vue'
// import { collection, getDocs } from "firebase/firestore";
import { ref as fireRef, child, get } from "firebase/database";
import { ref as refS, getDownloadURL } from "firebase/storage";
import { db, storage } from '@/firebase'
import 'vue-skeletor/dist/vue-skeletor.css';
import { Skeletor } from 'vue-skeletor';

const internalInstance = getCurrentInstance()
const img = ref(null);
let snackbar = ref(false);
const dialog = ref(false);
const fetching = ref(true);
const timeout = ref(10000);
const data = ref({});
const items = ref({})
const emitter = inject('emitter');
const smoothScroll = inject('smoothScroll');

function AddToCart(val) {
    
    const x = internalInstance.appContext.config.globalProperties.gVar.items[val.menuCode] = val
    this.snackbar = true
    emitter.emit('add-per-menu', val);
}
function OpenCart(){
    // emitter.emit('add-permenu-items', items);
 
    snackbar = false
}
function navigateTo(val) {
    const myEl = document.getElementById(val)
    smoothScroll({
        scrollTo: myEl,
        // duration: 500,
        // offset: -50,
    })
}
onMounted(async () => {
   
    const dbRef = fireRef(db);
    get(child(dbRef, `MenuCategory/`)).then((snapshot) => {
        data.value = snapshot.val()
        console.log(data);
        fetching.value = false
    })


    const imagesRef = refS(storage, 'img/IMG_20220420_133639.jpg');
    getDownloadURL(imagesRef)
        .then((url) => {
            img.value = url
        })
});

// function trigger(){
//     this.emitter.emit('update', 1)
// }
</script>

<style lang="scss" scoped>
.banner-img {
    background-size: cover;
    background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(https://firebasestorage.googleapis.com/v0/b/postres-c30e4.appspot.com/o/img%2FIMG_20220420_133639.jpg?alt=media&token=bc565fbc-7776-4c8d-90c4-604d758e767a);
}

.div2nd {
    padding-bottom: 0;
    margin-top: 2rem;
    margin-bottom: 2rem;

    H3 {
        display: inline;
        background-color: #ED0000;

    }

    h1 {
        margin-top: 1rem;
        margin-bottom: 1rem;

    }
}

.text-h2 {
    font-family: 'Satisfy', helvetica !important;
}

.header-red {
    font-family: 'Montserrat' !important;
    font-weight: 600;
}

.btm-fix {
    position: fixed;
    width: 100%;
    bottom: 0;

    .fixed-icons {
        color: #AAAAAA;
        transition: ease all .5s;
        cursor: pointer;
        max-width: 100px !important;

        &:hover {
            animation: shake 0.5s;
            color: white;
        }
    }
}

.menu-card {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    cursor: pointer;
    transition: all ease 0.3s;

    &:hover {
        box-shadow: rgba(121, 188, 243, 0.35) 0px 5px 15px;
    }

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
</style>