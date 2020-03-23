import firebase from '@firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDbjFWo_pPBXvluhQVicnC41aiZrB5zKBM",
  authDomain: "quarentregas.firebaseapp.com",
  databaseURL: "https://quarentregas.firebaseio.com",
  projectId: "quarentregas",
  storageBucket: "quarentregas.appspot.com",
  messagingSenderId: "1041002244147",
  appId: "1:1041002244147:web:1340d6625555689e8d5b46"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth();
const firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb };
