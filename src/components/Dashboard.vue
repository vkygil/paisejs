<template>
  <v-app id="inspire">
    <v-main>
      <v-card class="mx-auto" color="transparent" max-width="400">
        <v-card   theme="light" class="ma-4 creamyBack pa-1" max-width="400" dark>
          <div  class="d-flex">
            <v-spacer></v-spacer>
            Total accounts
            <v-spacer></v-spacer>
          </div>
          <div class="d-flex">
            <v-spacer></v-spacer>
            <v-btn colorx="#5dbb5a" color="rgb(9 108 5)" variant="tonal" rounded="pill" size="small"
              >I owe them 2000€
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn colorx="#ffeb3b" color="rgb(125 8 8)" variant="tonal" rounded="pill" size="small">
              They owe me 2000€
            </v-btn>
            <v-spacer></v-spacer>
          </div>
        </v-card>
      </v-card>
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

<style>
.creamyBack {
  display: flex;
  flex-direction: column;
  background: linear-gradient(45deg, #d5cea3, #e5e5cb) !important;
  /* background: #3c2a21; */
}
</style>