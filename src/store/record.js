import { ref, getDatabase, push, child, set, get } from 'firebase/database'

export default {
  actions: {
    async createRecord({dispatch, commit}, record) {
      try{
        const db  = getDatabase();
        const uid = await dispatch('getUid')
        const newCategoryKey = push(child(ref(db), `users/${uid}/records`)).key;
        await set(ref(db, `users/${uid}/records/${newCategoryKey}`), record);
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords({dispatch, commit}) {
      try {
        const db  = getDatabase();
        const uid = await dispatch('getUid')
        const recordKey = await ref(db, `users/${uid}/records`);
        console.log(recordKey)
        const records = (await get(recordKey)).val() || {}
        return Object.keys(records).map(key =>({...records[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecordById({dispatch, commit}, id) {
      try {
        const dbRef  = ref(getDatabase());
        const uid = await dispatch('getUid')
        const record = (await get(child(dbRef, `users/${uid}/records/${id}`))).val();
        console.log(record, 'record')

        return {
          ...record,
          id: id,
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}