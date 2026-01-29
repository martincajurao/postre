<template>
  <div class="cropper-container">
    <input type="file" accept="image/*" @change="onFileChange" />
    <div v-if="image" class="cropper-wrapper">
      <cropper
        :src="image"
        :stencil-props="{ aspectRatio: 1 }"
        :auto-zoom="true"
        @change="onCropChange"
        ref="cropper"
      />
    </div>
    <button v-if="image" @click="cropImage">Crop Image</button>
    <button v-if="croppedImage" @click="uploadImage">Upload Cropped Image</button>
    <div v-if="croppedImage" class="cropped-image-preview">
      <h3>Cropped Image Preview:</h3>
      <img :src="croppedImage" alt="Cropped Image" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { ref as strRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '@/firebase';
import { set, ref as fireRef } from "firebase/database";

const image = ref(null);
const croppedImage = ref(null);
const cropper = ref(null);

function onFileChange(event) {
  const files = event.target.files;
  if (files && files.length > 0) {
    const file = files[0];
    image.value = URL.createObjectURL(file);
    croppedImage.value = null;
  }
}

function onCropChange({ coordinates, canvas }) {
  // Optional: handle crop changes if needed
}

function cropImage() {
  if (!cropper.value) {
    console.error('Cropper ref is not set');
    return;
  }
  const canvas = cropper.value.getResult ? cropper.value.getResult() : null;
  if (canvas) {
    croppedImage.value = canvas.toDataURL('image/png');
  } else {
    console.error('Failed to get cropped canvas');
  }
}

async function uploadImage() {
  if (!croppedImage.value) {
    alert('No cropped image to upload');
    return;
  }
  try {
    // Convert base64 to blob
    const res = await fetch(croppedImage.value);
    const blob = await res.blob();

    // Create a storage reference
    const storageRef = strRef(storage, 'cropped_images/' + Date.now() + '.png');

    // Upload the blob
    await uploadBytes(storageRef, blob);

    // Get download URL
    const url = await getDownloadURL(storageRef);

    // Save URL to Firebase Database under 'croppedImages' node with timestamp key
    const dbRef = fireRef(db, 'croppedImages/' + Date.now());
    await set(dbRef, { url });

    alert('Image uploaded successfully!');
  } catch (error) {
    console.error('Upload failed:', error);
    alert('Failed to upload image.');
  }
}
</script>

<style scoped>
.cropper-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.cropper-wrapper {
  max-width: 400px;
  max-height: 400px;
  overflow: hidden;
}

.cropper-wrapper img {
  max-width: 100%;
  display: block;
}

.cropped-image-preview img {
  max-width: 200px;
  border: 1px solid #ccc;
}
</style>
