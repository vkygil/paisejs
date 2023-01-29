<template>
  <br />
  <v-responsive class="mx-auto" max-width="444">
    <!-- <v-text-field
      label="Name"
      value="asd"
      variant="solo"
      placeholder="Name"
    ></v-text-field> -->

    <v-card color="green" class="ma-4 pa-2" dark>
      <!-- <v-card-title class="text-h6"> {{cPerson.name}}   </v-card-title> -->
      <v-card-title class="blue white--text d-flex">
        <span class="text-h5">{{ cPerson.name }}</span>

        <v-spacer></v-spacer>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              icon="mdi-dots-vertical"
              v-bind="props"
              color="success"
            ></v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, i) in menuItems" :key="i">
              <v-list-item-title @click="menuItemClicked(item.title)">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-text class="text-h4">
        {{ Math.abs(total) }}€ {{ getOweTextByAmount(total) }}
      </v-card-text>
    </v-card>
    <v-card class="ma-2 pa-2" variantZ="tonal">
      <v-toolbar>
        <v-toolbar-title>Transactions</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          variant="text"
          icon="mdi-plus"
          @click="openTransactionModal()"
        ></v-btn>
      </v-toolbar>

      <v-list lines="x">
        <template
          v-for="year in Object.keys(transactionsComputed).reverse()"
          :key="year"
        >
          <v-list-subheader>{{ year }}</v-list-subheader>
          <template
            v-for="transaction in transactionsComputed[year]"
            :key="transaction.id"
          >
            <v-list-item @click="openTransactionModal(transaction)">
              <div class="d-flex justify-space-between">
                <v-chip
                  class="ma-0"
                  :color="transaction.type == 'borrow' ? 'green' : 'yellow'"
                  text-color="white"
                >
                  {{ transaction.amount }}€
                </v-chip>
                <span>
                  {{
                    // transaction.dateObj.toLocaleDateString("en-IN", options)
                    new Date(transaction.date).toLocaleDateString(
                      "en-IN",
                      options
                    )
                  }}</span
                >
              </div>
              <!-- <span> Gello there lo there lo there lo there lo there </span> -->
            </v-list-item>
            <v-divider></v-divider>
          </template>
        </template>
        <!-- <v-divider v-if="n !== 6" :key="`divider- €{n}`" inset></v-divider> -->
        <!-- </template> -->
      </v-list>
    </v-card>

    <TransactionEdit
      ref="transactionEditRef"
      @save="saveTranaction"
      @remove="removeTranaction"
    ></TransactionEdit>
  </v-responsive>
</template> 

<script setup>
import TransactionEdit from "@/components/TransactionEdit.vue";
import { ref, onMounted, computed, watch, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBookStore } from "@/store/app2";
import { storeToRefs } from "pinia";
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const options = { month: "long", day: "numeric" };

// const { person } = useAppStore();
// const { book, person } =useBookStore()
const book = storeToRefs(useBookStore()).book;
// console.log(book);
const cPerson = book.value.find((t) => t.name == id) || {};

//  let cPerson = person(id);
const transactions = ref([]);
const transactionEditRef = ref(null);

onMounted(() => {
  console.log(id);
});

const menuItems = reactive([{ title: "Change Name" }, { title: "Remove" }]);
const menuItemClicked = (i) => {
  if (i == "Change Name") {
    let person = prompt("Please enter your name", "Harry Potter");
    if (person != null) cPerson.name = person;
  }
  if (i == "Remove") {
    let text = "Delete this person?";
    if (confirm(text) == true) {
      const cPersonIndex = book.value.findIndex((t) => t.name == id);
      if (cPersonIndex > -1) {
        book.value.splice(cPersonIndex, 1);
        router.push("/");
      }
    }
  }
};

function checkUser() {
  if (!cPerson || !cPerson.transactions) {
    router.push("/");
    return false;
  }
  return true;
}

function saveTranaction(t) {
  let tf = cPerson.transactions.findIndex((trans) => trans.id == t.id);
  console.log(tf);
  if (tf > -1) {
    console.log(cPerson.transactions[tf]);
    // cPerson.transactions[tf]=t;
    cPerson.transactions.splice(tf, 1, t);
  } else {
    // book.value[0].transactions.push(t);
    cPerson.transactions.push(t);
  }
}
function removeTranaction(tId) {
  let tf = cPerson.transactions.findIndex((trans) => trans.id == tId);
  if (tf > -1) {
    cPerson.transactions.splice(tf, 1);
    // cPerson.transactions[tf] = 1;
  }
}
function openTransactionModal(t) {
  transactionEditRef.value.dialog = true;
  transactionEditRef.value.open(t);
}
const transactionsComputed = computed(() => {
  if (!checkUser()) return -1;
  return cPerson.transactions
    .sort((a, b) => b.date.localeCompare(a.date)) //dates
    .reduce((sum, t) => {
      let dateObj = new Date(t.date);
      let year = dateObj.getFullYear();
      sum[year] = [...(sum[year] || []), t];
      return sum;
    }, {});
});

const total = computed(() => {
  if (!checkUser()) return -1;
  return [...cPerson.transactions].reduce(
    (s, t) => (s += t.type == "lend" ? -Number(t.amount) : Number(t.amount)),
    0
  );
});

watch(total, (currentValue) => {
  cPerson.total = currentValue;
});

// funcitons
const getOweTextByAmount = (t) => {
  switch (true) {
    case t > 0:
      return "to give";
    case t == 0:
      return "";
    case t < 0:
      return "to take";
  }
  return "test";
};
// watch(cPerson, (currentValue) => {
//   console.log("diablo");
// });
</script>
<style>
</style>