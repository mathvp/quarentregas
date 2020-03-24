import Vue from 'vue'
import { firebaseDb } from 'boot/firebase'

const state = {
  categories: {
    // data: {
    //   'CATEGORY_ID': {
    //     name: 'Nome da Categoria'
    //   }
    // }
  }
}

const mutations = {
  addCategories (state, payload) {
    Vue.set(state.categories, payload.id, payload.categories)
  }
}

const actions = {
  async fbReadCategoriesData ({ commit }) {
    // const categoriesRef = firebaseDb.ref('/categories')

    // categoriesRef.once('value').then((snapshot) => {
    //   const categories = snapshot.val()
    //   const payload = {
    //     id: 'data',
    //     categories
    //   }
    //   commit('addCategories', payload)
    // })
    const snapshot = await firebaseDb.collection('categories').get()
    const payload = {
      id: 'data',
      categories: snapshot.docs.map(doc => doc.data())
    }
    commit('addCategories', payload)
    // return snapshot.docs.map(doc => doc.data());
    // firebaseDb.collection('business').get().then(doc => {
    //   const categories = doc.data()
    //   const payload = {
    //     id: 'data',
    //     categories
    //   }
    //   commit('addCategories', payload)
    // })
  }
}

const getters = {
  categoriesArray: (state) => {
    if (!state.categories.data) {
      return []
    }

    return Object.values(state.categories.data).map((category) => category.name)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
