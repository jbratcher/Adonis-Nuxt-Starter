<template>
  <!-- update password -->
  <v-container class="pa-0">
    <v-row>
      <v-col class="d-flex flex-column align-center">
        <!-- change password fields -->

        <v-text-field v-model="updatePassword.password" label="New Password" />

        <v-text-field
          v-model="updatePassword.password_confirmation"
          label="Confirm New Password"
        />

        <v-btn @click="updatePasswordByTokenClient">Change Password</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      updatePassword: {
        password: "",
        password_confirmation: ""
      }
    };
  },
  methods: {
    ...mapActions(["updateUserPasswordByToken"]),
    // pass new password and params to vuex action
    updatePasswordByTokenClient() {
      this.updateUserPasswordByToken({
        updatePassword: this.updatePassword,
        token: Object.values(this.$route.query)[0]
      });
    }
  }
};
</script>
