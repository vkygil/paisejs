// Utilities
import { defineStore } from 'pinia'
import { auth } from '../firebase'
import { sendSignInLinkToEmail } from "@firebase/auth";
const actionCodeSettings = {

  url: 'http://localhost:3000/coming-from-email', // URL must be in the authorized domains list in the Firebase Console.  
  // This must be true.
  handleCodeInApp: true,
  // dynamicLinkDomain: 'http://localhost:3000'
};

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || { accessToken: null, mode: "offline" },
    returnUrl: null
  }),
  actions: {
    async login(email) {
      sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => window.localStorage.setItem('emailForSignIn', email))
        .catch((error) => console.log(error))
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
      router.push('/account/login');
    }
  },
})
