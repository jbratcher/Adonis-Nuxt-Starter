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
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      />
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
    ]
  })
};
</script>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  font-size: 1rem; // fallback for older browsers
  font-size: calc(1vw + 1vh + 0.5vmin); // fluid typography
}

html,
body,
.v-application {
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  word-break: keep-all;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

.v-toolbar__content {
  display: flex;
  align-items: center;
}

.v-application {
  .v-card__title,
  .v-card__subtitle,
  .v-card__text {
    word-break: keep-all;
  }

  ul,
  ol {
    padding-left: 0;
  }

  a {
    text-decoration: none;
  }

  h1,
  h2,
  h3 {
    margin-bottom: 1rem;
  }

  p > a {
    color: #0d47a1;
  }

  p,
  p + p,
  ul {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  pre {
    margin-bottom: 2rem;
    min-width: 100%;
    code {
      font-size: 0.75rem;
      max-width: 100%;
      min-width: 100%;
      padding: 1rem;
    }
    code:before {
      content: "";
    }
  }

  .v-text-field--outlined fieldset {
    border-color: #ccc;
  }

  .v-input--selection-controls .v-input__control {
    width: 100%;
  }
}

/* Remove all animations and transitions for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

// helper classes
.full-height {
  min-height: 100%;
}
</style>
