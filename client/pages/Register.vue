<template>
  <v-container>
    <v-row>
      <v-col class="d-flex flex-column mx-auto col-8 col-md-5 py-12">
        <!-- User Sign Up Form -->
        <v-card class="pa-6" elevation="6">
          <v-card-title
            :class="{
              'headline mb-6': $breakpoint.mdAndUp,
              'title mb-4': $breakpoint.smAndDown
            }"
          >
            Sign up for an account
          </v-card-title>

          <v-card-text class="pb-0">
            <v-form v-model="valid" lazy-validation>
              <v-text-field
                v-model="newUser.first_name"
                label="First Name"
                :rules="shortTextRules"
                outlined
              />
              <v-text-field
                v-model="newUser.last_name"
                label="Last Name"
                :rules="shortTextRules"
                outlined
              />
              <v-text-field
                v-model="newUser.email"
                label="Email"
                :rules="emailRules"
                outlined
              />
              <v-text-field
                v-model="newUser.password"
                label="Password"
                :rules="shortTextRules"
                outlined
                type="password"
                autocomplete="new-password"
              />
              <v-text-field
                v-model="newUser.password_confirmation"
                label="Confirm Password"
                :rules="shortTextRules"
                outlined
                type="password"
                autocomplete="new-password"
              />
            </v-form>
          </v-card-text>

          <v-card-actions class="pt-0 px-4">
            <v-btn @click="register" dark width="fit-content">
              <v-icon class="mr-3">{{ accountPlusIcon }}</v-icon
              >Register
            </v-btn>
            <v-btn class="caption my-6 ml-auto px-0" to="/login" text
              >Already Registered?</v-btn
            >
          </v-card-actions>
        </v-card>
        <v-alert
          border="left"
          close-text="Close"
          dark
          dismissible
          :value="Boolean(errorMessage)"
          type="error"
          >{{ errorMessage }}</v-alert
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
import { mdiAccountPlus } from "@mdi/js";
import formRulesMixin from "../mixins/formRulesMixin";
export default {
  mixins: [formRulesMixin],
  data: () => ({
    accountPlusIcon: mdiAccountPlus,
    newUser: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: ""
    },
    errorMessage: "",
    valid: true
  }),
  methods: {
    async register() {
      await this.$axios
        .post("/auth/register", this.newUser)
        .then(response => {
          this.login();
          this.$toast
            .info(
              `Thanks for registering! You will receive a confirmation email shortly at ${this.newUser.email}`
            )
            .goAway(6000);
        })
        .catch(error => {
          this.$toast.error(`Login error: ${error.response}`).goAway(5000);
        });
    },
    async login() {
      await this.$auth
        .loginWith("local", {
          data: {
            uid: this.newUser.email,
            password: this.newUser.password
          }
        })
        .then(response => {
          this.$auth.setToken("local", "Bearer " + response.data.token);
          this.$router.replace("/");
          this.$toast.success(`Welcome, ${this.newUser.email}`).goAway(3000);
        })
        .catch(error => {
          this.$toast.error(`Login error: ${error.response}`).goAway(5000);
        });
    }
  }
};
</script>
