import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function loadStorageUser () {
  return JSON.parse(mpvue.getStorageSync('user') || '{}')
}
// 默认头像
// const defaultAvatar = 'http://47.112.192.52/static/img/icons/4.png'
const defaultAvatar = '/static/images/user.png'

export default new Vuex.Store({
  state: {
    user: loadStorageUser()
  },
  getters: {
    avatar (state) {
      return state.user.avatar || defaultAvatar
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    setUser ({ state, commit }, user) {
      // 异步保存到本地
      mpvue.setStorageSync('user', JSON.stringify(user))
      commit('setUser', user)
    }
  }
})
