import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
//@ts-ignore
import { piniaYjsPlugin } from '@/libs/collaborative/dist/collaborative.js'

// top level or first sub level
if (window.self === window.top || window.self.parent === window.top) {
  // in iframe
  const app = createApp(App)
  const store = createPinia()
  store.use(piniaYjsPlugin)
  app.use(store)
  app.mount('#app')
}
