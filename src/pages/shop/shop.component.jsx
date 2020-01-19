import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// Components
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
// HOC
import WithSpinner from '../../components/with-spinner/with-spinner.component';
// Redux related
import { updateCollections } from '../../redux/shop/shop.actions';
// Firebase related
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

// Declaring 2 new components using the HOC that was imported above
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
    unsubscribeFromSnapshot = null;

    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={props => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} />
                <Route path={`${match.path}/:collectionId`} render={props => <CollectionPageWithSpinner isLoading={loading} {...props} />} />
            </div>
        );
    }

    componentDidMount() {
        const { updateCollections } = this.props;

        const collectionRef = firestore.collection('collections');

        // Using observer behind the scenes
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = await convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });

        // Using promises pattern behind the scenes
        // collectionRef.get().then(snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionsMap);
        //     this.setState({ loading: false });
        // });

        // Using fetch api - cumbersome way of doing the same thing above
        // fetch('https://firestore.googleapis.com/v1/projects/crown-db-47e48/databases/(default)/documents/collections')
        //     .them(res => res.json())
        //     .then(collections => {
        //         console.log(collections);
        //     });
    }

    componentWillUnmount() {
        this.unsubscribeFromSnapshot();
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
