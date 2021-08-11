const application = {
  state: {
    navbarList: [{
      title: '首页',
      path: '/'
    }],
    activeBar: '/',
    routeParams: {}
  },
  mutations: {
    PUSH_NAVBARLIST(state, listItem) {
      const list = JSON.parse(JSON.stringify(state.navbarList))
      list.push(listItem)
      // 去重
      const arr = [...new Set(list.map(val => JSON.stringify(val)))].map(val => JSON.parse(val))
      state.navbarList = arr
      state.activeBar = listItem.path
    },
    SET_NAVEBARLIST(state, navbarList) {
      state.navbarList = navbarList
    },
    SET_ACTIVEBAR(state, activeBar) {
      state.activeBar = activeBar
    },
    SET_ROUTEPARAMS(state, params) {
      state.routeParams = params || {}
    },
    REMOVE_NAVBARLIST(state, path) {
      const list = JSON.parse(JSON.stringify(state.navbarList))
      let active = state.activeBar
      list.forEach((ele, index) => {
        if (ele.path === path) {
          const nextActive = list[index + 1] || list[index - 1]
          if (nextActive) {
            active = nextActive.path
          }
        }
      });
      state.activeBar = active
      state.navbarList = list.filter(tab => tab.path !== path)
    }
  }
}
export default application
