import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

// This enables us to get the currentUser state
import CurrentUserContext from "../../contexts/current-user/current-user.context";
// This enables us to use Context for the toggleHidden value
import CartContext from "../../contexts/cart/cart.context";

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
    // We want to store the hidden value of the Context
    // here, so that we can propagate the changes to
    // the relevant components that use it - this will
    // be the default value that it was in our CartContext
    const [hidden, setHidden] = useState(true);
    // We then create a toggleHidden const that will be
    // an anonymous function that sets the hidden value
    // to the opposite of what it currently is - true to false
    const toggleHidden = () => setHidden(!hidden);

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
                <CartContext.Provider value={{
                    // We need to wrap the CartIcon component with
                    // the new Context.Provider and set the value
                    // to an object in which the hidden property
                    // goes to the hidden state that we set, and
                    // the toggleHidden empty function goes to the
                    // new function that we defined
                    hidden,
                    toggleHidden
                }}>
                    <CartIcon/>
                </CartContext.Provider>
            </div>
            {hidden ? null : <CartDropdown/>}
        </div>
    );
};

export default Header;
