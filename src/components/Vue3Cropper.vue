<template>
  <div class="vue3-cropper-container">
    <vue-cropper
      ref="cropperRef"
      v-if="image"
      :src="image"
      :aspect-ratio="aspectRatio"
      :auto-crop="true"
      :view-mode="1"
      :background="false"
      :responsive="true"
      :check-orientation="true"
      :zoomable="true"
      :scalable="true"
      :rotatable="true"
      style="width: 100%; max-width: 600px; height: 450px;"
    />
    <div v-if="image" class="controls">
      <button @click="zoomIn">Zoom In</button>
      <button @click="zoomOut">Zoom Out</button>
      <button @click="rotateLeft">Rotate Left</button>
      <button @click="rotateRight">Rotate Right</button>
      <button @click="reset">Reset</button>
      <button @click="cropImage">Crop Image</button>
    </div>
    <div v-if="croppedImage" class="cropped-image-preview">
      <h3>Cropped Image Preview:</h3>
      <img :src="croppedImage" alt="Cropped Image" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import VueCropper from 'vue3-cropper';
import 'cropperjs/dist/cropper.css';

const props = defineProps({
  image: {
    type: String,
    required: true
  },
  aspectRatio: {
    type: Number,
    default: 1.375 // 1584 / 1152 approx
  }
});

const emit = defineEmits(['crop-complete']);

const cropperRef = ref(null);
const croppedImage = ref(null);

function cropImage() {
  if (!cropperRef.value) {
    console.error('Cropper ref is not set');
    return;
  }
  const cropperInstance = cropperRef.value.cropper || cropperRef.value;
  if (!cropperInstance.getCroppedCanvas) {
    console.error('Cropper instance does not have getCroppedCanvas method');
    return;
  }
  const canvas = cropperInstance.getCroppedCanvas();
  if (canvas) {
    croppedImage.value = canvas.toDataURL('image/png');
    emit('crop-complete', croppedImage.value);
  } else {
    console.error('Failed to get cropped canvas');
  }
}

function zoomIn() {
  if (cropperRef.value) {
    cropperRef.value.zoom(0.1);
  }
}

function zoomOut() {
  if (cropperRef.value) {
    cropperRef.value.zoom(-0.1);
  }
}

function rotateLeft() {
  if (cropperRef.value) {
    cropperRef.value.rotate(-45);
  }
}

function rotateRight() {
  if (cropperRef.value) {
    cropperRef.value.rotate(45);
  }
}

function reset() {
  if (cropperRef.value) {
    cropperRef.value.reset();
  }
}
</script>

<style scoped>
.vue3-cropper-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.cropped-image-preview img {
  max-width: 300px;
  border: 1px solid #ccc;
}
</style>
