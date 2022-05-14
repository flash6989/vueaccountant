/* eslint-disable */
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword  } from "firebase/auth";
import { ref, getDatabase, set } from 'firebase/database'

const auth = {
  actions: {
    async login({commit}, {email, password}) {
      try{
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
          
      } catch(e) {
        commit('setError', e.code)
        throw e
      }
    },
    async register({dispatch, commit}, {email, password, name}) {
      try{
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password, name)
        const uid = await dispatch('getUid')
        const db  = getDatabase();
        await set(ref(db, `/users/${uid}/info`), {
          bill: 10000,
          name,
        });
      } catch(e) {
        commit('setError', e.code)
        throw e
      }
    },
    getUid() {
      const auth = getAuth();
      const user = auth.currentUser
      return user ? user.uid : null
    },
    async logout({commit}) {
      const auth = getAuth();
      await signOut(auth)
      await commit('clearInfo')
    }
  },
};

export default auth;