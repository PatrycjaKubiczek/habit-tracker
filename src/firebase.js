// import firebase from 'firebase'
// const firebase = require('firebase/app');
import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './firebaseConfig.js'

// require('firebase/auth');
import 'firebase/database';


// Initialize

const firebaseApp = firebase.initializeApp(firebaseConfig)


export default firebaseApp