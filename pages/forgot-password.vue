<template>
  <v-container>
    <v-row>
      <v-col class="d-flex flex-column mx-auto col-9 col-md-6 py-12">
        <!-- User Login Form -->
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
      password: "",
      error: null
    };
  },
  methods: {
    async login() {
      await this.$auth
        .loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(response => {
          this.$auth.setToken("local", "Bearer " + response.data.token);
          this.$router.replace("/");
        })
        .catch(error => console.log(`Login Error: ${error}`));
    },
    async reset() {
      // axios post to user controller
      // user controller sends email if email address exists in users table
      // generated email with link to reset page (token validated?)
      // link goes to password reset page with validator
    }
  }
};
</script>
