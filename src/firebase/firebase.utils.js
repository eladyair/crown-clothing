import firebase from 'firebase/app'; // Pulling in the firebase utility libraries in this case just the app
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyD02lbLJDxHMKts0lctO7hlIMXcEAe0u1Q',
    authDomain: 'crown-db-47e48.firebaseapp.com',
    databaseURL: 'https://crown-db-47e48.firebaseio.com',
    projectId: 'crown-db-47e48',
    storageBucket: 'crown-db-47e48.appspot.com',
    messagingSenderId: '316205822149',
    appId: '1:316205822149:web:975c213413a01c509040ac'
};

firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
