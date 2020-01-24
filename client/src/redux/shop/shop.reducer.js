import { FETCH_COLLECTIONS_START, FETCH_COLLECTIONS_SUCCESS, FETCH_COLLECTIONS_FAILURE } from '../types';

const INITIAL_STATE = {
    collections: null,
    isFetching: false,
    errorMsg: undefined
};

const shopReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_COLLECTIONS_START:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collections: payload
            };
        case FETCH_COLLECTIONS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMsg: payload
            };
        default:
            return state;
    }
};

export default shopReducer;
