<template lang="">
        <v-container>
        <v-row class="d-flex align-center">
          <v-col cols="12" sm="6" md="4" v-for="item in data" style="position:relative">

            <v-img class="best-seller" src="@/assets/best-seller.png" width="150" cover ></v-img>

            <v-card :loading="loading" class="mx-auto my-2" style="position:relative;" >
              <template v-slot:loader="{ isActive }">
                <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
              </template>

              <v-img  cover height="250" src="https://firebasestorage.googleapis.com/v0/b/postres-c30e4.appspot.com/o/img%2FIMG_20220731_133032.jpg?alt=media&token=5487cfb0-8282-45a1-89fc-5e1ef95d8f28">
             <div class="d-flex justify-end align-end h-100">
              <h4 class="text-h5 font-weight-bold bg-red-accent-4 px-4 py-2">{{item.name}}</h4>
             </div>
              </v-img>
              <v-card-item>
                <h3 >{{ item.desc }}</h3>
                <v-chip class="mt-1" size="small" color="green-accent-4">Save &#8369;{{item.disc}}
                </v-chip>
              </v-card-item>
              <v-card-text>
                <div class=" text-grey-lighten-1">
                  <h4 class="text-body-2 "> Package Inclusion:</h4>
                  <div class=" d-flex flex-wrap justify-start">
                    <div class="text-body-2 mr-1 mt-2" v-for="member in item.members">
                      <v-tooltip >
                        <div class="mt-2">
                          <img  height="150" cover :src="member.img" alt="">
                        </div>
                        <template v-slot:activator="{ props }">
                          <v-chip   color="" v-bind="props"  size="small"> {{ member.menuName }}</v-chip>
                        </template>
                      </v-tooltip>
                    </div>
                  </div>
                </div>
              </v-card-text>
              <v-divider class="mx-4 mb-1"></v-divider>
              <v-card-actions class="px-4 pb-4 pt-3">
                <v-btn  prepend-icon="mdi-cart" class=" px-3"  color="#DF2C00" variant="flat" @click="AddCombo(item)">
                  Reserve
                </v-btn>
                <v-spacer></v-spacer>
                <h3 class="text-h4"> &#8369;{{item.price.toLocaleString()}}</h3>
              </v-card-actions>
            </v-card>
          </v-col>

        </v-row>
      </v-container>
</template>
<script setup>
import { ref, getCurrentInstance, onMounted, inject } from 'vue'

const emitter = inject('emitter');
const internalInstance = getCurrentInstance()
const props = defineProps({
    data: {
        type: Object,
        default: {}
    }
})

function AddCombo(val) {
    // const x = internalInstance.appContext.config.globalProperties.gVar.combo[val.name] = val
    // var Count  = Object.keys(x.members).length;
    internalInstance.appContext.config.globalProperties.gVar.combo[val.name] = val
    emitter.emit('add-combo', val);
    emitter.emit('add-per-menu', 1);
}
</script>
<style lang="scss">
    .best-seller{
      position: absolute !important;
      top: .6rem;
      left: 2px;
      z-index: 2 !important;
    }
</style>