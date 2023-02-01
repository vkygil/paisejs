<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="444">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add transaction</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <div class="d-flex">
                  <v-spacer></v-spacer>
                  <v-btn-toggle
                    v-model="transaction.type"
                    rounded="0"
                    :color="transaction.type == 'borrow' ? 'green' : 'red'"
                    group
                  >
                    <v-btn
                      prepend-icon="mdi-arrow-down-bold"
                      value="borrow"
                      @click="transaction.type = 'borrow'"
                    >
                      Take
                    </v-btn>
                    <v-btn
                      value="lend"
                      prepend-icon="mdi-arrow-up-bold"
                      @click="transaction.type = 'lend'"
                    >
                      Give
                    </v-btn>
                  </v-btn-toggle>
                  <v-spacer></v-spacer>
                </div>

                <v-text-field
                  v-model="transaction.amount"
                  label="Amount"
                  suffix="€" 
                  min="0"
                  inputmode="decimal" 
                  :hide-details="amountError"
                  :error-messages="amountError?'':'Please write the amount correctly'"
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
import { reactive, ref, defineEmits ,computed} from "vue";

const emit = defineEmits(["save", "remove"]);

const dialog = ref(false);
const transaction = reactive({
  id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(),
  amount: 0,
  date: "2023-12-21",
  message: "",
  type: "borrow",
});

const amountError = computed(()=>{
  return /^(?!0*[.,]?0+$)\d*[.,]?\d+$/.test(transaction.amount) 
})

const save = () => { 
  transaction.amount = transaction.amount.replace(",",".")
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