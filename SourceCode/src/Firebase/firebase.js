import firebase from 'firebase';



  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD4dkmERNiFzrbnyQy3lgMeHtbZsCPfC5Y",
    authDomain: "login-proyecto-5bcc4.firebaseapp.com",
    databaseURL: "https://login-proyecto-5bcc4.firebaseio.com",
    projectId: "login-proyecto-5bcc4",
    storageBucket: "login-proyecto-5bcc4.appspot.com",
    messagingSenderId: "517292472560",
    appId: "1:517292472560:web:9b93604317f9bc38736a35"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase; 