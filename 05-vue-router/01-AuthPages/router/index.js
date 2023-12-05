import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory('/05-vue-router/01-AuthPages'),
  routes: [
    {
      path: '/',
      component: () => import('../views/PageIndex.vue'),
      name: 'index',
    },
    {
      path: '/login',
      component: () => import('../views/PageLogin.vue'),
      name: 'login',
    },
    {
      path: '/register',
      component: () => import('../views/PageRegister.vue'),
      name: 'register',
    },
  ],
});
