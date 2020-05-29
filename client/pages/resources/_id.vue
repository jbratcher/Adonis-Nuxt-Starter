<template>
  <v-container>
    <v-row>
      <v-col>
        <template v-if="resource">
          <v-card>
            <h1>Resource {{ resource.id }}</h1>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>{{ resource.name }}</b>
                  </td>
                  <td>{{ resource.quantity }}</td>
                </tr>
              </tbody>
            </table>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState("resource", ["resource"])
  },
  methods: {
    ...mapActions("resource", ["fetchResource"])
  },
  created() {
    this.fetchResource(this.$route.params.id);
  }
};
</script>

<style lang="scss"></style>
