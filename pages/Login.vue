<template>
  <v-container>
    <v-row>
      <v-col class="d-flex flex-column mx-auto col-9 col-md-6 py-12">
        <!-- User Login Form -->
        <h1
          :class="{
            'display-1 mb-12': $breakpoint.mdAndUp,
            'headline mb-9': $breakpoint.smAndDown
          }"
        >
          Login
        </h1>

        <v-text-field
          v-model="email"
          label="Email"
          placeholder="Email"
          :rules="emailRules"
        />
        <v-text-field
          v-model="password"
          label="Password"
          placeholder="Password"
          :rules="shortTextRules"
          type="password"
          autocomplete="new-password"
        />
        <v-alert
          border="left"
          close-text="Close"
          color="warning"
          dark
          dismissible
          :value="Boolean(loginErrorMessage)"
          type="error"
          >{{ loginErrorMessage }}</v-alert
        >
        <v-btn @click="login" dark width="fit-content">
          <v-icon class="mr-3">{{ loginIcon }}</v-icon
          >Login
        </v-btn>
        <v-btn class="body-2 my-6 mr-auto px-0" to="/users/forgot-password" text
          >Forgot Password?</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
import { mdiLogin } from "@mdi/js";
import formRulesMixin from "../mixins/formRulesMixin";
export default {
  mixins: [formRulesMixin],
  data: () => ({
    loginIcon: mdiLogin,
    email: "",
    password: "",
    loginErrorMessage: ""
  }),
  methods: {
    ...mapMutations(["setLoginSuccessful"]),
    async login() {
      await this.$auth
        .loginWith("local", {
          data: {
            uid: this.email,
            password: this.password
          }
        })
        .then(response => {
          this.$auth.setToken("local", "Bearer " + response.data.token);
          this.$router.replace("/");
          this.setLoginSuccessful(true);
        })
        .catch(error => {
          const errorMessage = error.response.data[0].message;
          this.loginErrorMessage = errorMessage;
          this.setLoginSuccessful(false);
        });
    }
  }
};
</script>
