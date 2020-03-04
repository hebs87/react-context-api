import React, {useContext} from 'react';
// Import the Context to enable us to set the hidden state
import {CartContext} from "../../providers/cart/cart.provider";

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

// We remove the toggleCartHidden prop, as we will be
// getting the properties from the Context instead
// In order to use our useContext Hook, we need to
// convert our component so that we're doing an
// explicit return of the HTML content
const CartIcon = () => {
    // We want to get the toggleHidden prop from our
    // CartContext, as this is the function that
    // triggers the state change. This will then be
    // passed into the component's onClick function
    // We also want to get the cartItemsCount
    const { toggleHidden, cartItemsCount } = useContext(CartContext);

    return (
        <div className='cart-icon' onClick={toggleHidden}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{cartItemsCount}</span>
        </div>
    );
};

export default CartIcon;
