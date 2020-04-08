import React from 'react';
import { connect } from 'react-redux'
import CollectionItem from '../../components/collection-item/collection-item.component.jsx'

import { selectCollection } from '../../redux/shop/shop.selectors'

import './collection.style.scss'

const CollectionPage = ({collection}) => {
    const { title, items } = collection
    return (
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                {
                    items.map(item => <CollectionItem key={item.id} item={item}/>)
                }
            </div>
        </div>
    )
}
                                // ownProps: props của Component này, khác với state nằm trong redux store
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage)