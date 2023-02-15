<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="444">
      <v-card>
        <div class="d-flex">
          <v-spacer></v-spacer>

          <v-card-title> 
            <span class="text-h5"> {{ $t("Add transaction") }}</span>
          </v-card-title>
          <v-spacer></v-spacer>

        </div>
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
                      {{ $t("Take") }}
                    </v-btn>
                    <v-btn
                      value="lend"
                      prepend-icon="mdi-arrow-up-bold"
                      @click="transaction.type = 'lend'"
                    >
                      {{ $t("Give") }}
                    </v-btn>
                  </v-btn-toggle>
                  <v-spacer></v-spacer>
                </div>

                <v-text-field
                  v-model="transaction.amount"
                  :label="$t('Amount')"
                  type="number"
                  suffix="€"
                  min="0"
                  inputmode="decimal"
                  :hide-details="amountError"
                  :error-messages="
                    amountError ? '' : $t('Please write the amount correctly')
                  "
                ></v-text-field>
                <v-divider></v-divider>
                <v-text-field
                  v-model="transaction.date"
                  type="date"
                  :label="$t('Date')"
                  hide-details
                ></v-text-field>
                <v-divider></v-divider>
                <v-textarea
                  v-model="transaction.message"
                  :label="$t('Message')"
                  maxlength="220"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="!isNew" color="red-darken-1" variant="text" @click="remove">
            {{ $t("Delete") }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            {{ $t("Close") }}
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="save">
            {{ $t("Save") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup>
import { reactive, ref, defineEmits, computed } from "vue";

const emit = defineEmits(["save", "remove"]);

const dialog = ref(false);

const isNew = ref(false)

const transaction = reactive({
  id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(),
  amount: 0,
  date: "2023-12-21",
  message: "",
  type: "borrow",
});

const amountError = computed(() => {
  return /^(?!0*[.,]?0+$)\d*[.,]?\d+$/.test(transaction.amount);
});

const save = () => {
  transaction.amount = transaction.amount.replace(",", ".");
  transaction.amount = Number(transaction.amount).toString()
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
  isNew.value = !t
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