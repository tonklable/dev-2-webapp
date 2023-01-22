// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//     apiKey: "AIzaSyBN-9PV5PEOdOxWOqOqmDuGSNcrPocqqK0",
//     authDomain: "dev-2-webapp.firebaseapp.com",
//     databaseURL: "https://dev-2-webapp-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "dev-2-webapp",
//     storageBucket: "dev-2-webapp.appspot.com",
//     messagingSenderId: "870530367064",
//     appId: "1:870530367064:web:ba041a8b506387a112542d",
//     measurementId: "G-9R8K7VFWW7"
// };

// const app = initializeApp(firebaseConfig);
// export const db = getDatabase(app);s

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBN-9PV5PEOdOxWOqOqmDuGSNcrPocqqK0",
    authDomain: "dev-2-webapp.firebaseapp.com",
    databaseURL: "https://dev-2-webapp-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dev-2-webapp",
    storageBucket: "dev-2-webapp.appspot.com",
    messagingSenderId: "870530367064",
    appId: "1:870530367064:web:ba041a8b506387a112542d",
    measurementId: "G-9R8K7VFWW7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
// export const database = firebase.database();