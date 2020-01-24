import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Setting up routing for the all app
import { Provider } from 'react-redux'; // Setting up redux for for the app

import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store'; // the redux store (the state for the all app)
import './index.css';
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
