<template>
  <v-app id="inspire">
    <v-main v-if="book.length">
      <v-card class="mx-auto" color="transparent" max-width="400" flat>
        <v-card theme="light" class="ma-4 creamyBack pa-1" max-width="400" dark>
          <div class="d-flex mb-2">
            <v-spacer></v-spacer>
            <v-icon icon="mdi-account-cash"></v-icon>
            <span class="ml-2"> {{ $t("Total accounts") }} </span>
            <v-spacer></v-spacer>
          </div>
          <div class="d-flex">
            <v-spacer></v-spacer>
            <v-btn
              colorx="#5dbb5a"
              color="rgb(9 108 5)"
              variant="tonal"
              rounded="pill"
              size="small"
              >{{ $t("I owe them") }}
              {{ filteredBook.postive.reduce(fbReducer, 0).toFixed(2) }}€
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              colorx="#ffeb3b"
              color="rgb(125 8 8)"
              variant="tonal"
              rounded="pill"
              size="small"
              >{{ $t("They owe me") }}
              {{ filteredBook.negative.reduce(fbReducer, 0).toFixed(2) }}€
            </v-btn>
            <v-spacer></v-spacer>
          </div>
        </v-card>
      </v-card>
      <v-card class="mx-auto" color="transparent" max-width="400" flat>
        <v-card-text>
          <v-text-field
            density="compact"
            variant="solo"
            :label="$t('Search people')"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            v-model="filter"
          ></v-text-field>
        </v-card-text>
      </v-card>
      <v-container class="py-8 px-5" fluid>
        <v-row>
          <v-col cols="12" v-if="filteredBook.postive.length">
            <v-card>
              <v-list lines="two">
                <v-list-subheader>{{
                  $t("You owe money to these people")
                }}</v-list-subheader>
                <template v-for="t in filteredBook.postive" :key="t.name">
                  <v-divider></v-divider>
                  <v-list-item :to="'/person/' + t.name">
                    <v-list-item-title> {{ t.name }}</v-list-item-title>
                    <v-list-item-subtitle class="text-success">
                      <strong> {{ t.total.toFixed(0) }}€ </strong>
                    </v-list-item-subtitle>
                  </v-list-item>
                  <!-- <v-divider
                    v-if="i < filteredBook.negative.length - 1"
                  ></v-divider> -->
                </template>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" v-if="filteredBook.negative.length">
            <v-card>
              <v-list lines="two">
                <v-list-subheader>{{
                  $t("These people owe money to you")
                }}</v-list-subheader>
                <template v-for="t in filteredBook.negative" :key="t.name">
                  <v-divider></v-divider>

                  <v-list-item :to="'/person/' + t.name">
                    <v-list-item-title> {{ t.name }}</v-list-item-title>
                    <v-list-item-subtitle class="">
                      <v-chip class="ma-2" color=" " variant="outlined">
                        {{ Math.abs(t.total).toFixed(0) }}€
                      </v-chip>

                      <!-- <strong> {{  Math.abs(t.total).toFixed(0) }}€ </strong> -->
                    </v-list-item-subtitle>
                  </v-list-item>
                  <!-- <v-divider
                    v-if="i < filteredBook.negative.length - 1"
                  ></v-divider> -->
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-main v-if="book.length == 0">
      <div class="d-flex">
        <v-spacer></v-spacer
        ><v-img src="../assets/arrow.svg" width="20"> </v-img>
      </div>
      <div class="d-flex justify-center">
        <p class="text-h6">Click here to add new person</p>
      </div>
    </v-main>
  </v-app>
</template>
  
<script setup>
import { reactive, ref, computed, watch, onMounted } from "vue";
import { useBookStore } from "@/store/app2";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
const book = storeToRefs(useBookStore()).book;

let useBookStorex = useUserStore();

onMounted(async () => {
  console.log(useBookStorex);
  window.login = useBookStorex.login;
  // theme.global.name.value = "light"
  // const props = ['name', 'email', 'tel', 'address', 'icon'];
  // const opts = {multiple: false};
  // try {
  //   const contacts = await navigator.contacts.select(props, opts);
  //   handleResults(contacts);
  // } catch (ex) {
  //   // Handle any errors here.
  // }
});
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
const fbReducer = (a, b) => b.total + a;
</script>

<style>
.creamyBack {
  display: flex;
  flex-direction: column;
  background: rgb(var(--v-theme-cream)) !important;
  /* background: linear-gradient(45deg, #d5cea3, #e5e5cb) !important; */
}
.text-secondary-1 {
  color: rgb(var(--v-theme-text-secondary-1)) !important;
}
</style>