import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js' // Import bootstrap JS without assigning it
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)

// Register plugins individually
app.use(router)

app.use(Toast)
app.mount('#app')