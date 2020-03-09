import React, { useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// Components
import Spinner from '../../components/spinner/spinner.component';

// Redux related
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

// import CollectionsOverviewContainer from '../../containers/collection-overview/collection-overview.container';
// import CollectionPageContainer from '../../containers/collection/collection.container';

// Lazy loaded pages components
const CollectionsOverviewContainer = lazy(() => import('../../containers/collection-overview/collection-overview.container'));
const CollectionPageContainer = lazy(() => import('../../containers/collection/collection.container'));

const ShopPage = ({ match, fetchCollectionsStart }) => {
    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);

    return (
        <div className='shop-page'>
            <Suspense fallback={<Spinner />}>
                <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
            </Suspense>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
