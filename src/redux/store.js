import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
// Middlewares
import logger from 'redux-logger';
//import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './root-saga';
import rootReducer from './root-reducer';

// Setting up the saga middlware
const sagaMiddleware = createSagaMiddleware();

// Setting up an array for the middlewares that will be used
//const middlewares = [thunk];
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

// Creating the store using the root reducer and the middlewares
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// Adding the diffrent sagas created
sagaMiddleware.run(rootSaga);

// Setting up a persisted store so the data won't b lost upon refersh
export const persistor = persistStore(store);

//export default { store, persistor };
