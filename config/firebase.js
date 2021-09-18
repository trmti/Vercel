import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyClnRPO1sYP77AR4g2BqR8g1ZQZN_yBPx8",
    authDomain: "questionnaire-7c4d1.firebaseapp.com",
    projectId: "questionnaire-7c4d1",
    storageBucket: "questionnaire-7c4d1.appspot.com",
    messagingSenderId: "445858736496",
    appId: "1:445858736496:web:7f0720fe81ed5c307687b5",
    measurementId: "G-VP7K5E33GK",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
