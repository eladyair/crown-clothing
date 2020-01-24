import React from 'react';
import { connect } from 'react-redux';
import './collections-overview.styles.scss';

// Components
import CollectionPreview from '../collection-preview/collection-preview.component';
// Redux related
import { createStructuredSelector } from 'reselect';
import { selectCollectionForPreview } from '../../redux/shop/shop.selectors';

const CollectionOverview = ({ collections }) => (
    <div className='collection-overview'>
        {collections.map(({ id, ...collectionProps }) => (
            <CollectionPreview key={id} {...collectionProps} />
        ))}
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
});

export default connect(mapStateToProps)(CollectionOverview);
