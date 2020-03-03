import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';

// This import enables us to leverage the Context
// to dynamically set the currentUser state
import CurrentUserContext from "./contexts/current-user/current-user.context";

class App extends React.Component {
    // When using the Context, we need to set our
    // initial state in the constructor method, as
    // we need to give the undefined currentUser
    // value in the Context a dynamic value -
    // initially null and then the snapshot of the
    // user when signed in
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        // We can remove this as we're no longer
        // using the setCurrentUser prop/selector
        // const {setCurrentUser} = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    // We replace the setCurrentUser prop
                    // and use this.setState to dynamically
                    // set the value of the currentUser prop
                    this.setState({
                        currentUser: {
                            id: snapShot.id,
                            ...snapShot.data()
                        }
                    });
                });
            }

            // We replace the setCurrentUser prop
            // and use this.setState to dynamically
            // set the value of the currentUser prop
            this.setState({currentUser: userAuth});
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        // We wrap the Header component with the Context.Provider
        // component and set its value to the currentUser state
        // using the value prop
        return (
            <div>
                <CurrentUserContext.Provider value={this.state.currentUser}>
                    <Header/>
                </CurrentUserContext.Provider>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route exact path='/checkout' component={CheckoutPage}/>
                    <Route
                        exact
                        path='/signin'
                        render={() =>
                            // We change props to state, as we
                            // are now pulling the currentUser
                            // from the state, not props
                            this.state.currentUser ? (
                                <Redirect to='/'/>
                            ) : (
                                <SignInAndSignUpPage/>
                            )
                        }
                    />
                </Switch>
            </div>
        );
    }
}

export default App;
