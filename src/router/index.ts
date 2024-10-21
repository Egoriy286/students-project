import { createRouter, createWebHistory } from 'vue-router'
import TableView from '../views/TableView.vue'
import MainView from '../views/MainView.vue'
import TestView from '../views/TestView.vue'
import Students from '@/views/StudentsView.vue'
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
    }
  ],
  
})

export default router
