<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add transaction</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-btn-toggle
                  v-model="transaction.type"
                  rounded="0"
                  :color="transaction.type=='borrow'?'green':'red'"
                  group
                >
                  <v-btn value="borrow" @click="transaction.type='borrow'"> Borrow </v-btn> 
                  <v-btn value="lend"  @click="transaction.type='lend'"> Lend </v-btn>
                </v-btn-toggle>

                <v-text-field
                  v-model="transaction.amount"
                  label="Amount"
                  suffix="€"
                  type="number"
                  hide-details
                ></v-text-field>
                <v-divider></v-divider>
                <v-text-field
                  v-model="transaction.date"
                  type="date"
                  label="Date"
                  hide-details
                ></v-text-field>
                <v-divider></v-divider>
                <v-textarea
                  v-model="transaction.message"
                  label="Message"
                  maxlength="220"
                ></v-textarea>
              </v-col>
              <!-- <v-col cols="12" sm="6">
             
              </v-col>
              <v-col cols="12" sm="6">
             
              </v-col> -->
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red-darken-1" variant="text" @click="remove">
            Delete
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup>
import { reactive, ref, defineEmits } from "vue";

const emit = defineEmits(["save", "remove"]);

const dialog = ref(false);
const transaction = reactive({
  id: crypto.randomUUID(),
  amount: 0,
  date: "2023-12-21",
  message: "",
  type: "borrow",
});

const save = () => {
  dialog.value = false;
  emit("save", { ...transaction });
};
const open = (t) => {
  dialog.value = true;
  // console.log({...t});
  console.log(t);
  if (t) {
    Object.assign(transaction, { ...t });
  } else {
    Object.assign(transaction, {
      id: crypto.randomUUID(),
      amount: 0,
      date: new Date().toISOString().substring(0, 10),
      message: "",
      type: "borrow",
    });
  }
};
const remove = () => {
  dialog.value = false;
  emit("remove", transaction.id);
};
defineExpose({
  open,
  dialog,
});
</script>