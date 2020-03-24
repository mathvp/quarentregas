import firebase from '@firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDbjFWo_pPBXvluhQVicnC41aiZrB5zKBM',
  authDomain: 'quarentregas.firebaseapp.com',
  databaseURL: 'https://quarentregas.firebaseio.com',
  projectId: 'quarentregas',
  storageBucket: 'quarentregas.appspot.com',
  messagingSenderId: '1041002244147',
  appId: '1:1041002244147:web:1340d6625555689e8d5b46'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()
const firebaseDb = firebaseApp.firestore()
const firebaseStorage = firebaseApp.storage()

export { firebaseAuth, firebaseDb, firebaseStorage }
