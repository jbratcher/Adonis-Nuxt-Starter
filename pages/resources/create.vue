<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>Create a new resource</h1>
        <!-- Event Form -->
        <v-form ref="form">
          <v-text-field
            v-model="name"
            :counter="144"
            class="my-5"
            label="Name"
            required
          />
          <v-text-field
            v-model="quantity"
            class="my-5"
            label="Quantity"
            required
          />

          <!-- Form Actions -->
          <v-btn @click="create" color="primary" class="my-5 elevation-10">
            Submit
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      name: "",
      quantity: null,
      valid: true
    };
  },
  methods: {
    ...mapActions("resource", ["createResource", "resetCreateResourceForm"]),
    create() {
      console.log(`Creating: ${this.name} - ${this.quantity}`);
      this.createResource({ name: this.name, quantity: this.quantity });
      this.resetCreateResourceForm();
    },
    resetCreateResourceForm() {
      this.name = "";
      this.quantity = null;
    }
  }
};
</script>

<style lang="scss">
@media screen and (min-width: 960px) {
  form {
    width: 30vw;
  }
}
</style>
