<template>
  <v-app id="inspire">
    <v-main>
      <v-card class="mx-auto" color="transparent" max-width="400">
        <v-card-text>
          <v-text-field
            density="compact"
            variant="solo"
            label="Search people"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            v-model="filter"
          ></v-text-field>
        </v-card-text>
      </v-card>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-list lines="two">
                <v-list-subheader>{{ "I owe them" }}</v-list-subheader>
                <template v-for="t in filteredBook.postive" :key="t.name">
                  <v-list-item :to="'/person/' + t.name">
                    <v-list-item-title> {{ t.name }}</v-list-item-title>
                    <v-list-item-subtitle class="text-green-lighten-1">
                      <strong> {{ t.total }}€ </strong>
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-divider></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-list lines="two">
                <v-list-subheader>{{ "They owe me" }}</v-list-subheader>
                <template v-for="t in filteredBook.negative" :key="t.name">
                  <v-list-item :to="'/person/' + t.name">
                    <v-list-item-title> {{ t.name }}</v-list-item-title>
                    <v-list-item-subtitle class="text-yellow-lighten-1">
                      <strong> {{ t.total }}€ </strong>
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-divider></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
  
<script setup>
import { reactive, ref, computed, watch } from "vue";
import { useBookStore } from "@/store/app2";
import { storeToRefs } from "pinia";
const book = storeToRefs(useBookStore()).book;

let filter = ref("");
const filteredBook = computed(() => {
  let fbook = book.value.filter((x) =>
    x.name.toLowerCase().includes(filter.value.toLowerCase())
  );
  return {
    postive: fbook.filter((x) => x.total >= 0),
    negative: fbook.filter((x) => x.total < 0),
  };
});
</script>