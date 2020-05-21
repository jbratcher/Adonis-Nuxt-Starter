<template>
  <v-container>
    <v-row>
      <v-col>
        <v-container v-if="this.$auth.user" class="profile-card">
          <v-avatar size="128">
            <v-img :src="this.$auth.user.profile_image_source" />
          </v-avatar>

          <v-container class="pa-0">
            <v-row>
              <v-col class="d-flex justify-center">
                <!-- Edit/Cancel Edit Event Button -->
                <v-btn
                  @click="toggleEditMode"
                  :color="editMode ? 'warning' : 'secondary'"
                >
                  <v-icon>{{ editMode ? pencilOffIcon : pencilIcon }}</v-icon>
                </v-btn>
                <!-- Update Event -->
                <v-btn
                  v-if="editMode"
                  @click="updateUser"
                  color="primary darken-2"
                >
                  <v-icon>{{ contentSaveIcon }}</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>

          <p>{{ this.$auth.user.email }}</p>

          <p v-if="!editMode">{{ this.$auth.user.full_name }}</p>

          <v-text-field
            v-if="editMode"
            v-model="user.first_name"
            :counter="50"
            :rules="nameRules"
            label="First Name"
          />

          <v-text-field
            v-if="editMode"
            v-model="user.last_name"
            :counter="50"
            :rules="nameRules"
            label="Last Name"
          />

          <!-- <v-file-input
            v-if="editMode"
            v-model="user.profile_image_source"
            :rules="profileImageRules"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Update your profile picture"
            prepend-icon="mdi-camera"
            label="Profile Picture"
          /> -->
        </v-container>

        <v-container>
          <h3 v-if="userResources.length > 0" class="mb-6">Resources</h3>
          <v-list
            v-if="userResources"
            :width="$breakpoint.mdAndUp ? '200px' : '100%'"
          >
            <v-list-item
              v-for="(resource, index) in userResources"
              :key="`${report.name}-${index}`"
              :to="`/resources/${resource.name}`"
              router
              exact
            >
              <v-btn class="my-3" color="primary lighten-1" width="100%">
                {{ resource.name }}
              </v-btn>
            </v-list-item>
          </v-list>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { mdiCamera, mdiContentSave, mdiPencil, mdiPencilOff } from "@mdi/js";
export default {
  data: () => ({
    cameraIcon: mdiCamera,
    contentSaveIcon: mdiContentSave,
    editMode: false,
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 50) || "Name must be less than 50 characters"
    ],
    pencilIcon: mdiPencil,
    pencilOffIcon: mdiPencilOff,
    profileImageRules: [
      value =>
        !value ||
        value.size < 2000000 ||
        "Profile image size should be less than 2 MB!"
    ],
    user: {
      first_name: "",
      last_name: "",
      profile_image_source: []
    },
    valid: true
  }),
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
    ...mapState("resource", ["userResources"])
  },
  created() {
    this.fetchResourcesByUser();
  },
  methods: {
    ...mapActions(["updateUserProfile"]),
    ...mapActions("resource", ["fetchResourcesByUser"]),
    titleCase(string) {
      return titleCase(string);
    },
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    updateUser() {
      this.updateUserProfile(this.user);
      this.editMode = false;
    }
  }
};
</script>

<style lang="scss">
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 80vw;

  p:first-of-type {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 1rem 0 0.75rem;
  }

  p {
    font-size: 1.25rem;
    font-weight: 300;
  }
}

@media screen and (min-width: 768px) {
  .profile-card {
    width: 50vw;
  }
}
</style>
