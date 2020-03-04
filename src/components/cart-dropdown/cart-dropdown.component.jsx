// useContext enables using our Provider
import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
// Enables using our CartContext to show cart items
import {CartContext} from "../../providers/cart/cart.provider";

import './cart-dropdown.styles.scss';

// Now that we are using Context, we need to switch the
// rendered code over to use an explicit return instead
const CartDropdown = ({history}) => {
    // We pull the cartItems and toggleHidden from our Context
    const {cartItems, toggleHidden} = useContext(CartContext);

    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {cartItems.length ? (
                    cartItems.map(cartItem => (
                        <CartItem key={cartItem.id} item={cartItem}/>
                    ))
                ) : (
                    <span className='empty-message'>Your cart is empty</span>
                )}
            </div>
            <CustomButton
                onClick={() => {
                    history.push('/checkout');
                    toggleHidden();
                }}
            >
                GO TO CHECKOUT
            </CustomButton>
        </div>
    );
};

export default withRouter(CartDropdown);
