<template>
  <v-container>
    <v-row>
      <v-col class="d-flex flex-column mx-auto col-8 col-md-5 py-12">
        <!-- User Login Form -->
        <v-card class="pa-6" elevation="6">
          <v-card-title
            :class="{
              'headline mb-6': $breakpoint.mdAndUp,
              'title mb-4': $breakpoint.smAndDown
            }"
          >
            Sign in to your account
          </v-card-title>

          <v-card-text class="pb-0 px-4">
            <v-form v-model="valid" lazy-validation>
              <v-text-field
                v-model="email"
                label="Email"
                :rules="emailRules"
                outlined
              />
              <v-text-field
                v-model="password"
                autocomplete="new-password"
                label="Password"
                :rules="shortTextRules"
                type="password"
                outlined
              />
            </v-form>
          </v-card-text>

          <v-card-actions class="pt-0">
            <v-btn @click="login" dark width="fit-content">
              <v-icon class="mr-3">{{ loginIcon }}</v-icon
              >Sign In
            </v-btn>
            <v-btn
              class="caption my-6 ml-auto px-0"
              to="/users/forgot-password"
              text
              >Forgot Password?</v-btn
            >
          </v-card-actions>
        </v-card>
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
    valid: true
  }),
  methods: {
    async login() {
      await this.$auth
        .loginWith("local", {
          data: {
            uid: this.email,
            password: this.password
          }
        })
        .then(response => {
          this.$toast.show("Logging you in...").goAway(1500);
          this.$auth.setToken("local", "Bearer " + response.data.token);
          this.$router.replace("/");
          this.$toast
            .success(`Welcome, ${this.$auth.user.full_name}`)
            .goAway(3000);
        })
        .catch(error => {
          this.$toast
            .error(`Login error: ${error.response.data[0].message}`)
            .goAway(3000);
        });
    }
  }
};
</script>
