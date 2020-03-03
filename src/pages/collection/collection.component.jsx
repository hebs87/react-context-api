// Import useContext to allow accessing Context API
import React, {useContext} from 'react';

import CollectionItem from '../../components/collection-item/collection-item.component';

// Import CollectionsContext Context API to enable Redux replacement
import CollectionsContext from "../../contexts/collections/collections.context";

import './collection.styles.scss';

// Instead of passing in the collections prop from the
// selector that was passed into the mapStateToProps,
// we instead pass the match prop (from the Route
// component in the App.js file) into it so that we can
// call it when leveraging the Context API component instead
const CollectionPage = ({ match }) => {
    // useContext allows us to access the data in the Context
    // passed into it, and store the value in a const
    // We get access to the Context's stored object - collections
    // in this instance - and store it in a const
    const collections = useContext(CollectionsContext);
    // We then want to pluck the specific object we want from this
    // collection. We use the match.params.collectionId to get
    // the collection object, based on the url param value of the
    // relevant collection page (/hats, /jackets, etc.)
    const collection = collections[match.params.collectionId];
    // We then want to pluck off the title and items
    // from that collection object
    const { title, items } = collection;

    return (
        <div className='collection-page'>
            <h2 className='title'>{ title }</h2>
            <div className='items'>
                {items.map(item => (
                    <CollectionItem key={ item.id } item={ item }/>
                ))}
            </div>
        </div>
    );
};

export default CollectionPage;
