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
  },
  clearCategories (state) {
    state.categories = Object.assign({}, {})
  }
}

const actions = {
  async fbReadCategoriesData ({ commit }, queryParams) {
    await commit('clearCategories')
    const ref = firebaseDb.collection('categories')
    const query = queryParams !== undefined && queryParams ? ref.where('showAtHome', '==', true).orderBy('order') : ref.orderBy('name')
    const snapshot = await query.get()
    const payload = {
      id: 'data',
      categories: snapshot.docs.map(doc => doc.data())
    }
    commit('addCategories', payload)
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
