import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"


const app = firebase.initializeApp({
    apiKey: "AIzaSyC-qitgvJj52FJx_rn4aamwMYHc3ao3RF0",
    authDomain: "mobile-reactnative-tree.firebaseapp.com",
    databaseURL: "https://mobile-reactnative-tree-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mobile-reactnative-tree",
    storageBucket: "mobile-reactnative-tree.appspot.com",
    messagingSenderId: "879902115175",
    appId: "1:879902115175:web:8f516510b0fc418f425bc2",
    measurementId: "G-FXE0TML1JX"
})

export const auth = app.auth()
export const storage = app.storage()
export default app