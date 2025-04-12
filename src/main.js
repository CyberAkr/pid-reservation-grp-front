// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// Configuration globale d'Axios
axios.defaults.baseURL = 'http://localhost:8081'; // Remplacez par l'URL de votre API si nécessaire

const app = createApp(App)

// Ajout du router à l'application
app.use(router)

// Montage de l'application sur l'élément avec l'ID 'app'
app.mount('#app')