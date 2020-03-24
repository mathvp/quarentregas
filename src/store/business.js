import Vue from 'vue'
import { uid } from 'quasar'
import { firebaseDb } from 'boot/firebase'

const state = {
  business: {
    data: {
      business1: {
        name: 'MC Donald\'s Bragança',
        description: 'Maior rede de Fast-Food do Mundo',
        category: 'Lanchonete',
        tel: '(11) 97529-7752',
        whatsapp: '(11) 97529-7752',
        logoURL: 'https://imagensemoldes.com.br/wp-content/uploads/2018/03/Mc-Donald%C2%B4s-Logo-Vetor-PNG.png',
        photoURL: 'https://assets.b9.com.br/wp-content/uploads/2019/04/pulls-artificil-preservatives-burgers.jpg',
        facebookURL: 'https://www.facebook.com/McDonaldsBrasil/',
        instagramURL: 'https://www.instagram.com/mcdonalds_br/?hl=pt-br',
        siteURL: 'www.mcdonalds.com.br',
        city: 'Bragança Paulista',
        state: 'SP',
        cep: '12900-351',
        owner: 'Matheus Vieira',
        email: 'matheusvieiradepaula@gmail.com',
        document: '421.945.238-98',
        status: 1
      },
      business2: {
        name: 'Habib\'s',
        description: 'Peça sua Bib\'sfiha',
        category: 'Lanchonete',
        tel: '(11) 97529-7752',
        whatsapp: '(11) 97529-7752',
        logoURL: 'https://3.bp.blogspot.com/-NJw9aMf4pbA/U83NJelGXkI/AAAAAAABS6I/cQH7TjJ8B80/s1600/habibs+logo.jpg',
        photoURL: 'https://www.habibs.com.br/storage/products/images/1_grid_fundo_2.jpg',
        facebookURL: '',
        instagramURL: '',
        siteURL: '',
        city: 'Bragança Paulista',
        state: 'SP',
        cep: '12900-351',
        owner: 'Matheus Vieira',
        email: 'matheusvieiradepaula@gmail.com',
        document: '421.945.238-98',
        status: 1
      },
      business3: {
        name: 'Lanchonete do Silvio Santos',
        description: `Silvio Santos Ipsum É por sua conta e riscoamm?
        É fácil ou não éam? Ma vejam só, vejam só. Eu só acreditoammmm....
        Vendoammmm. Mah roda a roduamm. É bom ou não éam? Mah você não consegue né Moisés?
        Você não consegueam.`,
        category: 'Lanchonete',
        tel: '',
        whatsapp: '(11) 97529-7752',
        logoURL: '',
        photoURL: '',
        facebookURL: '',
        instagramURL: '',
        siteURL: 'www.google.com',
        city: 'Bragança Paulista',
        state: 'SP',
        cep: '12900-351',
        owner: 'Matheus Vieira',
        email: 'matheusvieiradepaula@gmail.com',
        document: '421.945.238-98',
        status: 1
      }
    }
  },
  businessListing: {}
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
    if (state.businessListing[categoryId]) {
      return
    }

    firebaseDb.collection('business').where('category', '==', categoryId)
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
  addBusiness ({ commit }, business) {
    const businessId = uid()
    const payload = {
      id: businessId,
      business
    }
    commit('addBusiness', payload)
  }
}

const getters = {
  getBusinessFromCategory: state => categoryId => {
    if (!state.businessListing[categoryId]) {
      return []
    }

    return Object.values(state.businessListing[categoryId])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
