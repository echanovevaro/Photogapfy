// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, getIdToken  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAitGGq4XjIxJ5Q9aiSSBZRxtUmn6Pzc7E",
  authDomain: "router-query-app.firebaseapp.com",
  projectId: "router-query-app",
  storageBucket: "router-query-app.appspot.com",
  messagingSenderId: "546286485667",
  appId: "1:546286485667:web:927c1aaecce3fce81a7f16",
  databaseURL: "https://[default].eur3.firebaseio.com"
};

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

export const addField = async (collection, field, value) => {
  const batch = db.batch();

  const fieldUpdate = {}
  fieldUpdate[field] = value

  db.collection(collection).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          const docRef = db.collection(collection).doc(doc.id)
          batch.update(docRef, fieldUpdate)
      });

      batch.commit();
  });
}