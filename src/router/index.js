import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/',
        component: () => import('../pages/Home.vue')
      },
      {
        path: '/about',
        component: () => import('../pages/About.vue')
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
