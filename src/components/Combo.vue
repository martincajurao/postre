<template lang="">
        <v-container>
        <v-row class="d-flex align-center">
          <v-col cols="12" sm="6" md="4" v-for="item in data">
            <v-card :loading="loading" class="mx-auto my-2" >
              <template v-slot:loader="{ isActive }">
                <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
              </template>

              <v-img cover height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
              <v-card-subtitle>
                <span class="me-1">Best Seller</span>
                <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
              </v-card-subtitle>
              <v-card-item>
                <h3 class="text-h4" style="font-family: Satisfy !important;">{{ item.desc }}</h3>
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
                <v-btn  prepend-icon="mdi-cart" class=" w-100" color="amber" variant="outlined" @click="AddCombo(item)">
                  Reserve
                </v-btn>
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
    const x = internalInstance.appContext.config.globalProperties.gVar.combo[val.name] = val
    var Count  = Object.keys(x.members).length;
    emitter.emit('add-combo', val);
    emitter.emit('add-per-menu', 1);
}
</script>
<style lang="">
    
</style>