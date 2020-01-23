import { takeLatest, put, all, call } from 'redux-saga/effects';
import { GOOGLE_SIGN_IN_START, EMAIL_SIGN_IN_START, CHECK_USER_SESSION, SIGN_OUT_START, SIGN_UP_START, SIGN_UP_SUCCESS } from '../types';
// Firebase related
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
// Redux actions
import { signUpSuccess, signUpFailure, signInSuccess, signInFailure, signOutSuccess, signOutFailure } from '../user/user.actions';

export function* getSnapshotFromUserAuth(userAuth, addionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, addionalData);
        const userSnapshot = yield userRef.get();

        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot }));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onSignUpAsync({ payload: { name, email, password } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, addionalData: { name } }));
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* signInAfterSignUp({ payload: { user, addionalData } }) {
    yield getSnapshotFromUserAuth(user, addionalData);
}

export function* onGoogleSignInAsync() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onEmailSignInAsync({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) {
            return;
        }

        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onSignOutAsync() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure());
    }
}

export function* onSignUpStart() {
    yield takeLatest(SIGN_UP_START, onSignUpAsync);
}

export function* onSignUpSuccess() {
    yield takeLatest(SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onGoogleSignInStart() {
    yield takeLatest(GOOGLE_SIGN_IN_START, onGoogleSignInAsync);
}

export function* onEmailSignInStart() {
    yield takeLatest(EMAIL_SIGN_IN_START, onEmailSignInAsync);
}

export function* onCheckUserSeesion() {
    yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
    yield takeLatest(SIGN_OUT_START, onSignOutAsync);
}

export function* userSagas() {
    yield all([
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(isUserAuthenticated),
        call(onSignOutStart)
    ]);
}
