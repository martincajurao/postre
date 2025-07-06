<template lang="">
    <v-divider></v-divider>
    <div class="d-flex align-center py-2 ">
            <div class="ma-0 pa-0 ">
                <!-- <v-checkbox @click="Select(data.menuCode)" v-model="props.selecteditems.MenuCode" :value="data.menuCode" density="comfortable" label="" class="text-body-2 d-inline-flex"></v-checkbox> -->
            </div>
            <div class="mr-1">
                <v-img class="align-end text-white " aspect-ratio="1" height="70" width="70" cover
                    :src="data.img">
                    <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                        </div>
                    </template>
                </v-img>
            </div>
            <div class=" mx-3  w-100">
                <div class="d-flex justify-space-between">
                    <div>
                        <h4 class="text-grey">{{data.menuName}}</h4>
                        <div class="text-grey text-caption py-"> {{data.menuDesc}}</div>
                    </div>
                    <div>
                        <v-btn v-if="isCombo" @click="data.combo = selectedCombo.name; data.selectedkey = selectedkey; emitter.emit('change-menu', data)" density="comfortable" variant="text" size="small" icon="mdi-swap-horizontal"></v-btn>
                        <v-btn v-if="!isCombo" @click="RemoveItem(data.menuCode); emitter.emit('remove', 1)" density="comfortable" variant="text" size="small" icon="mdi-delete-empty"></v-btn>
                    </div>
                </div>
                <div class="d-flex align-center">
                    <div class="font-weight-bold text-body-2 me-auto"><span>&#8369;</span> {{Number(data.menuPrice).toLocaleString()}}</div>
                    <div class=" d-flex" v-if="!isCombo">
                        <v-btn v-if="data.buyQty > 1" @click="removeQty(data);  " size="small" class="text-caption" density="compact" icon="mdi-minus"></v-btn>
                        <v-btn v-else @click="removeQty(data)" disabled size="small" class="text-caption" density="compact" icon="mdi-minus"></v-btn>
                        <input disabled class="text-center text-body-1 " :value="data.buyQty" style="width: 20px;" />
                        <v-btn @click="emitter.emit('add-qty', data);" size="small" density="compact" icon="mdi-plus"></v-btn>
                    </div>
                </div>
            </div>
        </div>
</template>
<script setup>
import { inject, onMounted, ref } from 'vue'

const emitter = inject('emitter');
const selected = ref([]);
const props = defineProps({
    data: {
        type: Object,
        default: {}
    },
    selecteditems: {
        type: Object,
        default: []
    },
    selectedCombo: {
        type: Object,
        default: {}
    },
    isCombo: {
        type: Boolean,
        default: false
    },
    selectedkey: {
        type: String,
        default: ''
    }
})

onMounted(() => {
 
})

// function Select(val) {
//     emitter.emit('check-item', val);
// }
function RemoveItem(val){
    emitter.emit('remove-item', val);
}

function removeQty(val){
    emitter.emit('remove-qty', val);
}


</script>
<style lang="scss" scoped>
table,
tr,
td,
h4,
h3 {
    font-family: 'Roboto' !important;
}

.checkout {
    height: 3rem;


}

table {
    border-collapse: separate;
    border-spacing: 0 1em;
}
</style>