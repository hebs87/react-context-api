import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

// This enables us to get the currentUser state
import CurrentUserContext from "../../contexts/current-user/current-user.context";
// This enables us to use Context for the toggleHidden value
import {CartContext} from "../../providers/cart/cart.provider";

import {ReactComponent as Logo} from '../../assets/crown.svg';

import './header.styles.scss';

// In order to use our useContext Hook, we need to
// convert our component so that we're doing an
// explicit return of the HTML content
// We can remove the hidden prop here as we will
// no longer be using Redux, so we won't be passing
// this in as a prop at the top level
const Header = () => {
    // We leverage our useContext Hook so we can
    // get the value of the dynamic currentUser
    // prop, which was passed into the Header
    // component from the App.js file
    const currentUser = useContext(CurrentUserContext);
    // We need to get the hidden value from our CartContext
    // so that we can propagate the changes through to the
    // CartIcon component, which will then set the hidden,
    // state, pass it back up to the app, and the CartDropdown
    // can then use it to show/hide
    const {hidden} = useContext(CartContext);

    return (
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo'/>
            </Link>
            <div className='options'>
                <Link className='option' to='/shop'>
                    SHOP
                </Link>
                <Link className='option' to='/shop'>
                    CONTACT
                </Link>
                {currentUser ? (
                    <div className='option' onClick={() => auth.signOut()}>
                        SIGN OUT
                    </div>
                ) : (
                    <Link className='option' to='/signin'>
                        SIGN IN
                    </Link>
                )}
                <CartIcon/>
            </div>
            {hidden ? null : <CartDropdown/>}
        </div>
    );
};

export default Header;
