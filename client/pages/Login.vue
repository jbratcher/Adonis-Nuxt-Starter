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
                v-model="credentials.email"
                label="Email"
                :rules="emailRules"
                outlined
              />
              <v-text-field
                v-model="credentials.password"
                autocomplete="new-password"
                label="Password"
                :rules="shortTextRules"
                type="password"
                outlined
              />
            </v-form>
          </v-card-text>

          <v-card-actions class="pt-0">
            <v-btn @click="loginClient" dark width="fit-content">
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
import { mapActions } from "vuex";
import { mdiLogin } from "@mdi/js";
import formRulesMixin from "../mixins/formRulesMixin";
export default {
  mixins: [formRulesMixin],
  data: () => ({
    loginIcon: mdiLogin,
    credentials: {
      email: "",
      password: ""
    },
    valid: true
  }),
  methods: {
    ...mapActions(["login"]),
    async loginClient() {
      this.login(this.credentials);
    }
  }
};
</script>
