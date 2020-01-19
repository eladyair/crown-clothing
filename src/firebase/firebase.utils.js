import firebase from 'firebase/app'; // Pulling in the firebase utility libraries, in this case just the app
import 'firebase/firestore'; // Importing firestore(database) from firebase
import 'firebase/auth'; // Importing authentication from firebase

// The config object of firebase to work with this current app
const config = {
    apiKey: 'AIzaSyD02lbLJDxHMKts0lctO7hlIMXcEAe0u1Q',
    authDomain: 'crown-db-47e48.firebaseapp.com',
    databaseURL: 'https://crown-db-47e48.firebaseio.com',
    projectId: 'crown-db-47e48',
    storageBucket: 'crown-db-47e48.appspot.com',
    messagingSenderId: '316205822149',
    appId: '1:316205822149:web:975c213413a01c509040ac'
};

// Initializing our firebase to be connected to the firebase cloud app account
firebase.initializeApp(config);

// Setting google to be this app option for authentication
const provider = new firebase.auth.GoogleAuthProvider();
// Setting this google provider with parameters
provider.setCustomParameters({ prompt: 'select_account' });

// Exporting a fuction that will add the user that signed in using google to the database
export const createUserProfileDocument = async (userAuth, additionalData) => {
    try {
        // If no such user
        if (!userAuth) {
            return;
        }

        // Get a user reference from firestore(database) using the userAuth user id (google authentication user id)
        const userRef = firestore.doc(`users/${userAuth.uid}`);

        // Getting this user details from firestore(database)
        const userSnapShot = await userRef.get();

        // If this user doesn't exist, we add it to firestore(database)
        if (!userSnapShot.exist) {
            // Getting the name and email and creating a timestamp
            const { displayName, email } = userAuth;
            const createdAt = new Date();

            try {
                // Saving this user to the database
                await userRef.set({
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
                });
            } catch (err) {
                console.log('Error creating user', err.message);
            }
        }

        return userRef;
    } catch (err) {
        console.log(err);
    }
};

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });

    // Transforming the array of objects to an objects with keys that their values are their appropriate collection
    return transformedCollection.reduce((acc, collection) => {
        acc[collection.title.toLowerCase()] = collection;
        return acc;
    }, {});
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

// Exporting the firebase auth
export const auth = firebase.auth();
// Exporting the firebase firestore(database)
export const firestore = firebase.firestore();
// Exporting a sign in function using firebase auth along with the provider we set up
export const signInWithGoogle = () => auth.signInWithPopup(provider);
// Exporting firebase
export default firebase;
