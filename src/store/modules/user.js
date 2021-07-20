import { loginByUsername, logout } from '@/api/login'
import { encryption } from '@/utils/util'
const user = {
  state: {
    user_id: ''
  },
  mutations: {
    SET_USER_ID: (state, userId) => {
      state.user_id = userId
    }
  },
  actions: {
    // 根据用户名登录
    LoginByUsername({ commit }, userInfo) {
      const user = encryption({
        data: userInfo,
        key: 'scaxscaxscaxscax',
        param: ['password']
      });
      return new Promise((resolve, reject) => {
        loginByUsername(user.username, user.password, user.code, user.randomStr).then(response => {
          const data = response.data;
          sessionStorage.setItem('user', data);
          commit('SET_USER_ID', data.user_id)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_USER_ID', '')

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default user
