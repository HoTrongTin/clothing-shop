import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'

import CollectionOverview from '../../components/collection-overview/collection-overview.component.jsx'
import CollectionPage from '../collection/collection.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import {updateCollections} from '../../redux/shop/shop.actions'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component{
    
    state = {
        loading: true
    };

    unsubcribeFromSnapshot = null;
    
    componentDidMount(){
        const { updateCollections } = this.props
        const collectionRef = firestore.collection('collections')

        // this collectionRef gets run on the first time or get updated, the .onSnapshot() or .get() will be involked
        collectionRef.get().then(async snapshot=>{
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            updateCollections(collectionsMap)
            this.setState({loading: false});
        })


    }

    render(){
        const {match} = this.props
        const { loading } = this.state
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props)=><CollectionsOverviewWithSpinner isLoading={loading} {...props}/>}/>
                <Route exact path={`${match.path}/:collectionId`} render={(props)=><CollectionPageWithSpinner isLoading={loading} {...props}/>}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);