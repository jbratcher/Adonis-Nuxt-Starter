<template>
  <v-container>
    <v-row align="center">
      <v-col class="col-md-6">
        <h1>
          A full-featured starter project for Adonis and Nuxt
        </h1>
        <h2>Easily bootstrap a web app with the basics already done</h2>
      </v-col>
      <v-col class="col-md-6">
        <h3>Features Include:</h3>
        <ul>
          <li>User module</li>
          <li>Example CRUD resource</li>
          <li>Nuxt configured for web performance &amp; SEO</li>
        </ul>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h3>Features</h3>
        <v-row>
          <v-col
            v-for="(card, index) in cards"
            :key="`${card.title.substring(0, 10)}-${index}`"
            class="col-md-4"
          >
            <v-card height="100%">
              <v-card-title>
                {{ card.title }}
              </v-card-title>
              <v-card-text>
                {{ card.text }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    cards: [
      {
        title: "User Management",
        text: "Pre-configured user management workflow already set up for you"
      },
      {
        title: "Example CRUD Resource",
        text: "An example CRUD resource is fully set up for you to build off of"
      },
      {
        title: "Optimized Builds",
        text:
          "Both Adonis and Nuxt are pre-configured and optimized for web performance and SEO"
      }
    ]
  })
};
</script>

<style></style>
