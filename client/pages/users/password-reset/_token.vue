<template>
  <!-- update password -->
  <v-container class="pa-0">
    <v-row>
      <v-col class="d-flex flex-column mx-auto col-8 col-md-5 py-12">
        <!-- Forgot Password Form -->
        <v-card class="pa-6" elevation="6">
          <v-card-title
            :class="{
              'headline mb-6': $breakpoint.mdAndUp,
              'title mb-4': $breakpoint.smAndDown
            }"
          >
            Change Your Password
          </v-card-title>

          <v-card-subtitle :class="$breakpoint.mdAndUp ? 'mb-6' : 'mb-4'">
            Enter your new password
          </v-card-subtitle>

          <v-card-text class="pb-0">
            <v-form v-model="valid">
              <v-text-field
                v-model="updatePassword.password"
                outlined
                placeholder="New Password"
                :rules="shortTextRules"
                type="password"
                autocomplete="new-password"
              />

              <v-text-field
                v-model="updatePassword.password_confirmation"
                outlined
                placeholder="New Password"
                :rules="shortTextRules"
                type="password"
              />
            </v-form>
          </v-card-text>

          <v-card-actions class="pt-0 px-4">
            <v-btn
              @click="updatePasswordByTokenClient"
              dark
              width="fit-content"
            >
              <v-icon class="mr-3">{{ keyIcon }}</v-icon
              >Change Password
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-alert :value="Boolean(error)" type="error">{{ error }}</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { mdiAccountKey } from "@mdi/js";
import formRulesMixin from "../../../mixins/formRulesMixin";
export default {
  mixins: [formRulesMixin],
  data: () => ({
    error: null,
    keyIcon: mdiAccountKey,
    updatePassword: {
      password: "",
      password_confirmation: ""
    },
    valid: true
  }),
  methods: {
    ...mapActions(["updateUserPasswordByToken"]),
    updatePasswordByTokenClient() {
      this.updateUserPasswordByToken({
        updatePassword: this.updatePassword,
        token: Object.values(this.$route.query)[0]
      });
    }
  }
};
</script>
