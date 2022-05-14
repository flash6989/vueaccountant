import { createStore } from 'vuex';
import auth from '@/store/auth';
import info from '@/store/info';


export default createStore({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    } 
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth,
    info,
  },
});
