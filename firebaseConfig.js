import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQWYzixavQ9-7Y_zU_BrlmEJrLPdSrR1Q",
  authDomain: "expo-post-app-auth.firebaseapp.com",
  databaseURL:
    "https://expo-post-app-auth-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "expo-post-app-auth",
  storageBucket: "expo-post-app-auth.appspot.com",
  messagingSenderId: "305466294875",
  appId: "1:305466294875:web:e2db4bff4b75bbcccc357e"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
