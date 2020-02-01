import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';  
import 'firebase/storage';

var config = {
    apiKey: "AIzaSyAuyuNcunURGGkny2xJ0VDcXOc5k2kohcg",
    authDomain: "slack-app-d47b6.firebaseapp.com",
    databaseURL: "https://slack-app-d47b6.firebaseio.com",
    projectId: "slack-app-d47b6",
    storageBucket: "slack-app-d47b6.appspot.com",
    messagingSenderId: "539859022252"
  };

firebase.initializeApp(config);

export default firebase;

// == SERVICE STORAGE ==

// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }