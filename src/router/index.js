import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from "firebase/auth";

const routes = [
  {
    path: '/login',
    meta: { layout: 'empty', title: 'Авторизация' },
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty', title: 'Регистрация' },
    component: () => import('../views/RegisterView.vue'),
  },
  {
    path: '/',
    name: 'home',
    meta: { layout: 'main', auth: true, title: 'Главная' },
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/categories',
    meta: { layout: 'main', auth: true, title: 'Категории' },
    name: 'categories',
    component: () => import('../views/CategoriesView.vue'),
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: { layout: 'main', auth: true, title: 'Детальная информация о записи' },
    component: () => import('../views/DetailView.vue'),
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'main', auth: true, title: 'История' },
    component: () => import('../views/HistoryView.vue'),
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layout: 'main', auth: true, title: 'Планирование' },
    component: () => import('../views/PlanningView.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'main', auth: true, title: 'Профиль' },
    component: () => import('../views/ProfileView.vue'),
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: 'main', auth: true, title: 'Создать запись' },
    component: () => import('../views/RecordView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Домашняя бухгалтерия`
  const currentUser = getAuth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)
  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})
export default router;
