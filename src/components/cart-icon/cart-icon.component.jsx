import React, {useContext} from 'react';
// Import the Context to enable us to set the hidden state
import CartContext from "../../contexts/cart/cart.context";

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

// We remove the toggleCartHidden prop, as we will be
// getting the properties from the Context instead
// In order to use our useContext Hook, we need to
// convert our component so that we're doing an
// explicit return of the HTML content
const CartIcon = ({itemCount}) => {
    // We want to get the toggleHidden prop from our
    // CartContext, as this is the function that
    // triggers the state change. This will then be
    // passed into the component's onClick function
    const { toggleHidden } = useContext(CartContext);

    return (
        <div className='cart-icon' onClick={toggleHidden}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{itemCount}</span>
        </div>
    );
};

export default CartIcon;
