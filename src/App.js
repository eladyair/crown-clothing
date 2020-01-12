import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; // Using the react router to handle the app routes
import { connect } from 'react-redux';
import './App.css';

// Components
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
// Importing what we need from firebase utils
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
// Redux related
import { setCurrentUser } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends Component {
    unsubscribeFromAuth = null;

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/shop' component={ShopPage} />
                    <Route exact path='/checkout' component={CheckoutPage} />
                    <Route exact path='/signin' render={() => (this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUp />)} />
                </Switch>
            </div>
        );
    }

    componentDidMount() {
        const { setCurrentUser } = this.props;

        // Setting a listener to check once the app is loaded if a user already signed in
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            // If user exist
            if (userAuth) {
                // Reteriving the user (in case he's not yet in the database, it will insert him)
                const userRef = await createUserProfileDocument(userAuth);

                // Setting a listenner on the user(onSnapshot) to wait till it receives it's details
                userRef.onSnapshot(snapshot => {
                    // Once a snapshot of the user exist, we set he's details in the state in currentUser
                    setCurrentUser({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data()
                        }
                    });
                });
            }

            setCurrentUser(userAuth);
        });
    }

    componentWillUnmount() {
        // Once the component will unmount then the user will be unsubscribe
        // from the listener that was set above, so there will not be any memory leaks
        this.unsubscribeFromAuth();
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
