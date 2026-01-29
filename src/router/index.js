// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/menu',
        name: 'Menu',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Menu.vue'),
      },
      {
        path: '/order',
        name: 'Order',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Order.vue'),
      },
      {
        path: '/confirm',
        name: 'Confirm',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Confirm.vue'),
      },
      {
        path: '/admin',
        name: 'Admin',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Admin.vue'),
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Dashboard.vue'),
      },
     
    
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
