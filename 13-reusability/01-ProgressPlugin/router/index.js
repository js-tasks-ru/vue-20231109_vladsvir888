import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory('/13-reusability/01-ProgressPlugin'),
  routes: [
    {
      path: '/',
      beforeEnter: () => new Promise((resolve) => setTimeout(resolve, 3000, true)),
      component: () => import('../views/PageMeetups.vue'),
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      beforeEnter: () => new Promise((resolve) => setTimeout(resolve, 3000, true)),
      component: () => import('../views/PageMeetup.vue'),
    },
    {
      path: '/error',
      beforeEnter: () => new Promise((_, reject) => setTimeout(reject, 3000, new Error())),
      component: {},
    },
  ],
});

export { router };
