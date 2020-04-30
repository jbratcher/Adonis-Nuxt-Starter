<template>
  <v-app>
    <!-- Header Area -->
    <v-app-bar app elevate-on-scroll>
      <v-toolbar-title>
        Adonis Nuxt Starter
      </v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      />
      <v-list class="d-flex" color="transparent">
        <!-- General links -->
        <v-list-item
          v-for="(item, i) in links"
          :key="i + `-${item.title}`"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action class="mr-2">
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-app-bar>
    <!-- side/mobile navigation -->
    <v-navigation-drawer
      v-model="drawer"
      app
      disable-resize-watcher
      fixed
      right
    >
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
export default {
  data() {
    return {
      drawer: false,
      links: [
        {
          icon: "mdi-format-list-bulleted-square",
          title: "Resources",
          to: "/resources"
        },
        {
          icon: "mdi-plus-circle",
          title: "Create",
          to: "/resources/create"
        }
      ]
    };
  }
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
  line-height: 1.5;
  word-break: keep-all;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.v-toolbar__content {
  display: flex;
  align-items: center;
}

.v-application {
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
}
</style>
