// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyASaj3lGo9TQtEpBXX7KyksxtzSvBzZSwU",
    authDomain: "mapaincidentes.firebaseapp.com",
    projectId: "mapaincidentes",
    storageBucket: "mapaincidentes.firebasestorage.app",
    messagingSenderId: "1075037963688",
    appId: "1:1075037963688:web:85b3cd531f8dbb011d099d",
    measurementId: "G-L58BSJBGSD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {auth};
