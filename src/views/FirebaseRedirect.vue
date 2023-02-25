<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card class="mx-auto mt-10" max-width="368">
          <v-card-item title="Your pin code">
            <template v-slot:subtitle>
              <v-icon
                icon="mdi-alert"
                size="18"
                color="error"
                class="me-1 pb-1"
              ></v-icon>
              please dont share it with anyone
            </template>
          </v-card-item>

          <v-card-text class="py-0">
            <v-row align="center" no-gutters>
              <v-col class="text-h2" cols="6"> {{ pin }} </v-col>

              <v-col cols="6" class="text-right">
                <v-icon
                  color="success"
                  icon="mdi-message-processing"
                  size="88"
                ></v-icon>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
import { ref, onMounted } from "vue";

import { auth } from "../firebase";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

let pin = ref("");

onMounted(() => {
  console.log(window.location.href);

  fetch("https://paise.onrender.com/generatePIN", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ token: result.user.accessToken }),
    body: JSON.stringify({ href: window.location.href }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      pin.value = data.pin;
    });
  return;
  signInWithEmailLink(auth, "husnat9.9@gmail.com", window.location.href)
    .then((result) => {
      // Clear email from storage.
      window.localStorage.removeItem("emailForSignIn");
      console.log(result);
      console.log(result.user);

      fetch("http://localhost:3001/generatePIN", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ token: result.user.accessToken }),
        body: JSON.stringify({ token: result.user.accessToken }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          pin.value = data.pin;
        });

      // You can access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is new or existing:
      // result.additionalUserInfo.isNewUser
    })
    .catch((error) => {
      console.log(error);
      pin.value = "error";
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
    });
});
</script>