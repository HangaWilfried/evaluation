import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'
import { GOOGLE_CLIENT_ID } from './utils/constants'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vue3GoogleLogin, {
  clientId: GOOGLE_CLIENT_ID
})

app.mount('#app')
