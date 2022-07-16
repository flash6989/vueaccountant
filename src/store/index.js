import { createStore } from 'vuex';
import auth from '@/store/auth';
import info from '@/store/info';
import category from '@/store/category';
import record from '@/store/record';

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
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER
      let myHeaders = new Headers();
      myHeaders.append("apikey", key);
      let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      };
      const res = await fetch("https://api.apilayer.com/fixer/latest?symbols=RUB%2CEUR%2CUSD&base=USD", requestOptions)
      return await res.json()
      
      // .then(response => response.text())
      // .then(result => console.log(result))
      // .catch(error => console.log('error', error));
    }
  },
  modules: {
    auth,
    info,
    category,
    record,
  },
});
