import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAWIMcC2JG2OECShY-gf2x5GVD82X5xyjQ",
    authDomain: "scheduler-7669b.firebaseapp.com",
    databaseURL: "https://scheduler-7669b-default-rtdb.firebaseio.com",
    projectId: "scheduler-7669b",
    storageBucket: "scheduler-7669b.appspot.com",
    messagingSenderId: "610583478573",
    appId: "1:610583478573:web:6c390846687b88371553a4",
    measurementId: "G-P5M1Y52JEW"
};

firebase.initializeApp(firebaseConfig);

export { firebase };