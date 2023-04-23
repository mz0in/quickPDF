// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBIbeXm8jJu47tuBj2ubDzjLlLgAmtD07s',
  authDomain: 'quickpdf-codenanshu.firebaseapp.com',
  projectId: 'quickpdf-codenanshu',
  storageBucket: 'quickpdf-codenanshu.appspot.com',
  messagingSenderId: '850601055346',
  appId: '1:850601055346:web:4e6f4bf23a0793de55deeb',
  measurementId: 'G-9CY5DWB7B6'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const fireStore = getFirestore(app)
export const storage = getStorage(app)
