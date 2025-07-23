// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import homeView from '../components/mainPage/homeView.vue';
import threadView from '../components/mainPage/threadView.vue';

const routes = [
  { path: '/', component: homeView },
  { path: '/thread/:cat/:pg', component: threadView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;