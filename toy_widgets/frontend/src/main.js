import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

// const pinia = createPinia()
// app.use(pinia)
app.use(createPinia())
app.mount('#app')

// export const colorPalette = {
//   'Sakura Pink': '#FFC0CB',
//   'Jade Green': '#00A86B',
//   'Lavender Mist': '#E6E6FA',
//   'Buttercream Yellow': '#FFFACD',
//   'Sky Blue': '#87CEEB',
//   'Peach Blossom': '#FFDAB9',
//   White: '#FFFFFF'
// }
