<template>
  <v-dialog
    v-model="dialog"
    scrollable
    transition="scroll-y-reverse-transition"
  >
    <template v-slot:activator="{ props }">
      <v-list-item link v-bind="props">
        <template v-slot:prepend>
          <v-icon icon="mdi-palette-outline"></v-icon>
        </template>
        <v-list-item-title>{{ $t("Theme") }} </v-list-item-title>
      </v-list-item>
    </template>
    <v-card>
      <v-card-title>Select Theme</v-card-title>
      <v-divider></v-divider>
      <v-card-text stylex="height: 300px">
        <v-radio-group v-model="selectedTheme" column>
          <v-radio label="English" value="blueTing" class="my-2">
            <template v-slot:label>
              <div class="d-flex">
                <v-img
                  width="140"
                  aspect-ratio="4"
                  cover
                  src="../assets/palets/blueTing.png"
                ></v-img>
                <span class="pa-2"> Azulie </span>
              </div>
            </template>
          </v-radio>
          <v-radio label="Español" value="brownTing" class="my-2">
            <template v-slot:label>
              <div class="d-flex justify-space-evenly">
                <v-img
                  width="140"
                  aspect-ratio="4"
                  cover
                  src="../assets/palets/brownTing.png"
                ></v-img>
                <span class="pa-2"> Borwnie </span>
              </div>
            </template>
          </v-radio>
          <v-radio label="Español" value="julioTing" class="my-2">
            <template v-slot:label>
              <div class="d-flex justify-space-evenly">
                <v-img
                  width="140"
                  aspect-ratio="4"
                  cover
                  src="../assets/palets/julioTing.png"
                ></v-img>
                <span class="pa-2"> Julioled </span>
              </div>
            </template>
          </v-radio>
        </v-radio-group>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          {{ $t("Close") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { useTheme } from "vuetify";
import { onMounted, ref, watch } from "vue";
const theme = useTheme();
let dialog = ref(false);
let selectedTheme = ref("brownTing");
onMounted(() => {
  selectedTheme.value = theme.global.name.value;
});

watch(selectedTheme, () => {
  theme.global.name.value = selectedTheme.value;
  let localStorageData = JSON.parse(localStorage.getItem("paisejs_pref")) || {};
  localStorageData.theme = selectedTheme.value;
  localStorage.setItem("paisejs_pref", JSON.stringify(localStorageData));
});
</script>