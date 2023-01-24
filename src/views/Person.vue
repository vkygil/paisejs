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
      <v-card-title class="text-h4"> 2,120€ borrowed </v-card-title>
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
        <template v-for="(group, year) in transactionsComputed" :key="year">
          <v-list-subheader>{{ year }}</v-list-subheader>
          <template v-for="transaction in group" :key="transaction.id">
            <v-list-item>
              <div class="d-flex justify-space-between">
                <v-chip class="ma-0" color="green" text-color="white">
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
    ></TransactionEdit>
  </v-responsive>
</template>

  
  
<script setup>
import TransactionEdit from "@/components/TransactionEdit.vue";
import { ref, onMounted, computed } from "vue";
const options = { month: "long", day: "numeric" };

const transactions = ref([]);
const transactionsGrouped = ref([]);
const transactionEditRef = ref(null);

transactions.value = [
  {
    id: "asdfwegjhfk",
    amount: 210,
    type: "Lend",
    date: "2022-10-25",
  },
  {
    id: "3g3afwecvnjg",
    amount: 10,
    type: "Lend",
    date: "2023-02-21",
  },
  {
    id: "assg3rafwex",
    amount: 103,
    type: "borrow",
    date: "2022-09-25",
  },
  {
    id: "g3gehvcvcxe",
    amount: 130,
    type: "Lend",
    date: "2023-06-05",
  },
];

onMounted(() => {
  console.log([...transactions.value]);
  // let gg = transactions.value.reduce((sum, t) => {
  //   t.dateObj = new Date(t.date);
  //   let year = t.dateObj.getFullYear();
  //   sum[year] = [...(sum[year] || []), t];
  //   return sum;
  // }, {});
  // transactionsGrouped.value = gg;
  console.log([...transactions.value].sort((a, b) => b.date - a.date));
});

function saveTranaction(t) {
  transactions.value.push(t);
}
function openTransactionModal() {
  transactionEditRef.value.dialog = true;
  // transactionEditRef.value.open();
}
const transactionsComputed = computed(() => {
  return transactions.value
    .sort((a, b) => b.date.localeCompare(a.date)) //dates
    .reduce((sum, t) => {
      t.dateObj = new Date(t.date);
      let year = t.dateObj.getFullYear();
      sum[year] = [...(sum[year] || []), t];
      return sum;
    }, {})
    // .reverse()//years;
});
</script>
<style>
</style>