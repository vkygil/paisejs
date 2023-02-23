// Utilities
import { storeToRefs } from "pinia";
import { defineStore } from 'pinia'
import { auth, onAuthStateChanged } from '../firebase'
import { sendSignInLinkToEmail } from "@firebase/auth";
import { reactive, watch, onMounted } from "vue";
import { useBookStore } from "@/store/app2";

const updateBook =   useBookStore().updateBook;

const actionCodeSettings = {
  url: 'http://localhost:3000/coming-from-email', // URL must be in the authorized domains list in the Firebase Console.   
  handleCodeInApp: true,  // This must be true.
  // dynamicLinkDomain: 'http://localhost:3000'
};

export const useUserStore = defineStore('user', () => {
  const user = reactive({
    accessToken: "default",
    mode: "offline",
    ... (JSON.parse(localStorage.getItem('user')) || { accessToken: null, mode: "offline", email: "" })
  })
  watch(user, () => {
    console.log("saved user");
    localStorage.setItem("user", JSON.stringify(user));
  },
    { deep: true }
  );

  auth.onAuthStateChanged(async (userX) => {
    if (userX && user.mode == "online") {
      user.accessToken = userX.accessToken;
      user.email = userX.email;
      localStorage.setItem("accessToken", userX.accessToken);

      let book = await getBook(userX.accessToken)

    } else {
      localStorage.removeItem("accessToken");
    }
  })

  let getBook = async (token) => {
    return await fetch("http://localhost:3001/api/getbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    })
      .then((response) => response.json())
      .then((data) => { 
        console.log(data.data.book);
        updateBook (data.data.book)
        // book.value.push(data.data.book[0] )
        return data.data 
      });
  } 
  let login = async (email) => {
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => window.localStorage.setItem('emailForSignIn', email))
      .catch((error) => console.log(error))
  }
  let getToken = async () => {
    auth.currentUser.accessToken
  }
  let setToken = async () => {
    localStorage.setItem("accessToken", auth.currentUser.accessToken);
  }
  let logout = async (email) => {
    user.accessToken = null;
    user.mode = "offline";
    user.email = "";
    localStorage.removeItem('user');
    auth.signOut()
  }

  return { user, login, logout };

})
