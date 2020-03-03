import { createContext } from 'react';

// For the default value of the Context, we will
// instantiate an object - we need to set a value
// that we want the context to hold, but also the
// function that will end up updating that value
const CartContext = createContext({
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
    togglehidden: () => {}
});

export default CartContext;
