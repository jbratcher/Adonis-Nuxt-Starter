<template>
  <v-app>
    <!-- Header Area -->
    <!-- Main Nav -->
    <v-app-bar app elevate-on-scroll>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="mainMenu = !mainMenu"
        name="menu-open"
        x-large
      >
        <i aria-hidden="true" class="v-icon notranslate theme--dark">
          <v-icon>{{ mainMenuIcon }}</v-icon>
        </i>
      </v-app-bar-nav-icon>
      <MenuLinks
        :general-links="generalLinks"
        :logged-out-links="loggedOutLinks"
        list-class="d-md-flex justify-end hidden-md-and-down ml-auto"
        list-item-class="mx-1"
      />
      <!-- User Actions Nav (Dropdown) -->
      <v-menu v-model="profileMenu" bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-app-bar-nav-icon
            v-on="on"
            @click.stop="profileMenu = !profileMenu"
            class="hidden-md-and-up ml-auto"
            name="profile-edit"
            x-large
          >
            <i aria-hidden="true" class="v-icon notranslate theme--dark">
              <v-icon>{{ profileMenuIcon }}</v-icon>
            </i>
          </v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="item.action"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!-- side/mobile navigation -->
    <v-navigation-drawer
      v-model="mainMenu"
      app
      disable-resize-watcher
      fixed
      right
    >
      <MenuLinks
        :general-links="generalLinks"
        :logged-out-links="loggedOutLinks"
        list-class="d-flex flex-column my-6 mx-3"
        list-item-class="my-3"
        listItemTitleClass="title"
      />
    </v-navigation-drawer>
    <!-- Nuxt content -->
    <v-content>
      <nuxt />
    </v-content>
    <!-- Footer Area -->
    <v-footer>
      <v-row justify="center">
        <v-col class="py-4 text-center">
          {{ new Date().getFullYear() }} — <strong>Adonis Nuxt Starter</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import {
  mdiAccount,
  mdiAccountPlus,
  mdiEmailEdit,
  mdiFormatListBulletedSquare,
  mdiKey,
  mdiLogin,
  mdiMenu,
  mdiPlusCircle,
  mdiTune
} from "@mdi/js";
import MenuLinks from "../components/MenuLinks";
export default {
  name: "Profile",
  components: {
    MenuLinks
  },
  data() {
    return {
      editEmailMode: false,
      editPasswordMode: false,
      editProfileMode: false,
      generalLinks: [
        {
          icon: mdiFormatListBulletedSquare,
          title: "Resources",
          to: "/resources"
        },
        {
          icon: mdiPlusCircle,
          title: "Create",
          to: "/resources/create"
        }
      ],
      loggedOutLinks: [
        {
          icon: mdiLogin,
          title: "Login",
          to: "/login"
        },
        {
          icon: mdiAccountPlus,
          title: "Register",
          to: "/register"
        }
      ],
      items: [
        {
          action: this.toggleEditProfileMode,
          icon: mdiAccount,
          title: "Edit Profile"
        },
        {
          action: this.toggleEditEmailMode,
          icon: mdiEmailEdit,
          title: "Change Email"
        },
        {
          action: this.toggleEditPasswordMode,
          icon: mdiKey,
          title: "Change Password"
        }
      ],
      mainMenu: false,
      mainMenuIcon: mdiMenu,
      profileMenu: false,
      profileMenuIcon: mdiTune
    };
  },
  methods: {
    ...mapMutations([
      "setEditEmailMode",
      "setEditPasswordMode",
      "setEditProfileMode",
      "toggleEditEmailMode",
      "toggleEditPasswordMode",
      "toggleEditProfileMode"
    ]),
    async logout() {
      await this.$auth.logout();
      this.$toast.success("Logged you out").goAway(2000);
    }
  }
};
</script>

<style lang="scss"></style>
