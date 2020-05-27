/* eslint-disable */
<template>
  <!-- Links Wrapper -->
  <v-list class="py-0" :class="listClass" color="transparent" rounded>
    <!-- General links -->
    <v-list-item
      v-for="(item, i) in generalLinks"
      :key="i + `-${item.title}`"
      class="mb-0"
      :class="listItemClass"
      :to="item.to"
      router
      exact
    >
      <v-list-item-action v-if="item.icon" class="mr-2">
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title :class="listItemTitleClass">{{
          item.title
        }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <!-- login/register links -->
    <template v-if="!isAuthenticated">
      <v-list-item
        v-for="(item, j) in loggedOutLinks"
        :key="j + `-${item.title}`"
        :to="item.to"
        class="mb-0"
        :class="listItemClass"
        router
        exact
      >
        <v-list-item-action v-if="item.icon" class="mr-2">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title :class="listItemTitleClass">{{
            item.title
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <!-- User Profile Link -->
    <v-list-item
      v-if="isAuthenticated"
      class="mb-0"
      exact
      router
      :to="`/users/${this.$auth.user.id}`"
    >
      <v-avatar size="36">
        <img
          v-if="this.$auth.user"
          alt="Avatar"
          :src="this.$auth.user.profile_image_source"
        />
      </v-avatar>
    </v-list-item>

    <!-- logout link -->
    <v-list-item
      v-if="isAuthenticated"
      class="mb-0"
      :class="listItemClass"
      @click="logout"
    >
      <v-list-item-action class="mr-2">
        <v-icon>{{ logoutIcon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title :class="listItemTitleClass"
          >Logout</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { mdiAccount, mdiLogout } from "@mdi/js";
export default {
  name: "MenuLinks",
  props: {
    generalLinks: {
      type: Array,
      default() {
        return [];
      }
    },
    loggedOutLinks: {
      type: Array,
      default() {
        return [];
      }
    },
    listClass: {
      type: String,
      default: ""
    },
    listItemClass: {
      type: String,
      default: ""
    },
    listItemTitleClass: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"])
  },
  data: () => ({
    accountIcon: mdiAccount,
    logoutIcon: mdiLogout
  }),
  methods: {
    ...mapMutations(["setLoginSuccessful", "setLogoutSuccessful"]),
    async logout() {
      await this.$auth.logout();
      this.setLogoutSuccessful(true);
    }
  }
};
</script>

<style lang="scss"></style>
