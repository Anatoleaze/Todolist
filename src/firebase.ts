import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAPIOI02BV_cIFN3P4zFT7ROzXPKhY9KgM",
  authDomain: "my-todolist-app-6017f.firebaseapp.com",
  projectId: "my-todolist-app-6017f",
  storageBucket: "my-todolist-app-6017f.appspot.com",
  messagingSenderId: "868360892336",
  appId: "1:868360892336:web:1fdb838c37750623beb075",

}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)