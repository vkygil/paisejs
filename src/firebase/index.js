import { initializeApp } from "firebase/app"
import { getAuth,onAuthStateChanged  } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDCiJ4uybuR9BKBBZ-amd-6p1rM3R46-wY",
    authDomain: "paisejs.firebaseapp.com",
    projectId: "paisejs",
    storageBucket: "paisejs.appspot.com",
    messagingSenderId: "220422253980",
    appId: "1:220422253980:web:d82161833cd9495e166c59"
};
const firebaseConfig2 = {
    apiKey: "AIzaSyD8yp0RkIfm3-Cc4DbQrGwaCip8mkcQR4c",
    authDomain: "paisejs2.firebaseapp.com",
    projectId: "paisejs2",
    storageBucket: "paisejs2.appspot.com",
    messagingSenderId: "136567424566",
    appId: "1:136567424566:web:5409489c0b8c4c3505ba97"
  };
const app = initializeApp(firebaseConfig) 
const auth = getAuth(app)
window.authx= auth
export { auth ,onAuthStateChanged}