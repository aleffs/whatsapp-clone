import * as firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBgOYhDxOdKLJ5UA665nEp3Ni-Lc_5Ov0Y",
    authDomain: "whatsapp-clone-6821d.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-6821d.firebaseio.com",
    projectId: "whatsapp-clone-6821d",
    storageBucket: "whatsapp-clone-6821d.appspot.com",
    messagingSenderId: "625336279421",
    appId: "1:625336279421:web:a0f7d597473ea40a382c14",
    measurementId: "G-RLQ855C2X8"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export const db = firebase.firestore();