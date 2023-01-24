<template>
  <br />
  <br />
  <v-responsive class="mx-auto" max-width="444">
    <v-text-field
      label="Name"
      value="asd"
      variant="solo"
      placeholder="Name"
    ></v-text-field>

    <v-card color="green" class="ma-4 pa-2" dark>
      <v-card-title class="text-h5"> Total: +2,120€  </v-card-title>
    </v-card>
    <v-card class="ma-2 pa-2">
      <v-toolbar>
        <v-toolbar-title>Transactions</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn variant="text" icon="mdi-plus"></v-btn>
      </v-toolbar>
      <v-list>
        <v-card class="my-1">
          <v-list-item>
            <div class="d-flex justify-space-between">
              <span>-10$</span>
              <span>25/20/2000</span>
            </div>
            <span> Gello there lo there lo there lo there lo there </span>
          </v-list-item>
        </v-card>
        <v-card class="my-1">
          <v-list-item>
            <div class="d-flex justify-space-between">
              <span>-10$</span>
              <span>25/20/2000</span>
            </div>
            <span> Gello there lo there lo there lo there lo there </span>
          </v-list-item>
        </v-card>
      </v-list>
    </v-card>

    <!-- <v-form>
      <v-card class="mx-auto" color="transparent" max-width="344">
        <v-label>Add transaction</v-label>
        <v-text-field
          label="Amount"
          model-value="10.00"
          suffix="€"
          hide-details
        ></v-text-field>
        <v-divider></v-divider>
        <v-text-field type="date" label="Label" hide-details></v-text-field>
        <v-divider></v-divider>
        <v-textarea
          v-model="title"
          label="Message"
          maxlength="220"
        ></v-textarea>
        <div
          class="d-flex justify-center align-baseline mb-4"
          style="gap: 1rem"
        >
          <v-btn> Add </v-btn>
        </div>
      </v-card>
    </v-form> -->
    <TransactionEdit></TransactionEdit>
  </v-responsive>
</template>

  
  
<script>
import TransactionEdit from "@/components/TransactionEdit.vue";

export default {
  components: { TransactionEdit },
  data: () => ({
    items: ["Trevor Handsen", "Alex Nelson"],
    selected: ["Trevor Handsen"],
    subject: "Plans for the weekend",
    title:
      "Hi,\nI just wanted to check in and see if you had any plans the upcoming weekend. We are thinking of heading up to Napa",
  }),
};
</script>
<style>
</style>