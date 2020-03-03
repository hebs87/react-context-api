// Import createContext to use Context API
// It is a method that can take anything like
// strings, integers, objects, functions, etc.
// and stores them as its initial state
import { createContext } from 'react';
// Import SHOP_DATA as we want to set this as
// our context's initial state
import SHOP_DATA from "../../redux/shop/shop.data";

// We create a new context that holds the SHOP_DATA
// which will be the initial value of our context
const CollectionsContext = createContext(SHOP_DATA);

export default CollectionsContext;
