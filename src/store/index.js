import { createApp } from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import settings from './modules/settings'
import application from './modules/application'
import vuejsStorage from 'vuejs-storage';
const app = createApp({})
app.use(Vuex)
app.use(vuejsStorage)
app.mount('#app')
const store = new Vuex.Store({
  modules: {
    user,
    settings,
    application
  },
  plugins: [
    vuejsStorage({
      keys: [
        'user.plantName',
        'user.plantCode',
        'user.user_id',
        'user.access_token',
        'application.navbarList',
        'application.routeParams',
        'application.activeBar',
        'application.query'
      ],
      // keep state.count in localStorage
      namespace: 'session',
      driver: vuejsStorage.drivers.sessionStorage
      // if you want to use sessionStorage instead of localStorage
    })
  ]
})

export default store
