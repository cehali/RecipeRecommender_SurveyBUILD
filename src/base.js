import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAWeyyJ4ILxEuTfZ-VnjdHk3y_0Z2TPtWQ",
    authDomain: "reciperecommender-survey.firebaseapp.com",
    databaseURL: "https://reciperecommender-survey.firebaseio.com",
    projectId: "reciperecommender-survey",
  };

 const app = firebase.initializeApp(config);
 
 export { app }