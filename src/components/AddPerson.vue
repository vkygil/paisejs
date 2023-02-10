<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add person</span>
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
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="savePerson">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useBookStore } from "@/store/app2";
const { locale } = useI18n();
const store = useBookStore();
const addPerson = store.addPerson;

let dialog = ref(true);
let formData = reactive({
  name: "",
  tel: "",
});
onMounted(() => {});
function savePerson() {
  addPerson(formData);
}
async function selectContact() {
  const props = ["name", "tel"];
  const opts = { multiple: false };
  try {
    const contacts = await navigator.contacts.select(props, opts);
    data.name = contacts.name[0];
    data.tel = contacts.tel[0];
  } catch (ex) {
    alert("tu navegador no deja elejirt contactos\n" + ex);
    // Handle any errors here.
  }
}
</script> 