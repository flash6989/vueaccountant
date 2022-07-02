import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword  } from "firebase/auth";
import { ref, getDatabase, set, child, get } from 'firebase/database'

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {}
        },
    },
    actions: {
        async fetchInfo({dispatch, commit}) {
            try {
                console.log('fetchInfo')
                const uid = await dispatch('getUid')
                console.log(uid, 'uid')
                const dbRef = ref(getDatabase())
                const info = (await get(child(dbRef, `/users/${uid}/info`))).val()

                commit('setInfo', info)
            } catch (e) {
            }
        }
    },
    getters: {
        info: s => s.info
    }
}