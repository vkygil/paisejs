<template>
  <v-dialog v-model="dialog" max-width="444" persistent>
    <template v-slot:activator="{}">
      <v-list-item
        v-if="user.mode == 'online' && user.email"
        prepend-axvatar="https://cdn.vuetifyjs.com/images/john.png"
        prepend-icon="mdi-account"
        titleX="John Leider"
        :subtitle="user.email"
      >
        <template v-slot:append>
          <!-- <v-btn size="small" variant="text" icon="mdi-menu-down"></v-btn> -->
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                size="small"
                icon="mdi-menu-down"
                variant="text"
                v-bind="props"
              ></v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title @click="useBookStorex.logout">{{
                  "Sign out"
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-list-item>
      <v-list-item>
        <v-btn-toggle v-model="user.mode" borderless mandatory>
          <v-btn value="offline">
            <span>Offline</span>
            <v-icon end> mdi-content-save-all </v-icon>
          </v-btn>
          <v-btn value="online">
            <span>Online</span>
            <v-icon end> mdi-cloud-sync </v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-list-item>
    </template>
    <v-card>
      <div class="d-flex">
        <v-spacer></v-spacer>

        <v-card-title>
          <span class="text-h5">
            {{ "Sync data online" || $t("Add transaction") }}</span
          >
        </v-card-title>
        <v-spacer></v-spacer>
      </div>
      <v-card-text>
        <v-container>
          <v-text-field
            :label="'email'"
            type="email"
            v-model="formData.email"
            :disabled="step == 2"
            :hide-detailsc="false"
            :error-messagesc="'Falta validarlo'"
          ></v-text-field>

          <v-btn
            color="black "
            block
            @click="sendVerificaiton"
            v-show="step != 2"
          >
            Send verification code
          </v-btn>
          <!-- <v-divider></v-divider> -->
          <br />
          <div v-if="step == 2">
            <p class="pb-1">Please enter the link in your email</p>
            <v-row ref="inputX">
              <v-col v-for="(n, i) in 4" :key="n">
                <v-text-field
                  v-model="inputs[i]"
                  hide-details
                  max="1"
                  @focus="inputFocus = i"
                  @input="atInput(i)"
                ></v-text-field>
              </v-col>
              <!-- <v-col>
                  <v-text-field hide-details></v-text-field>
                </v-col> -->
            </v-row>
            <v-btn class="mt-6" color="green " block @click="verifyCode">
              Verify
            </v-btn>
          </div>
        </v-container>
      </v-card-text>
      <v-divider class=""></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="
            dialog = false;
            user.mode = 'offline';
          "
        >
          {{ $t("Close") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="dialog2.model" persistent width="auto">
    <v-card>
      <v-card-title class="text-h5">
        Use Google's location service?
      </v-card-title>
      <v-card-text>Deseas guardar los.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green-darken-1" variant="text" @click="dialog = false">
          Disagree
        </v-btn>
        <v-btn color="green-darken-1" variant="text" @click="dialog = false">
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import { useUserStore } from "@/store/user";
import { auth } from "../../firebase";
import { storeToRefs } from "pinia";

import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

let useBookStorex = useUserStore();
const user = storeToRefs(useBookStorex).user;

let resolveX = {};
window.resolveX = resolveX;

// const dataSavePreference = ref("offline");

const formData = reactive({ email: "husnat.99@gmail.com" });
const dialog = ref(false);
const dialog2 = reactive({ model: false, value: null });
const step = ref(1);
const inputFocus = ref(0);
const inputX = ref(null);
const inputs = reactive({
  0: "",
  1: "",
  2: "",
  3: "",
});

onMounted(() => {
  window.addEventListener("keyup", (event) => {
    const key = event.key; // const {key} = event; ES6+
    if (key === "Backspace") {
      inputs[inputFocus.value] = "";
      moveInput();
    }
  });
});

watch(
  user,
  (val) => {
    // if (val.mode == "online" && !val.accessToken) {
    if (val.mode == "online" && !val.accessToken) {
      dialog.value = true;
      console.log("es omlnie");
    }
    if (val.mode == "online") {
      localStorage.setItem("accessToken", val.accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  },
  { deep: true }
);

let moveInput = (fordward) => {
  if (!inputX.value) return;

  let i = inputFocus.value;
  let focus;
  if (fordward) focus = i == 3 ? 3 : i + 1;
  else focus = i <= 0 ? 0 : i - 1;

  inputX.value.$el.querySelectorAll("input")[focus].focus();
};

let atInput = (i) => {
  if (!inputs[i].length) return;
  if (inputs[i].length > 1) inputs[i] = inputs[i].substr(1, 1);
  moveInput(true);
  if (i == 3) {
    console.log("submit");
  }
};

let sendVerificaiton = () => {
  useBookStorex.login(formData.email); 
  step.value = 2;
};
let verifyCode = () => {
  let code = "" + inputs[0] + inputs[1] + inputs[2] + inputs[3];
  // false &&
    fetch("https://paise.onrender.com/checkPIN/" + code)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.href);
        if (!data.href) {
          alert("Esta mal el cogido");
          return;
        }

        signInWithEmailLink(auth, formData.email, data.href).then((result) => {
          window.localStorage.removeItem("emailForSignIn");
          console.log(result.user);
          // user.accessToken = result.user.accessToken;
          // user.email = result.user.email;
          user.mode = "online";
          step.value = 3;
          dialog.value = false;
          // window.localStorage.setItem("accessToken", result.user.accessToken);
          // window.localStorage.setItem("accessTokenCopy", result.user.accessToken);
        });
      });
};
let openDataChoice = async () => {
  // dialog2.model = true; 
  // await new Promise((resolve) => {
  //   resolveX = resolve;
  // });
  // console.log("yata");
};
</script>
  <style>
</style>