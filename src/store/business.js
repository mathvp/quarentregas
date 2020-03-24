import Vue from 'vue'
import { uid, Dialog } from 'quasar'
import { firebaseDb, firebaseAuth, firebaseStorage } from 'boot/firebase'
import firebase from '@firebase/app'

const state = {
  business: {
    data: {
      // business1: {
      //   name: 'MC Donald\'s Bragança',
      //   description: 'Maior rede de Fast-Food do Mundo',
      //   category: 'Lanchonete',
      //   tel: '(11) 97529-7752',
      //   whatsapp: '(11) 97529-7752',
      //   logoURL: 'https://imagensemoldes.com.br/wp-content/uploads/2018/03/Mc-Donald%C2%B4s-Logo-Vetor-PNG.png',
      //   photoURL: 'https://assets.b9.com.br/wp-content/uploads/2019/04/pulls-artificil-preservatives-burgers.jpg',
      //   facebookURL: 'https://www.facebook.com/McDonaldsBrasil/',
      //   instagramURL: 'https://www.instagram.com/mcdonalds_br/?hl=pt-br',
      //   siteURL: 'www.mcdonalds.com.br',
      //   city: 'Bragança Paulista',
      //   state: 'SP',
      //   cep: '12900-351',
      //   owner: 'Matheus Vieira',
      //   email: 'matheusvieiradepaula@gmail.com',
      //   document: '421.945.238-98',
      //   status: 1
      // }
    }
  },
  businessListing: {},
  temporaryImages: {},
  currentShowingBusiness: {}
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
    // state.currentShowingBusiness = Object.assign({}, payload.business)
  }
}

const actions = {
  fbReadBusinessData ({ commit }) {
    // const businessRef = firebaseDb.ref('/business')

    // businessRef.once('value').then((snapshot) => {
    //   const business = snapshot.val()
    //   const payload = {
    //     id: 'data',
    //     business
    //   }
    //   commit('addBusiness', payload)
    // })

  },
  businessFromCategory ({ commit }, categoryId) {
    commit('clearTemporaryImage')

    if (state.businessListing[categoryId]) {
      return
    }

    firebaseDb.collection('businessListing').where('category', '==', categoryId)
      .get()
      .then(querySnapshot => {
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

    const payload = {
      id: businessId,
      business: {
        name: business.name,
        description: business.description,
        category: business.selectedCategory,
        tel: business.tel,
        whatsapp: business.whatsapp,
        logoURL: state.temporaryImages.logo.url || '',
        photoURL: state.temporaryImages.photo.url || '',
        facebookURL: business.facebookURL,
        instagramURL: business.instagramURL,
        siteURL: business.siteURL,
        city: 'Bragança Paulista',
        state: 'SP',
        cep: '',
        owner: business.owner,
        email: business.email,
        document: business.document,
        status: 0
      }
    }

    const context = this

    firebaseDb.collection('business').doc(payload.id).set(payload.business)
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
      category: payload.business.category
    }
    firebaseDb.collection('businessListing').doc(payload.id).set(businessForListing)
      .then(function () {
        console.log('Document successfully written!')
      })
      .catch(function (error) {
        console.error('Error writing document: ', error)
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
