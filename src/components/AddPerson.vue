<template> 
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" variant="text" icon="mdi-account-plus"></v-btn>
        <!-- <v-btn color="primary" v-bind="props"> Open Dialog </v-btn> -->
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add personx</span>
        </v-card-title>
        <v-card-text>
          <!-- <v-container> -->
          <!-- <a href="App-Prefs://prefs:root=SAFARI&path=ADVANCED"
            >the Location Services</a
          > -->

          <v-col cols="12" sm="6" md="4">
            <div class="d-flex align-center">
              <v-spacer></v-spacer>
              <v-btn
                prepend-icon="mdi-contacts"
                variant="outlined"
                @click="selectContact"
              >
                Select from contacts list
                <!-- Elejir de la lista de contactos -->
              </v-btn>
              <v-spacer></v-spacer>
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <div class="d-flex align-center">
              <v-divider></v-divider>
              <p class="px-3">or</p>
              <v-divider></v-divider>
            </div>
          </v-col>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                append-inner-icon="mdi-account"
                label="Name"
                required
                v-model="formData.name"
              ></v-text-field>

              <v-text-field
                append-inner-icon="mdi-phone"
                label="Phone nº (optional)"
                v-model="formData.tel"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- </v-container> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="testt">
            test
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="savePerson">
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> 
  <v-snackbar v-model="snackbar.state">
    {{ snackbar.text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="snackbar.state = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useBookStore } from "@/store/app2";
const { locale } = useI18n();
const store = useBookStore();
const addPerson = store.addPerson;

let snackbar = reactive({
  state: true,
  text: "Hello!",
});
let dialog = ref(false);
let formData = reactive({
  name: "",
  tel: "",
});
onMounted(() => {});

function testt(){
  const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test( userAgent );
  }
  // Detects if device is in standalone mode
  const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

  // Checks if should display install popup notification:
  if (isIos() && !isInStandaloneMode()) {
    this.setState({ showInstallMessage: true });
  }
}

function savePerson() {
  if (formData.name !== "") {
    addPerson(formData);
    dialog.value = false;
    formData.name = "";
    formData.tel = "";
  } else {
    alert("Put the data correctly");
  }
}
async function selectContact() {
  const props = ["name", "tel"];
  const opts = { multiple: false };
  try {
    const contacts = await navigator.contacts.select(props, opts);

    formData.name = contacts[0].name[0];
    formData.tel = contacts[0].tel[0];
  } catch (ex) {
    snackbar.state = true;
    snackbar.text = "tu navegador no deja elejirt contactos\n" + ex;
    // alert("tu navegador no deja elejirt contactos\n" + ex);
    // Handle any errors here.
  }
}
</script>
