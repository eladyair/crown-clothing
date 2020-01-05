import React from 'react';
import { Switch, Route } from 'react-router-dom'; // Using the react router to handle the app routes
import './App.css';

// Components
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

function App() {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/shop' component={ShopPage} />
            </Switch>
        </div>
    );
}

export default App;
