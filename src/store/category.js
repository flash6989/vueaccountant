import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword  } from "firebase/auth";
import { ref, getDatabase, push, child, set, update } from 'firebase/database'

export default {
    actions: {
        async createCategory({commit, dispatch}, {title, limit}) {
            try{
                const db  = getDatabase();
                const uid = await dispatch('getUid')
                console.log(uid, 'uid')
                const postData = {
                    title, limit
                  };
                  const newCategoryKey = push(child(ref(db), `users/${uid}/categories`)).key;

                  console.log(newCategoryKey)
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