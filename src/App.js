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
// Redux related
import { checkUserSession } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends Component {
    //unsubscribeFromAuth = null;

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/shop' component={ShopPage} />
                    <Route exact path='/checkout' component={CheckoutPage} />
                    <Route exact path='/signin' render={() => (this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUp />)} />
                </Switch>
            </div>
        );
    }

    componentDidMount() {
        const { checkUserSession } = this.props;
        checkUserSession();
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
