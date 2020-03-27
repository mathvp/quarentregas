import Vue from 'vue'
import { uid, Dialog } from 'quasar'
import { firebaseDb, firebaseAuth, firebaseStorage } from 'boot/firebase'
import firebase from '@firebase/app'

const state = {
  business: {
    data: {
    }
  },
  businessListing: {},
  temporaryImages: {},
  currentShowingBusiness: {},
  searchBusinessListing: {
    data: {}
  }
}

const mutations = {
  addBusiness (state, payload) {
    Vue.set(state.business, payload.id, payload.business)
  },
  addBusinessListing (state, payload) {
    if (!state.businessListing[payload.id]) {
      Vue.set(state.businessListing, payload.id, [])
    }
    state.businessListing[payload.id].push(payload.business)
  },
  addTemporaryImage (state, payload) {
    Vue.set(state.temporaryImages, payload.id, payload.image)
  },
  clearTemporaryImage (state) {
    Vue.set(state.temporaryImages, 'logo', {})
    Vue.set(state.temporaryImages, 'photo', {})
  },
  addCurrentShowingBusiness (state, payload) {
    Vue.set(state.currentShowingBusiness, 'data', payload.business)
  },
  clearCurrentBusinessListing (state) {
    state.businessListing = Object.assign({}, {})
  },
  addSearchBusinessListing (state, data) {
    Vue.set(state.searchBusinessListing, 'data', data)
  }
}

const actions = {
  businessFromCategory ({ commit }, queryParams) {
    commit('clearTemporaryImage')
    commit('clearCurrentBusinessListing')

    const categoryId = queryParams.category
    const limit = queryParams.limit

    if (state.businessListing[categoryId]) {
      return
    }

    const ref = firebaseDb.collection('businessListing')
    const query = limit ? ref.where('category', '==', categoryId).limit(limit) : ref.where('category', '==', categoryId)

    query.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const payload = {
          id: categoryId,
          business: doc.data()
        }
        commit('addBusinessListing', payload)
      })
    })
      .catch(error => {
        console.log('Error getting documents: ', error)
      })
  },
  async addBusiness ({ commit, dispatch }, business) {
    const businessId = uid()

    const cleanPhotoURL = !state.temporaryImages.photo ? '' : state.temporaryImages.photo.url
    const cleanLogoURL = !state.temporaryImages.logo ? '' : state.temporaryImages.logo.url

    const payload = {
      id: businessId,
      business: {
        name: business.name,
        description: business.description,
        category: business.selectedCategory,
        tel: business.tel,
        whatsapp: business.whatsapp,
        logoURL: cleanLogoURL || '',
        photoURL: cleanPhotoURL || '',
        facebookURL: business.facebookURL,
        instagramURL: business.instagramURL,
        siteURL: business.siteURL,
        city: 'Bragança Paulista',
        state: 'SP',
        cep: '',
        owner: business.owner,
        ownerId: '',
        email: business.email,
        document: business.document,
        status: 0
      },
      keywords: business.keywords
    }

    const context = this

    if (!firebaseAuth.currentUser) {
      firebaseAuth.signInAnonymously()
    }

    await firebaseAuth.onAuthStateChanged(async (user) => {
      if (!user) {
        return
      }

      payload.business.ownerId = user.uid

      await firebaseDb.collection('business').doc(payload.id).set(payload.business)
        .then(function () {
          Dialog.create({
            title: 'Tudo certo',
            message: 'O anúncio foi enviado para aprovação e será publicado em breve! Obrigado!',
            color: 'positive'
          })
          commit('addBusiness', payload)
          dispatch('addBusinessListing', payload)
          context.$router.push({ name: 'index' })
        })
        .catch(function () {
          Dialog.create({
            title: 'Erro!',
            message: 'Não foi possível enviar seu anúncio...',
            color: 'warning'
          })
        })
      commit('clearTemporaryImage')
    })
  },
  uploadImg ({ commit }, payload) {
    firebaseAuth.signInAnonymously()

    firebaseAuth.onAuthStateChanged((user) => {
      if (!user) {
        return
      }

      const imageFile = payload.file
      const fileId = payload.id

      const storageRef = firebaseStorage.ref()

      // Upload file and metadata to the object 'images/mountains.jpg'
      const uploadTask = storageRef.child(`photos/${uid()}${imageFile.name}`).put(imageFile)

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function () {
        }, function (error) {
          console.log(error)
        }, function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(async function (downloadURL) {
            const payload = {
              id: fileId,
              image: {
                url: downloadURL
              }
            }
            await commit('addTemporaryImage', payload)
          }).catch()
        })
    })
  },
  addBusinessListing (obj, payload) {
    const businessForListing = {
      id: payload.id,
      logoURL: payload.business.logoURL || '',
      name: payload.business.name,
      description: payload.business.description,
      category: payload.business.category,
      keywords: payload.keywords
    }

    firebaseAuth.signInAnonymously()

    firebaseAuth.onAuthStateChanged((user) => {
      if (!user) {
        return
      }

      firebaseDb.collection('businessListing').doc(payload.id).set(businessForListing)
        .then(function () {
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    })
  },
  async loadBusiness ({ commit }, businessId) {
    await firebaseDb.collection('business').doc(businessId)
      .get()
      .then(async doc => {
        const payload = {
          id: businessId,
          business: doc.data()
        }
        await commit('addCurrentShowingBusiness', payload)
      })
      .catch(error => {
        console.log('Error getting documents: ', error)
      })
  },
  async loadBusinessForSearch ({ commit }, queryParams) {
    if (state.searchBusinessListing.data && Object.keys(state.searchBusinessListing.data).length) {
      return
    }

    const ref = firebaseDb.collection('businessListing')

    await ref.get().then(querySnapshot => {
      const searchData = []
      querySnapshot.forEach(doc => {
        searchData.push(doc.data())
      })
      commit('addSearchBusinessListing', searchData)
    })
      .catch(error => {
        console.log('Error getting documents: ', error)
      })
  }
}

const getters = {
  getBusinessFromCategory: state => categoryId => {
    if (!state.businessListing[categoryId]) {
      return []
    }

    console.log(state.businessListing[categoryId])

    return Object.values(state.businessListing[categoryId])
  },
  getBusiness: state => {
    return state.currentShowingBusiness.data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
