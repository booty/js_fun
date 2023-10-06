import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.mount('#app')

// This does not seem ideal. Ideally, the store would know how to initialize itself.
import { useUserPreferencesStore } from './stores/UserPreferences'
const userPreferencesStore = useUserPreferencesStore()
userPreferencesStore.initPolling()
