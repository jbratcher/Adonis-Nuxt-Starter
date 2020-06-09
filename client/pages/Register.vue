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
            <v-btn @click="registerClient" dark width="fit-content">
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
import { mapActions } from "vuex";
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
    ...mapActions(["register"]),
    async registerClient() {
      this.register(this.newUser);
    }
  }
};
</script>
