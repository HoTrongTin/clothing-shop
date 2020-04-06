import firebase from 'firebase/app';
import 'firebase/firestore';

//setup connection tới firestore của firebase
const firestore = firebase.firestore();

//access tới collection tên là 'users' bên trong firebase database
firestore.collection('users').doc('Msk856ipOtIFEoIwqML9').collection('cardItems').doc('6KRhHH5sCnJhLrQ4acG7');       //doc({id của item})
firestore.doc('/users/Msk856ipOtIFEoIwqML9/cardItems/6KRhHH5sCnJhLrQ4acG7');
firestore.collection('/users/Msk856ipOtIFEoIwqML9/cardItems');
