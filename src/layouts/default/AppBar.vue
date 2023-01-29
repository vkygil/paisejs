<template>
  <v-app-bar prominent>
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

    <v-btn @click="addPerson" variant="text" icon="mdi-account-plus"></v-btn>

    <!-- <v-btn variant="text" icon="mdi-filter"></v-btn>
      <v-btn variant="text" icon="mdi-dots-vertical"></v-btn> -->
  </v-app-bar>
  <v-navigation-drawer v-model="drawer">
    <v-sheet color="grey-lighten-4" class="pa-4">
      <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>
      <div>Vciky</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item>
        <v-btn-toggle v-model="dataSavePreference" borderless>
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
      <v-list-item link>
        <template v-slot:prepend>
          <v-icon icon="mdi-export"></v-icon>
        </template>
        <v-list-item-title> Export data</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue"; 
import { useBookStore } from "@/store/app2";
const addPerson = useBookStore().addPerson;

const drawer = ref(false);
const dataSavePreference = ref("offline");
</script>
