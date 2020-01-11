import { createStore, applyMiddleware } from 'redux';
// A log middleware
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// Setting up an array for the middlewares that will be used
const middlewares = [logger];

// Creating the store using the root reducer and the middlewares
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
