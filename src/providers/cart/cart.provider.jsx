import React, {createContext, useState, useEffect} from 'react';
// Import our cart utils to allow us to leverage them in Provider
import {
    addItemToCart,
    removeItemFromCart,
    filterItemFromCart,
    getCartItemsCount,
    getCartTotal
} from "./cart.utils";

// Copy and paste the existing CartContext and modify it
// For the default value of the Context, we will
// instantiate an object - we need to set a value
// that we want the context to hold, but also the
// function that will end up updating that value
export const CartContext = createContext({
    // The cart is hidden by default, so we set the
    // hidden property's value to true
    hidden: true,
    // We create the function that will toggle the
    // hidden value. However, here, we only want a
    // default value, which will be an empty function,
    // which will then be defined by the component's
    // local state
    // It needs to be an empty function so that it
    // doesn't throw an error if we ever invoke this
    // in the component but don't define a new function
    // If the default value of this prop is null, we
    // can't invoke a null object, but we can invoke
    // a function instead
    toggleHidden: () => {},
    // cartItems will be an empty array that will
    // contain the cartItems
    cartItems: [],
    // Add and removeItems will be empty functions that
    // will ultimately leverage the utility functions
    addItem: () => {},
    removeItem: () => {},
    // clearItemFromCart will be an empty function
    clearItemFromCart: () => {},
    // cartItemsCount will initially be 0
    cartItemsCount: 0,
    // cartItemsTotal will initially be 0
    getCartTotal: 0
});

// This CartProvider component will wrap around the whole
// application in the index.js file, which will provide
// the necessary cart state access to the whole application
const CartProvider = ({children}) => {
    // We want to store the hidden value of the Context
    // here, so that we can propagate the changes to
    // the relevant components that use it - this will
    // be the default value that it was in our CartContext
    const [hidden, setHidden] = useState(true);
    // We want access to our cartItems, which will have a
    // default value of an empty array
    const [cartItems, setCartItems] = useState([]);
    // We want access to our cartItemsCount, which will
    // have a default value of 0 - this state change will be
    // triggered in the first effect below
    const [cartItemsCount, setCartItemsCount] = useState(0);
    // We want access to our cartItemsTotal, which will
    // have a default value of 0 - this state change will be
    // triggered in the second effect below
    const [cartTotal, setCartTotal] = useState(0);
    // addItem will be us calling setCartItems on the new array
    // of all the cartItems we want to update to - we leverage
    // the addItemsToCart cart util and pass in the item we want
    // to get, as well as our existing items
    const addItem = item =>
        setCartItems(addItemToCart(cartItems, item));
    // removeItem will be similar to the addItem, except we
    // leverage the removeItemFromCart cart util instead
    const removeItem = item =>
        setCartItems(removeItemFromCart(cartItems, item));
    // We create a toggleHidden const that will be
    // an anonymous function that sets the hidden value
    // to the opposite of what it currently is - true to false
    const toggleHidden = () => setHidden(!hidden);
    // --- To set up our clearItemFrom Cart and cartItemsCount ---
    // --- we need to define utility function that we can then ---
    // --- leverage - we currently have this code in our cart ---
    // --- reducer and selector, so we need to move the ---
    // --- relevant code into our cart utils ---
    // removeItem will be similar to the addItem, except we
    // leverage the filterItemFromCart cart util instead
    const clearItemFromCart = item =>
        setCartItems(filterItemFromCart(cartItems, item));

    // As both effects are watching the same state change,
    // we can call them in the same useEffect Hook
    useEffect(() => {
        // To calculate the cartItemsCount, we leverage the
        // getCartItemsCount util, but we need to use this as
        // an effect that gets fired any time the cartItems
        // value updates - this means it needs to watch for this
        setCartItemsCount(getCartItemsCount(cartItems));
        // To calculate the cartItemsTotal, we leverage the
        // getCartItemsTotal util, but we need to use this as
        // an effect that gets fired any time the cartItems
        // value updates - this means it needs to watch for this
        setCartTotal(getCartTotal(cartItems));
    }, [cartItems]);

    return(
        // We render our CartContext.Provider as the actual
        // component that wraps around all the children -
        // children being all components in our app
        <CartContext.Provider
            value={{
                hidden,
                toggleHidden,
                cartItems,
                addItem,
                removeItem,
                cartItemsCount,
                cartTotal,
                clearItemFromCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
