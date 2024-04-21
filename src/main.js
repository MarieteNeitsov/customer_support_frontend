import { createApp } from 'vue'
import MainView from './Views/MainView.vue';
import router from './router'

createApp(MainView).use(router).mount('#app')
