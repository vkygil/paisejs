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
      <v-card-title class="text-h6"> Sukhchain Singhx </v-card-title>
      <v-card-title class="text-h4"> {{ total }}€ borrowed </v-card-title>
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
                  :color="transaction.type == 'borrow' ? 'green' : 'red'"
                  text-color="white"
                >
                  {{ transaction.amount }}€
                </v-chip>
                <span>
                  {{
                    transaction.dateObj.toLocaleDateString("en-IN", options)
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
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "@/store/app";
import { useBookStore } from "@/store/app2";
import { storeToRefs } from "pinia";
const route = useRoute();
const id = route.params.id;
const options = { month: "long", day: "numeric" };

// const { person } = useAppStore();
// const { book, person } =useBookStore()
const { book } = storeToRefs(useBookStore());
console.log(book);
const cPerson = book.value.find((t) => t.name == id);
//  let cPerson = person(id);
const transactions = ref([]);
const transactionEditRef = ref(null);

transactions.value = [
  {
    id: "asdfwegjhfk",
    amount: 5,
    type: "lend",
    date: "2022-10-25",
    message: "message 1",
  },
  {
    id: "3g3afwecvnjg",
    amount: 10,
    type: "lend",
    date: "2023-02-21",
    message: "message 2",
  },
  {
    id: "assg3rafwex",
    amount: 2,
    type: "borrow",
    date: "2022-09-25",
  },
  {
    id: "g3gehvcvcxe",
    amount: 3,
    type: "lend",
    date: "2023-06-05",
  },
];

onMounted(() => {
  console.log(id);

  // setTimeout(() => {
  //   console.log("ye");
  //   cPerson.transactions.splice(0, 1);
  // }, 2000);
});
function saveTranaction(t) {
  let tf = cPerson.transactions.findIndex((trans) => trans.id == t.id);
  console.log(tf);
  if (tf > -1) {
    console.log(cPerson.transactions[tf]);
    // cPerson.transactions[tf]=t;
    cPerson.transactions.splice(tf, 1, t);
  } else {
    cPerson.transactions.push(t);
  }
}
function removeTranaction(tId) {
  let tf = cPerson.transactions.findIndex((trans) => trans.id == tId);
  if (tf > 0) {
    // cPerson.transactions.splice(tf, 1);
    cPerson.transactions[tf] = 1;
  }
}
function openTransactionModal(t) {
  transactionEditRef.value.dialog = true;
  transactionEditRef.value.open(t);
}
const transactionsComputed = computed(() => {
  return cPerson.transactions
    .sort((a, b) => b.date.localeCompare(a.date)) //dates
    .reduce((sum, t) => {
      t.dateObj = new Date(t.date);
      let year = t.dateObj.getFullYear();
      sum[year] = [...(sum[year] || []), t];
      return sum;
    }, {});
});

const total = computed(() => {
  return cPerson.transactions.reduce(
    (s, t) => (s += t.type == "lend" ? -Number(t.amount) : Number(t.amount)),
    0
  );
});

watch(total, (currentValue) => {
  cPerson.total = currentValue;
});
</script>
<style>
</style>