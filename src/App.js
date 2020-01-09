import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'; // Using the react router to handle the app routes
import './App.css';

// Components
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
// Importing what we need from firebase utils
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends Component {
    unsubscribeFromAuth = null;

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser} />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/shop' component={ShopPage} />
                    <Route exact path='/signin' component={SignInAndSignUp} />
                </Switch>
            </div>
        );
    }

    componentDidMount() {
        // Setting a listener for the firebase sign in by google auth
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            // If user using google sign in exist
            if (userAuth) {
                // Reteriving the user (in case he's not yet in the database, it will insert him)
                const userRef = await createUserProfileDocument(userAuth);

                // Setting a listenner on the user(onSnapshot) to wait till it receives it's details
                userRef.onSnapshot(snapshot => {
                    // Once a snapshot of the user exist, we set he's details in the state in currentUser
                    this.setState({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data()
                        }
                    });

                    console.log(this.state);
                });
            }

            this.setState({ currentUser: userAuth });
        });
    }

    componentWillUnmount() {
        // Once the component will unmount then the user will be unsubscribe
        // from the listener that was set above, so there will not be any memory leaks
        this.unsubscribeFromAuth();
    }
}

export default App;
