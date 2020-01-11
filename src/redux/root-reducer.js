import { combineReducers } from 'redux';
// All the app reducers
import userR from './user/user.reducer';

export default combineReducers({
    user: userR
});
