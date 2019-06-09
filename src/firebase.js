// import firebase from 'firebase'
const firebase = require('firebase/app');
// require('firebase/auth');
require('firebase/database');

var firebaseConfig = {
    apiKey: "AIzaSyBczyXF8LB_35hI6awLk4lyYfjNPzN5bIo",
    authDomain: "habit-tracker-ade9c.firebaseapp.com",
    databaseURL: "https://habit-tracker-ade9c.firebaseio.com",
    projectId: "habit-tracker-ade9c",
    storageBucket: "habit-tracker-ade9c.appspot.com",
    messagingSenderId: "552514933256",
    appId: "1:552514933256:web:24f0cee2d4931841"
  };
  // Initialize

firebase.initializeApp(firebaseConfig)


export default firebase