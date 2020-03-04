import React, {useContext} from 'react';
import CollectionPreview from '../collection-preview/collection-preview.component';

// Enables us to get the shop data from our Context
import CollectionsContext from "../../contexts/collections/collections.context";

import './collections-overview.styles.scss';

// As we are using Context, we need to do an explicit return
const CollectionsOverview = () => {
    // We need to get the data from the CollectionsContext
    const collectionsMap = useContext(CollectionsContext);
    // We then need to map over the data and pull the
    // relevant collections by the keys (same functionality
    // that we had in the selector
    const collections = Object.keys(collectionsMap).map(
        key => collectionsMap[key]);

    return (
        <div className='collections-overview'>
            {collections.map(({id, ...otherCollectionProps}) => (
                <CollectionPreview key={id} {...otherCollectionProps} />
            ))}
        </div>
    );
};

export default CollectionsOverview;
