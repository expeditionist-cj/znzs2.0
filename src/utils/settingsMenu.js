const menu = [
  {
    title: '系统管理',
    children: [
      {
        iconClass: 'icon-zhanghaoguanli',
        name: '账号管理',
        path: '/settings/account',
        component: 'account'
      },
      {
        iconClass: 'icon-jigou',
        name: '组织机构',
        path: '/settings/organization',
        component: 'organization'
      },
      {
        iconClass: 'icon-jiaoseguanli',
        name: '角色权限',
        path: '/settings/role',
        component: 'role'
      }
    ]
  },
  {
    title: '模型配置',
    children: [
      {
        iconClass: 'icon-jigou',
        name: '分类管理',
        path: '/settings/account',
        component: 'account'
      },
      {
        iconClass: 'icon-jigou',
        name: '模型管理',
        path: '/settings/organization',
        component: 'organization'
      }
    ]
  },
  {
    title: '数据配置',
    children: [
      {
        iconClass: 'icon-jigou',
        name: '数据源配置',
        path: '/settings/account',
        component: 'account'
      },
      {
        iconClass: 'icon-jigou',
        name: '数据标准化',
        path: '/settings/organization',
        component: 'organization'
      },
      {
        iconClass: 'icon-jigou',
        name: '数据补录',
        path: '/settings/role',
        component: 'role'
      }
    ]
  },
  {
    title: '其他配置',
    children: [
      {
        iconClass: 'icon-jigou',
        name: '排班配置',
        path: '/settings/account',
        component: 'account'
      },
      {
        iconClass: 'icon-jigou',
        name: '主页配置',
        path: '/settings/organization',
        component: 'organization'
      },
      {
        iconClass: 'icon-jigou',
        name: '订阅配置',
        path: '/settings/role',
        component: 'role'
      }
    ]
  }
]
export default menu
