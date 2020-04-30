import React from 'react';
import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA7GzlosrgAGk8nqn7gg-igke6vIlRcaww",
    authDomain: "webapp-91271.firebaseapp.com",
    databaseURL: "https://webapp-91271.firebaseio.com",
    projectId: "webapp-91271",
    storageBucket: "webapp-91271.appspot.com",
    messagingSenderId: "463467609504",
    appId: "1:463467609504:web:7f09d378dec1b7fbc9f8c5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;