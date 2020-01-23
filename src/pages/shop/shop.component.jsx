import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// Components
import CollectionsOverviewContainer from '../../containers/collection-overview/collection-overview.container';
import CollectionPageContainer from '../../containers/collection/collection.container';

// Redux related
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

class ShopPage extends Component {
    render() {
        const { match, isCollectionLoaded } = this.props;

        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
            </div>
        );
    }

    componentDidMount() {
        const { fetchCollectionsStart } = this.props;

        fetchCollectionsStart();
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
