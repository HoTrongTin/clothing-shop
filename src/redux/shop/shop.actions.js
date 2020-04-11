import ShopActionsTypes from './shop.types'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

export const fetchCollectionsStart = () => ({
    type: ShopActionsTypes.FETCH_COLLECTIONS_START,
})

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionsTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionFailure = errorMessage => ({
    type: ShopActionsTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections')

        dispatch(fetchCollectionsStart())
        // fetch('https://firestore.googleapis.com/v1/projects/clothing-shop-db-e15e7/databases/(default)/documents/collections')
        // .then(response => response.json()).then(collections => console.log(collections))

        // this collectionRef gets run on the first time or get updated, the .onSnapshot() or .get() will be involked
        collectionRef.get().then(snapshot=>{
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            dispatch(fetchCollectionsSuccess(collectionsMap))
        }).catch(error => dispatch(fetchCollectionFailure(error.message)))
    }
}