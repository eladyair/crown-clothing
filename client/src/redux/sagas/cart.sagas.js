import { takeLatest, put, all, call } from 'redux-saga/effects';
import { SIGN_OUT_SUCCESS } from '../types';
// Redux actions
import { clearCart } from '../cart/cart.actions';

export function* clearCartOnSignOut() {
    yield put(clearCart());
}

export function* onSignOutSuccess() {
    yield takeLatest(SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
    yield all([call(onSignOutSuccess)]);
}
