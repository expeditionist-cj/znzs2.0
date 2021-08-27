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
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue')
      },
      {
        path: '/application',
        name: 'application',
        component: () => import(/* webpackChunkName: "application" */ '@/views/application/index.vue'),
        children: [
          {
            path: '/application/applicationHome',
            name: 'applicationHome',
            component: () => import(/* webpackChunkName: "applicationHome" */ '@/views/application/components/applicationHome.vue')
          },
          {
            path: '/application/particulars/:id',
            name: 'particulars',
            component: () => import(/* webpackChunkName: "particulars" */ '@/views/application/components/particulars.vue')
          }
        ]
      },
      {
        path: '/datas',
        name: 'datas',
        component: () => import(/* webpackChunkName: "datas" */ '@/views/datas/index.vue'),
        children: [
          {
            path: '/datas/home',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ '@/views/datas/components/datasHome.vue')
          },
          {
            path: '/datas/monitoring',
            name: 'monitoring',
            component: () => import(/* webpackChunkName: "monitoring" */ '@/views/datas/components/monitoring.vue')
          },
          {
            path: '/datas/dataBinding',
            name: 'dataBinding',
            component: () => import(/* webpackChunkName: "dataBinding" */ '@/views/datas/components/dataBinding.vue')
          },
          {
            path: '/datas/dataSourceConfiguration',
            name: 'dataSourceConfiguration',
            component: () => import(/* webpackChunkName: "dataSourceConfiguration" */ '@/views/datas/components/dataSourceConfiguration.vue')
          },
          {
            path: '/datas/dataStandardization',
            name: 'dataStandardization',
            component: () => import(/* webpackChunkName: "dataStandardization" */ '@/views/datas/components/dataStandardization.vue')
          },
          {
            path: '/datas/dataSupplement',
            name: 'dataSupplement',
            component: () => import(/* webpackChunkName: "dataSupplement" */ '@/views/datas/components/dataSupplement.vue')
          }
        ]
      },
      {
        path: '/appStore',
        name: 'appStore',
        component: () => import(/* webpackChunkName: "appStore" */ '@/views/appStore/index.vue'),
        children: [
          {
            path: '/appStore/appHome',
            name: 'appHome',
            component: () => import(/* webpackChunkName: "appHome" */ '@/views/appStore/components/appHome.vue')
          },
          {
            path: '/appStore/appDetails',
            name: 'appDetails',
            component: () => import(/* webpackChunkName: "appDetails" */ '@/views/appStore/components/appDetails.vue')
          }
        ]
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
// 路由拦截
router.beforeEach((to, from, next) => {
  const token = JSON.parse(window.sessionStorage.getItem('session')).user['access_token']
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})
export default router
