<template>
  <section v-if="resource" class="container">
    <section class="content">
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
    </section>
  </section>
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

<style lang="scss">
.content {
  margin: 0 1rem;
}
</style>
