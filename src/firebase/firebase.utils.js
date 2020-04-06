import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDOqGixm8_Fux5l12eWbyeJcqym6qAh3_k",
    authDomain: "clothing-shop-db-e15e7.firebaseapp.com",
    databaseURL: "https://clothing-shop-db-e15e7.firebaseio.com",
    projectId: "clothing-shop-db-e15e7",
    storageBucket: "clothing-shop-db-e15e7.appspot.com",
    messagingSenderId: "947538258311",
    appId: "1:947538258311:web:04ce56e6f9fb1d0de38b22",
    measurementId: "G-GXTZ66DF5K"
  };

//initialize the  firebase app
firebase.initializeApp(config);

//export authorization: để xác nhận trạng thái đăng nhập của ng dùng
export const auth = firebase.auth();

//export firestore => to use the data base in other place
export const firestore = firebase.firestore();

//give access to Google Auth class
const provider = new firebase.auth.GoogleAuthProvider()
//choose to show pop up for Google authorization
provider.setCustomParameters({promt: 'select_account'});

// dùng để gán vào Button, trigger onClick callback
export const signInWithGoogle = () => auth.signInWithPopup(provider);

//export the whole setup
export default firebase;