import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {auth} from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {selectCartHidden} from '../../redux/cart/cart.selectors';

// This enables us to get the currentUser state
import CurrentUserContext from "../../contexts/current-user/current-user.context";

import {ReactComponent as Logo} from '../../assets/crown.svg';

import './header.styles.scss';

// In order to use our useContext Hook, we need to
// convert our component so that we're doing an
// explicit return of the HTML content
const Header = ({hidden}) => {
    // We leverage our useContext Hook so we can
    // get the value of the dynamic currentUser
    // prop, which was passed into the Header
    // component from the App.js file
    const currentUser = useContext(CurrentUserContext);

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

const mapStateToProps = createStructuredSelector({
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
