import firebase from 'firebase';

let config = {
  apiKey: "AIzaSyCzmK3vVCgdEAbR2P1hgZrgtVhWfNd7rXA",
  authDomain: "mobile-movie-project.firebaseapp.com",
  databaseURL: "https://mobile-movie-project.firebaseio.com",
  projectId: "mobile-movie-project",
  storageBucket: "mobile-movie-project.appspot.com",
  messagingSenderId: "682035633996"
};

let app = firebase.initializeApp(config);
const fb = firebase.auth();

// Get a reference to the database service
const database = app.database();
export {database, app};