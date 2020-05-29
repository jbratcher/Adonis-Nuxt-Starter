<template>
  <v-container>
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
            Reset Your Password
          </v-card-title>

          <v-card-subtitle :class="$breakpoint.mdAndUp ? 'mb-6' : 'mb-4'">
            Enter your email and we will send you a password reset link
          </v-card-subtitle>

          <v-card-text class="pb-0">
            <v-form v-model="valid">
              <v-text-field
                v-model="email"
                label="Email"
                :rules="emailRules"
                outlined
              />
            </v-form>
          </v-card-text>

          <v-card-actions class="pt-0 px-4">
            <v-btn @click="reset" dark width="fit-content">
              <v-icon class="mr-3">{{ forgotIcon }}</v-icon
              >Send link
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
import { mdiLockQuestion } from "@mdi/js";
import formRulesMixin from "../../mixins/formRulesMixin";
export default {
  mixins: [formRulesMixin],
  data: () => ({
    forgotIcon: mdiLockQuestion,
    email: "",
    error: null,
    valid: true
  }),
  methods: {
    ...mapActions(["forgotPasswordLink"]),
    async reset() {
      this.forgotPasswordLink(this.email);
      this.$toast
        .info(`A password reset link has been emailed to you`)
        .goAway(3000);
    }
  }
};
</script>
