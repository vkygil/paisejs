<template>
  <v-app-bar prominent>
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="drawer = !drawer"
      icon="mdi-wallet"
      @click="$router.push('/')"
    ></v-app-bar-nav-icon>

    <v-toolbar-title   @click="$router.push('/')">Paise</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn @click="addPerson" variant="text" icon="mdi-magnify"></v-btn>

    <!-- <v-btn variant="text" icon="mdi-filter"></v-btn>
      <v-btn variant="text" icon="mdi-dots-vertical"></v-btn> -->
  </v-app-bar>
  <!-- <v-navigation-drawer v-model="drawer">
    <v-sheet color="grey-lighten-4" class="pa-4">
      <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>
      <div>Vciky</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item link>
        <template v-slot:prepend>
          <v-icon>{{ "icon" }}</v-icon>
        </template>
        <v-list-item-title>{{ "text" }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer> -->
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useBookStore  } from "@/store/app2";
const addPerson   = useBookStore().addPerson;

let drawer = false;
 
</script>
