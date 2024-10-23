import { createRouter, createWebHistory , type RouteRecordRaw } from 'vue-router'
import TableView from '../views/TableView.vue'
import MainView from '../views/MainView.vue'
import TestView from '../views/TestView.vue'
import Students from '../views/StudentsView.vue'
import Login from '../components/Login.vue'
import type { RouteMeta } from '../types'; // Import your RouteMeta type
 // Import your RouteMeta type

/*
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/table',
      name: 'TableView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: TableView,
      //props: true,
      meta: { requiresAuth: true }, //
    },
    {
      path: '/students',
      name: 'students',
      component: Students,
    },
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/test',
      name: 'test',
      component: TestView
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/:catchAll(.*)', // Catch-all route for 404 page
      redirect: '/', // Redirect to home or show a NotFound component
    }
  ],
  
})
// Navigation guard
router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' }); // Redirect to login if not authenticated
  } else {
    next(); // Proceed to the route
  }
});
*/


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: MainView,
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
    component: TableView,
    meta: { requiresAuth: true }, // This route requires authentication
  },
  {
    path: '/test',
    name: 'Test',
    component: TestView,
    meta: { requiresAuth: true }, // This route requires authentication
  },
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
