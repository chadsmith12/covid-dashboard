import Vue from 'vue'
import Vuex from 'vuex'
import CovidDashboardState from './CovidDashboardState'

Vue.use(Vuex)

export default new Vuex.Store<CovidDashboardState>({
  state: {
    isDarkMode: false
  },
  mutations: {
    SET_DARK_MODE(state, { isDarkMode }) {
      state.isDarkMode = isDarkMode;
    }
  },
  actions: {
  },
  modules: {
  }
})
