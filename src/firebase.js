import firebase from "firebase"
import "firebase/auth"
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBuOY25i5o57FryjQvPoNSQPKI9gR2duv4",
    authDomain: "baprojetc.firebaseapp.com",
    projectId: "baprojetc",
    storageBucket: "baprojetc.appspot.com",
    messagingSenderId: "113393717113",
    appId: "1:113393717113:web:e93e90f9f29462ad5b29a8",
    measurementId: "G-RYYKPV8BTD"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth()
export default firebase
export const database = firebase.firestore();
export const storage = firebase.storage();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp();

firebase.firestore().enablePersistence()
    .catch(err => {
        if (err.code == 'failed-precondition') {
            //multiple tabs open at once
            console.log('persistence failed');
        } else if (err.code == 'unimplemented') {
            //no browser support
            console.log('persistence is not available');
        }
    })






