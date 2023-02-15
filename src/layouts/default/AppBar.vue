<template>
  <v-app-bar prominent>
    <!-- <template v-slot:extension>
     
    </template> -->
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-spacer></v-spacer>

    <v-app-bar-nav-icon
      variant="text"
      icon="mdi-wallet"
      @click="$router.push('/')"
    ></v-app-bar-nav-icon>

    <v-toolbar-title @click="$router.push('/')">Paise</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- <v-btn @click="saveBook" variant="text" icon="mdi-content-save-all"></v-btn> -->
    <!-- <v-btn @click="addPerson" variant="text" icon="mdi-account-plus"></v-btn> -->
    <AddPerson></AddPerson>
    <!-- <v-btn variant="text" icon="mdi-filter"></v-btn>
      <v-btn variant="text" icon="mdi-dots-vertical"></v-btn> -->
  </v-app-bar>
  <v-navigation-drawer v-model="drawer"  :touchless="route.path!='/'"  >
    <!-- <v-sheet color="grey-lighten-4" class="pa-4">
      <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>
      <div>Me</div>
    </v-sheet> -->

    <v-divider></v-divider>

    <v-list>
      <!-- <v-list-item>
        <div class="d-flex justify-space-between"> 
    <v-btn icon="mdi-translate" variant="flat"></v-btn>
    <v-btn icon="mdi-heart" variant="tonal"></v-btn>
    <v-btn icon="mdi-heart" variant="outlined"></v-btn>
    <v-btn icon="mdi-heart" variant="text"></v-btn>
    <v-btn icon="mdi-heart" variant="plain"></v-btn>
  </div>
      </v-list-item> -->
      <v-list-item>
        <v-btn-toggle disabled v-model="dataSavePreference" borderless>
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

      <v-list-item disabled link>
        <template v-slot:prepend>
          <v-icon icon="mdi-export"></v-icon>
        </template>
        <v-list-item-title> {{ $t("Export data") }}</v-list-item-title>
      </v-list-item>
      <SelectLanguage />
      <v-list-item
        link
        onclick='localStorage.removeItem("paisejs");location.reload()'
      >
        <template v-slot:prepend>
          <v-icon color="red" icon="mdi-delete-alert"></v-icon>
        </template>
        <v-list-item-title> {{ $t("Clear data") }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import SelectLanguage from "../../components/SelectLanguage.vue";
import AddPerson from "../../components/AddPerson.vue";
import { useRoute } from 'vue-router';

import { ref } from "vue";
import { useBookStore } from "@/store/app2";
const store = useBookStore();
const route = useRoute()
console.log(route.value );
const addPerson = store.addPerson;
const saveBook = store.saveBook;
const drawer = ref(false);
const dataSavePreference = ref("offline");
</script>
<style>
.creamyBack {
  background: linear-gradient(45deg, #d5cea3, #e5e5cb);
}
</style>