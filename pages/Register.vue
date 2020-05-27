<template>
  <v-container>
    <v-row>
      <v-col class="d-flex flex-column mx-auto col-9 col-md-6 py-12">
        <!-- User Sign Up Form -->
        <h1
          :class="{
            'display-1 mb-12': $breakpoint.mdAndUp,
            'headline mb-9': $breakpoint.smAndDown
          }"
        >
          Register
        </h1>

        <v-text-field
          v-model="newUser.first_name"
          label="First Name"
          placeholder="First Name"
        />
        <v-text-field
          v-model="newUser.last_name"
          label="Last Name"
          placeholder="Last Name"
        />
        <v-text-field
          v-model="newUser.email"
          label="Email"
          placeholder="Email"
        />
        <v-text-field
          v-model="newUser.password"
          label="Password"
          placeholder="Password"
          type="password"
          autocomplete="new-password"
        />
        <v-text-field
          v-model="newUser.password_confirmation"
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          autocomplete="new-password"
        />
        <v-alert
          border="left"
          close-text="Close"
          dark
          dismissible
          :value="Boolean(errorMessage)"
          type="error"
          >{{ errorMessage }}</v-alert
        >
        <v-btn @click="register" dark width="fit-content">
          <v-icon class="mr-3">{{ accountPlusIcon }}</v-icon
          >Register
        </v-btn>
        <v-btn class="body-2 my-6 mr-auto px-0" to="/login" text
          >Already registered?</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
import { mdiAccountPlus } from "@mdi/js";
export default {
  data: () => ({
    accountPlusIcon: mdiAccountPlus,
    newUser: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: ""
    },
    errorMessage: ""
  }),
  methods: {
    async register() {
      await this.$axios
        .post("/auth/register", this.newUser)
        .then(response => {
          this.login();
        })
        .catch(error => {
          this.$toast.error(`Login error: ${error.response}`);
        });
      this.$toast.clear();
      this.$toast
        .info(
          `Thanks for registering! You will receive a confirmation email shortly at ${this.newUser.email}`
        )
        .goAway(6000);
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
        })
        .catch(error => {
          this.$toast.error(`Login error: ${error.response}`);
        });
      this.$toast.success(`Welcome, ${this.newUser.email}`).goAway(3000);
    }
  }
};
</script>
