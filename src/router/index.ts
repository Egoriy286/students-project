import { createRouter, createWebHistory , type RouteRecordRaw } from 'vue-router'
//import TableView from '../views/TableView.vue'
//import MainView from '../views/MainView.vue'
import Login from '../components/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/MainView.vue'),
    meta: { requiresAuth: true }, // This route requires authentication
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import('../views/TableView.vue'),
    meta: { requiresAuth: true }, // This route requires authentication
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Защита маршрутов
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router;
