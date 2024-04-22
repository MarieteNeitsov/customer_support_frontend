import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../Views/MainView.vue';
import AddRequestView from '@/Views/AddRequestView.vue';

const routes = [
  {
    path: '/',
    name: 'MainView',
    component: MainView
  },
  {
    path: "/addrequest",
    name: "AddRequest",
    component: AddRequestView,
},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router