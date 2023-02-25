<template lang="">
    <v-divider></v-divider>
    <div class="d-flex align-center py-4 ">
            <div class="ma-0 pa-0 ">
                <v-checkbox density="comfortable" label="" class="text-body-2 d-inline-flex"></v-checkbox>
            </div>
            <div class="mr-1">
                <v-img class="align-end text-white " aspect-ratio="1" height="90" width="90" cover
                    :src="data.img">
                    <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                        </div>
                    </template>
                </v-img>
            </div>
            <div class=" mx-3  w-100">
                <h4 class="text-grey">{{data.menuName}}</h4>
                <div class="text-grey text-caption py-"> {{data.menuDesc}}</div>
                <div v-if="data.disc" class="text-caption text-green-accent-3">Discounted</div>
                <div class="d-flex align-center">
                    <div class="font-weight-bold text-body-2 me-auto"><span>&#8369;</span> {{data.menuPrice}}</div>
                    <div class=" d-flex">
                        <v-btn size="small" class="text-caption" density="compact" icon="mdi-minus"></v-btn>
                        <input disabled class="text-center text-body-2 " value="1" style="width: 20px;" />
                        <v-btn size="small" density="compact" icon="mdi-plus"></v-btn>
                    </div>
                </div>
            </div>
        </div>
</template>
<script setup>

const props = defineProps({
    data: {
        type: Object,
        default:{}
    }
})

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