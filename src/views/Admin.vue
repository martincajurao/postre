<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer">
            <div class="d-flex flex-column pa-4">
                <h1>Postre</h1>
                <v-divider class="my-4"></v-divider>
                <v-btn @click="comboDialog = true" size="small" color="success" variant="flat"
                    prepend-icon="mdi-plus">Create
                    Combo</v-btn>
            </div>
            <!--  -->
        </v-navigation-drawer>

        <v-app-bar>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>Application Settings</v-toolbar-title>

        </v-app-bar>

        <v-main>
            <v-container>
                <v-row>
                    <v-col cols="6">
                        <v-divider></v-divider>
                        <div class="d-flex align-center py-4 " v-for="item in data" :key="item.menuCode">
                            <div class="ma-0 pa-0 ">
                                <v-checkbox density="comfortable" label="" class="text-body-2 d-inline-flex"></v-checkbox>
                            </div>
                            <div class="mr-1">
                                <v-img class="align-end text-white " aspect-ratio="1" height="90" width="90" cover
                                    :src="item.img">
                                    <template v-slot:placeholder>
                                        <div class="d-flex align-center justify-center fill-height">
                                            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                        </div>
                                    </template>
                                </v-img>
                            </div>
                            <div class=" mx-3  w-100">
                                <h4 class="text-grey">{{ item.menuName }}</h4>
                                <div class="text-grey text-caption py-"> Lorem ipsum dolor sit.</div>
                                <div v-if="item.disc" class="text-caption text-green-accent-3">Discounted</div>
                                <div class="d-flex align-center">
                                    <div class="font-weight-bold text-body-2 me-auto"><span>&#8369;</span> {{ item.menuPrice
                                    }}
                                    </div>
                                    <v-btn @click="edit(item)" size="small" class="mr-1"><v-icon>mdi-pencil</v-icon></v-btn>
                                    <v-btn @click="remove(item)" size="small"><v-icon>mdi-delete-empty</v-icon></v-btn>
                                </div>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <v-card class="mx-auto mt-5 pa-4" max-width="344" title="Update Menu">
                            <div class="d-flex">
                                <div class="pa-1 w-50">
                                    <v-img :src="url" cover></v-img>
                                </div>
                                <v-file-input show-size="" accept="image/*" @change="Preview_image" v-model="image"
                                    density="comfortable" label="File input" prepend-icon="mdi-camera"></v-file-input>
                            </div>
                            <v-text-field v-model="menu.menuCategory"></v-text-field>
                            <v-text-field clearable="" v-model="menu.menuName" color="primary" label="Menu Name"
                                variant="underlined"></v-text-field>
                            <v-text-field clearable="" v-model="menu.menuDesc" color="primary" label="Menu Description"
                                variant="underlined"></v-text-field>
                            <v-text-field clearable="" v-model="menu.menuPrice" color="primary" label="Price"
                                variant="underlined"></v-text-field>
                            <v-switch color="green" v-model="menu.isHot" label="Hot Menu"></v-switch>
                            <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn @click="updateMenu(item)" color="success">
                                    Update Menu
                                    <v-icon icon="mdi-chevron-right" end></v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>

        </v-main>
    </v-app>
    <v-dialog v-model="dialog" :scrim="false" persistent width="auto">
        <v-card color="grey-accent-4">
            <v-card-text>
                Updating file...
                <v-progress-linear indeterminate color="blue" class="mb-0"></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>

    <v-dialog v-model="comboDialog" fullscreen :scrim="false" transition="dialog-bottom-transition">

        <v-card>
            <v-toolbar dark color="success">
                <v-btn icon dark @click="comboDialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Create combo package</v-toolbar-title>
                <v-spacer></v-spacer>

            </v-toolbar>

            <v-divider></v-divider>
            <v-row class="pa-4 ">
                <v-col cols="6" class="h-50">
                    <h2>Select Items</h2>
                    <div v-for="item in data">
                        <div class="d-flex flex-wrap justify-space-between ma-2">
                            <v-divider class="mb-2"></v-divider>
                            <div class="w-50">{{ item.menuName }}</div>
                            <v-btn @click="Addtocombo(item)" density="comfortable" color="green" prepend-icon="mdi-plus"
                                size="small">Add</v-btn>
                        </div>
                    </div>
                </v-col>
                <v-col cols="6">
                    <v-text-field v-model="combo.name" class="mr-" label="Name" density="compact"
                        variant="outlined"></v-text-field>
                    <v-text-field v-model="combo.desc" class="mr-" label="Description" density="compact"
                        variant="outlined"></v-text-field>
                    <v-text-field v-model="combo.disc" class="mr-" label="Discount" density="compact"
                        variant="outlined"></v-text-field>
                    <v-text-field v-model="combo.price" class="mr-" label="Price" density="compact"
                        variant="outlined"></v-text-field>
                    <h3>Includes:</h3>
                    <div v-for="item in combo.members">
                        {{ item.menuName }}
                    </div>
                    <v-btn @click="Savecombo()" :loading="loader" class="mt-5" prepend-icon="mdi-upload"
                        color="blue">Save</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { ref as fireRef, getDatabase, child, get, set, query, orderByChild, orderByValue, limitToFirst } from "firebase/database";
