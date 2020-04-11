import { connect } from 'react-redux';
import {createStructuredSelector } from 'reselect';
import { compose } from 'redux'

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors'

import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collection-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoad: selectIsCollectionFetching
})

// export const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview))
// the same above code
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer;