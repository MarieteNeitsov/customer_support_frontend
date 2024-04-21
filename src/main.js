import { createApp } from 'vue'
import MainView from './components/MainView.vue'
import router from './router'

createApp(MainView).use(router).mount('#app')
