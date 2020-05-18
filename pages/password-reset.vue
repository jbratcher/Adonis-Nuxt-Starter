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
          Forgot Password
        </h1>

        <v-text-field v-model="email" label="Email" placeholder="Email" />
        <v-alert :value="Boolean(error)" type="error">{{ error }}</v-alert>
        <v-btn @click="login" dark width="fit-content">
          <v-icon class="mr-3">{{ loginIcon }}</v-icon
          >Login
        </v-btn>
        <v-btn class="body-2 my-6 mr-auto px-0" to="/forgot-password" text
          >Forgot Password?</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { mdiLogin } from "@mdi/js";
export default {
  data() {
    return {
      loginIcon: mdiLogin,
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
      const { data } = await this.$axios.post("/password/reset");

      this.status = data.status;

      this.form.reset();
    }
  }
};
</script>
