<template>
  <v-container>
    <v-row>
      <v-col>
        <v-container>
          <h1>Email verified</h1>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["verifyEmailWithToken"])
  },
  mounted() {
    this.verifyEmailWithToken(Object.values(this.$route.query)[0]);
  }
};
</script>

<style lang="scss"></style>
