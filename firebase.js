// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAejNhTxIKa7Rb_T7hFzA7WS8fiEIKl3F4',
  authDomain: 'atocha-c5fca.firebaseapp.com',
  projectId: 'atocha-c5fca',
  storageBucket: 'atocha-c5fca.appspot.com',
  messagingSenderId: '984464714627',
  appId: '1:984464714627:web:dabeb9e4b91809d16e24b6',
  measurementId: 'G-LL6P26GZQ8',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { db, auth, provider }
