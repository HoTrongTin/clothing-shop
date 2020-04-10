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

//create user profile (username, password, createDate...) trong firebase database
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);     //dùng userRef này để thực hiện CRUD trên doc, colllection

    const snapShot = await userRef.get();   //kết quả trả về từ lệnh get ko dùng để get đc, chỉ chứa snapshot của giá trị hiện tại, ko phải reference đến object

    //khi thông tin user chưa được lưu trong database
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(err){
            console.log('error creating user', err)
        }
    }

    //return reference tới data của user trong database
    return userRef
}

// Dùng để add SHOP_DATA, collection  vào firebase storage
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    // group nhiều request thành một batch rồi thực hiện 1 lần
    const batch = firestore.batch();

    objectsToAdd.forEach(obj=> {
        const newDocRef = collectionRef.doc();  //create new doc with newly generated ID
        batch.set(newDocRef, obj)       // tương tự như newDocRef.set(obj) nhưng được thực hiện trong batch
    })

    return await batch.commit();

}

export const convertCollectionsSnapshotToMap = (collectionsSnapshot) => {
    const transformedCollection = collectionsSnapshot.docs.map(docSnapshot=> {
        const { title, items } = docSnapshot.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: docSnapshot.id,
            title,
            items
        }
    })

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator
    }, {})
}

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