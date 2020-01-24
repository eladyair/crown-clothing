import { takeLatest, put, all, call } from 'redux-saga/effects';
import { FETCH_COLLECTIONS_START } from '../types';
// Firebase related
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
// Redux actions
import { fetchCollectionsSuccess, fetchCollectionsfailure } from '../shop/shop.actions';

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');

        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);

        // put: acts like dispatch
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsfailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)]);
}
