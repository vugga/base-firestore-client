import firebase from 'firebase';
import 'firebase/firestore';
import config from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.firestore();
export { db };
