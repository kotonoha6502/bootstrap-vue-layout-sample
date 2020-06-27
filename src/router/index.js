import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'

Vue.use(VueRouter)

<<<<<<< HEAD
const routes = [
=======
  const routes = [
>>>>>>> 73e6c92e109b1f5d0015e5e8bdfb53a167bab26e
  {
    path: '/',
    component: MainLayout,
    children: [
<<<<<<< HEAD
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
=======
        {
            path: '/',
            component: () => import('../pages/Home.vue')
        },
        {
            path: '/about',
            component: () => import('../pages/About.vue')
        }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
>>>>>>> 73e6c92e109b1f5d0015e5e8bdfb53a167bab26e
  routes
})

export default router
