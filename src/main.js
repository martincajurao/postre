/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import 'cropperjs/dist/cropper.css';



import mitt from 'mitt'
// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import { createPinia } from 'pinia' // Import createPinia

const emitter = mitt()
const app = createApp(App)
const pinia = createPinia() // Create a Pinia instance

registerPlugins(app)
// app.config.globalProperties.emitter = emitter
app.provide('emitter', emitter); 
app.use(pinia) // Use Pinia with the app

// app.config.globalProperties.gVar = { // Removed gVar
//     home:0,
//     menu:"",
//     offer:"",
//     location:"",
//     about:"",
//     items:{},
//     selectedItems:[],
//     combo:{},
//     orders:{},
// }
app.mount('#app')
