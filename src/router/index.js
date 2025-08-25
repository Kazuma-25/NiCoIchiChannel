// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import homeView from '@/components/mainPage/homeView.vue';
import threadView from '@/components/mainPage/threadView.vue';
import createThread from '@/components/mainPage/createThread.vue';
import preCheckThread from '@/components/mainPage/preCheckThread.vue';
import readView from '@/components/mainPage/readView.vue';
import reportView from '@/components/mainPage/reportView.vue';

const routes = [
  { path: '/', component: homeView },
  { path: '/thread/:cat/:pg', component: threadView },
  { path: '/create', component:createThread },
  { path: '/preCheckThread', component:preCheckThread, props:true },
  { path: '/read/:threadId', component:readView },
  { path: '/administratorReportView', component:reportView }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;