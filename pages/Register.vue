<template>
  <v-container>
    <v-row>
      <v-col class="mx-auto col-9 col-md-6 py-12">
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
          v-model="firstName"
          label="First Name"
          placeholder="First Name"
        />
        <v-text-field
          v-model="lastName"
          label="Last Name"
          placeholder="Last Name"
        />
        <v-text-field v-model="email" label="Email" placeholder="Email" />
        <v-text-field
          v-model="password"
          label="Password"
          placeholder="Password"
          type="password"
          autocomplete="new-password"
        />
        <v-alert v-model="error" type="error">{{ errorMessage }}</v-alert>
        <v-btn @click="register" dark>
          <v-icon class="mr-3">{{ accountPlusIcon }}</v-icon
          >Register
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiAccountPlus } from "@mdi/js";
export default {
  data() {
    return {
      accountPlusIcon: mdiAccountPlus,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      error: false,
      errorMessage: ""
    };
  },
  methods: {
    register() {
      try {
        const newUser = {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName
        };

        this.$axios
          .post("/auth/register", newUser)
          .then(response => {
            this.login();
          })
          .catch(error => console.log(`Register/login error: ${error}`));
      } catch (e) {
        this.error = true;
        this.errorMessage = e.response.data[0].message;
      }
    },
    login() {
      this.$auth
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
    }
  }
};
</script>
