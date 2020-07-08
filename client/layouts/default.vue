<template>
  <v-app>
    <!-- Header Area -->
    <v-app-bar app elevate-on-scroll>
      <v-toolbar-title>
        <nuxt-link class="black--text" to="/">
          Adonis Nuxt Starter
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon
        class="hidden-md-and-up ml-auto"
        @click.stop="drawer = !drawer"
        aria-label="menu-open"
        name="menu-open"
        x-large
      >
        <i aria-hidden="true" class="v-icon notranslate theme--dark">
          <v-icon>{{ menuIcon }}</v-icon>
        </i>
      </v-app-bar-nav-icon>
      <MenuLinks
        :general-links="generalLinks"
        :logged-out-links="loggedOutLinks"
        list-class="d-md-flex justify-end hidden-md-and-down ml-auto"
        list-item-class="mx-1"
      />
    </v-app-bar>
    <!-- side/mobile navigation -->
    <v-navigation-drawer
      v-model="drawer"
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
    <v-main>
      <nuxt />
    </v-main>
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
  mdiAccountPlus,
  mdiFormatListBulletedSquare,
  mdiLogin,
  mdiMenu,
  mdiPlusCircle
} from "@mdi/js";
import MenuLinks from "../components/MenuLinks";
export default {
  components: {
    MenuLinks
  },
  data: () => ({
    drawer: false,
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
    menuIcon: mdiMenu
  })
};
</script>

<style lang="scss"></style>