import { ref as strRef, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from '@/firebase'
import UUID from "vue3-uuid";
import { uuidv4 } from '@firebase/util';

const data = ref({});
const menu = ref({
    menuDesc: "lorem epsum",
    menuStatus: 'Active',
    isHot: false,
    menuCategory: null,
    menuDisc: 250,
    menuCode: null,
    img: 'https://firebasestorage.googleapis.com/v0/b/postres-c30e4.appspot.com/o/img%2FIMG_20220420_133639.jpg?alt=media&token=bc565fbc-7776-4c8d-90c4-604d758e767a',
});
const drawer = ref(null)
var dialog = ref(false)
var comboDialog = ref(false)
var image = ref(null)
var url = ref(null)
let loader = ref(false)
const combo = ref({
    name: 'C1',
    desc: 'Comida Combo #1',
    disc: 800,
    price: 2300,
    members: {}
})
const dbRef = fireRef(db);


onMounted(async () => {


    getdata()
});
function getdata() {

    const que = query(fireRef(db, 'Menu'), orderByChild('menuName'));

    get(que).then((snapshot) => {
        const sorted = {}
        snapshot.forEach(function (child) {
            sorted[child.val().menuCode] = child.val()
        });
        // data.value = snapshot.val()
        data.value = sorted
        console.log("RESULT", sorted);
    })
}

function Preview_image(e) {
    const file = e.target.files[0];
    url = URL.createObjectURL(e.target.files[0]);
    image = file

}
function edit(val) {
    this.menu = {
        menuName: val.menuName,
        menuCode: val.menuCode,
        menuPrice: val.menuPrice,
        menuDesc: val.menuDesc,
        img: val.img,
        isHot: val.isHot,
        menuCategory: val.menuCategory,
        buyQty: 1,


    }
}
function remove(val) {
    this.menu.menuCode = val.menuCode
    set(fireRef(db, 'Menu/' + val.menuCode), null);
    set(fireRef(db, 'MenuCategory/' + val.menuCategory + '/' + this.menu.menuCode), null);
    console.log(this.menu.menuCode)
    getdata()
}
function Addtocombo(val) {
    this.combo.members[val.menuCode] = val
}
function Savecombo() {
    this.loader = true
    set(fireRef(db, 'Combo/' + combo.value.name), combo.value).then(() => {
        this.loader = false
    })
}
function updateMenu(val) {
    this.dialog = true
    // this.menu.menuCode = uuidv4()
    const db = getDatabase();
    set(fireRef(db, 'MenuCategory/' + this.menu.menuCategory + '/' + this.menu.menuCode), this.menu);
    set(fireRef(db, 'Menu/' + this.menu.menuCode), this.menu);
    // if (this.image != null) {
    //     const storageRef = strRef(storage, 'img/' + this.image.name);
    //     uploadBytes(storageRef, this.image).then((snapshot) => {
    //         console.log('Uploaded an Image file', snapshot);
    //         getDownloadURL(storageRef)
    //             .then((url) => {
    //                 this.menu.img = url
    //                 set(fireRef(db, 'MenuCategory/' + this.menu.menuCategory + '/' + this.menu.menuCode), this.menu);
    //                 set(fireRef(db, 'Menu/' + this.menu.menuCode), this.menu);
    //                 this.dialog = false
    //                 getdata()
    //             })
    //     });
    //     return
    // }

    set(fireRef(db, 'MenuCategory/' + this.menu.menuCategory + '/' + this.menu.menuCode), this.menu);
    set(fireRef(db, 'Menu/' + this.menu.menuCode), this.menu).then(() => {
        this.dialog = false
        getdata()

    });


}
</script>