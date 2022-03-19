import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

 
export default new Vuex.Store({
  state: {
    sidebarShow: 'responsive',
    sidebarMinimize: false,
    loading: false,
    error: false,
    errors: {},
    sidebar:false
  },
  mutations: {

    toggleSidebarDesktop (state) {
      state.sidebar = !state.sidebar;
    },
    toggleSidebarMobile (state) {
      state.sidebar = !state.sidebar;
    },
    set (state, [variable, value]) {
      state.sidebar = true;
    },
    
    loading(state, value){
      state.loading = value;
    },

    error(state, value){
      state.error= value;
    },
    errors(state, value){
      state.errors= value;
    },
    closeErrors(state, value) {
      state.error = false;
      state.errors = {};
    }
  },
  actions: {
    
  },
  modules: {
   
  }
})

