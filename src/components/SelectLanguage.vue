<template>
  <v-dialog v-model="dialog" scrollable>
    <template v-slot:activator="{ props }">
      <v-list-item link v-bind="props">
        <template v-slot:prepend>
          <v-icon icon="mdi-translate"></v-icon>
        </template>
        <v-list-item-title>{{ $t("Language") }} </v-list-item-title>
      </v-list-item>
    </template>
    <v-card>
      <v-card-title>Select Country</v-card-title>
      <v-divider></v-divider>
      <v-card-text stylex="height: 300px">
        <v-radio-group v-model="$i18n.locale" column>
          <v-radio label="English" value="en">
            <template v-slot:label>
              <div>
                <v-icon>
                  <v-img src="https://flagsapi.com/US/flat/64.png"></v-img
                ></v-icon>
                English
              </div>
            </template>
          </v-radio>
          <v-radio label="Español" value="es">
            <template v-slot:label>
              <div>
                <v-icon>
                  <v-img src="https://flagsapi.com/ES/flat/64.png"></v-img
                ></v-icon>
                Español
              </div>
            </template>
          </v-radio>
          <v-radio label="Catalan" value="cat">
            <template v-slot:label>
              <div>
                <v-icon>
                  <v-img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Estelada_blava.svg/1920px-Estelada_blava.svg.png"
                  ></v-img
                ></v-icon>
                Catalan
              </div>
            </template>
          </v-radio>
          <v-radio label="Punjabi" value="pun">
            <template v-slot:label>
              <div>
                <v-icon>
                  <v-img
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Nishan_Sahib.svg"
                  ></v-img
                ></v-icon>
                Punjabi
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
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
let dialog = ref(false);
onMounted(() => {
  let localStorageData = JSON.parse(localStorage.getItem("paisejs_pref"));
  locale.value = localStorageData?.language || "en";
});

watch(locale, () => {
  let localStorageData = JSON.parse(localStorage.getItem("paisejs_pref")) || {};
  localStorageData.language = locale.value;
  localStorage.setItem("paisejs_pref", JSON.stringify(localStorageData));
});
</script>