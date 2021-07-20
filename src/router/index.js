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
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
      },
      {
        path: '/application',
        name: 'application',
        component: () => import(/* webpackChunkName: "application" */ '@/views/application/index.vue')
      },
      {
        path: '/datas',
        name: 'datas',
        component: () => import(/* webpackChunkName: "datas" */ '@/views/datas/index.vue')
      },
      {
        path: '/appStore',
        name: 'appStore',
        component: () => import(/* webpackChunkName: "appStore" */ '@/views/appStore/index.vue')
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import(/* webpackChunkName: "settings" */ '@/views/settings/index.vue'),
        children: [
          {
            path: '/settings/account',
            name: 'account',
            component: () => import(/* webpackChunkName: "account" */ '@/views/settings/components/account.vue')
          },
          {
            path: '/settings/organization',
            name: 'organization',
            component: () => import(/* webpackChunkName: "organization" */ '@/views/settings/components/organization.vue')
          },
          {
            path: '/settings/role',
            name: 'role',
            component: () => import(/* webpackChunkName: "role" */ '@/views/settings/components/role.vue')
          }
        ]
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
