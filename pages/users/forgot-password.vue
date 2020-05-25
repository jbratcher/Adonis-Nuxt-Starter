<template>
  <v-container>
    <v-row>
      <v-col class="d-flex flex-column mx-auto col-9 col-md-6 py-12">
        <!-- Forgot Password Form -->
        <h1 :class="$breakpoint.mdAndUp ? 'display-1' : 'headline'">
          Forgot Password
        </h1>
        <p class="body-2" :class="$breakpoint.mdAndUp ? 'mb-12' : 'mb-9'">
          Enter your email and we will send you a password reset link
        </p>

        <v-text-field v-model="email" label="Email" placeholder="Email" />
        <v-alert :value="Boolean(error)" type="error">{{ error }}</v-alert>
        <v-btn @click="reset" dark width="fit-content">
          <v-icon class="mr-3">{{ forgotIcon }}</v-icon
          >Send email
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { mdiLockQuestion } from "@mdi/js";
export default {
  data() {
    return {
      forgotIcon: mdiLockQuestion,
      email: "",
      error: null
    };
  },
  methods: {
    ...mapActions(["forgotPasswordLink"]),
    async reset() {
      this.forgotPasswordLink(this.email);
    }
  }
};
</script>
