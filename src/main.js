/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import mitt from 'mitt'
// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
const emitter = mitt()
const app = createApp(App)

registerPlugins(app)
// app.config.globalProperties.emitter = emitter
app.provide('emitter', emitter); 
app.config.globalProperties.gVar = {
    home:0,
    menu:"",
    offer:"",
    location:"",
    about:"",
    items:{},
    selectedItems:[],
    combo:{},
}
app.mount('#app')
