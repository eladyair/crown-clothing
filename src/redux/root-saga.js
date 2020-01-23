import { all, call } from 'redux-saga/effects';
// Sagas
import { userSagas } from './sagas/user.sagas';
import { shopSagas } from './sagas/shop.sagas';
import { cartSagas } from './sagas/cart.sagas';

export default function* rootSaga() {
    yield all([call(userSagas), call(shopSagas), call(cartSagas)]);
}
