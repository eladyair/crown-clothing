import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
// A log middleware
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// Setting up an array for the middlewares that will be used
const middlewares = [];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

// Creating the store using the root reducer and the middlewares
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// Setting up a persisted store so the data won't b lost upon refersh
export const persistor = persistStore(store);

//export default { store, persistor };
