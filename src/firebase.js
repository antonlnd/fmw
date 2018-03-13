import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyC0hxNwT0iZTVZ_-OuBO3LCoBh3YUOzoPE",
    authDomain: "fusefanmob.firebaseapp.com",
    databaseURL: "https://fusefanmob.firebaseio.com",
    projectId: "fusefanmob",
    storageBucket: "fusefanmob.appspot.com",
    messagingSenderId: "182431611765"
};
export default firebase.initializeApp(config);

