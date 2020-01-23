import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

// HOC
import WithSpinner from '../../components/with-spinner/with-spinner.component';
// Component
import CollectionsPage from '../../pages/collection/collection.component';

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionsLoaded(state)
});

const CollectionPageContainer = compose(connect(mapStateToProps), WithSpinner)(CollectionsPage);

export default CollectionPageContainer;
