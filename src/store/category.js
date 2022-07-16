import { ref, getDatabase, push, child, update, get } from 'firebase/database'

export default {
  actions: {
    async fetchCategories({commit, dispatch}) {
      try{
        const db  = getDatabase();
        const uid = await dispatch('getUid')
        const newCategoryKey = await ref(db, `users/${uid}/categories`);
        const getData = (await get(newCategoryKey)).val()
        return Object.keys(getData).map(key =>({...getData[key], id: key}))
      }catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategoryById({commit, dispatch}, id) {
      try{
        const dbRef  = ref(getDatabase());
        const uid = await dispatch('getUid')
        const category = (await get(child(dbRef, `users/${uid}/categories/${id}`))).val();
        return {...category, id}
      }catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({commit, dispatch}, {title, limit, id}) {
      try{
        const db  = getDatabase();
        const uid = await dispatch('getUid')
        const updates = {};
        updates[`/users/${uid}/categories/${id}`] = {title, limit};
        return update(ref(db), updates);
      }catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory({commit, dispatch}, {title, limit}) {
      try{
        const db  = getDatabase();
        const uid = await dispatch('getUid')
        console.log(uid, 'uid')
        const postData = {
            title, limit
          };
          const newCategoryKey = push(child(ref(db), `users/${uid}/categories`)).key;
            update(ref(db), {
            [`/users/${uid}/categories/${newCategoryKey}`]: postData
          })

        return  {title, limit, id: newCategoryKey}
      }catch(e) {
        commit('setError', e)
        throw e
      }
    }
  }
}