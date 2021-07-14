import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../layout/index.vue'

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home/index.vue')
      },
      {
        path: '/application',
        name: 'application',
        component: () => import(/* webpackChunkName: "application" */ '../views/application/index.vue')
      },
      {
        path: '/datas',
        name: 'datas',
        component: () => import(/* webpackChunkName: "datas" */ '../views/datas/index.vue')
      },
      {
        path: '/appStore',
        name: 'appStore',
        component: () => import(/* webpackChunkName: "appStore" */ '../views/appStore/index.vue')
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import(/* webpackChunkName: "settings" */ '../views/settings/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
