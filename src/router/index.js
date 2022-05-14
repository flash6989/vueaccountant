import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { layout: 'main' },
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/login',
    meta: { layout: 'empty' },
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('../views/RegisterView.vue'),
  },
  {
    path: '/categories',
    meta: { layout: 'main' },
    name: 'categories',
    component: () => import('../views/CategoriesView.vue'),
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: { layout: 'main' },
    component: () => import('../views/DetailView.vue'),
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'main' },
    component: () => import('../views/HistoryView.vue'),
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layout: 'main' },
    component: () => import('../views/PlanningView.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'main' },
    component: () => import('../views/ProfileView.vue'),
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: 'main' },
    component: () => import('../views/RecordView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
