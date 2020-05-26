<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- Profile Updated Notification -->
        <template v-if="profileUpdated">
          <v-alert
            v-model="profileUpdatedalert"
            border="left"
            close-text="Close Alert"
            color="teal lighten-1"
            dark
            dismissible
          >
            You profile has been updated.
          </v-alert>
        </template>

        <!-- Password Updated Notification -->
        <template v-if="passwordChanged">
          <v-alert
            v-model="passwordUpdatedAlert"
            border="left"
            close-text="Close Alert"
            color="primary lighten-1"
            dark
            dismissible
          >
            You password has been changed.
          </v-alert>
        </template>

        <v-container v-if="this.$auth.user" class="profile-card">
          <!-- User avatar -->
          <v-avatar size="128">
            <v-img :src="this.$auth.user.profile_image_source" />
          </v-avatar>

          <!-- edit profile -->
          <v-container class="pa-0">
            <v-row justify="center" align="center">
              <v-col cols="2" class="d-flex justify-center">
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

              <!-- update password -->
              <v-col cols="2" class="d-flex justify-center">
                <!-- Edit/Cancel Edit Event Button -->
                <v-btn
                  @click="toggleEditPasswordMode"
                  :color="editPasswordMode ? 'warning' : 'secondary'"
                >
                  <v-icon>{{
                    editPasswordMode ? cancelIcon : accountLockIcon
                  }}</v-icon>
                </v-btn>
                <!-- Update Event -->
                <v-btn
                  v-if="editPasswordMode"
                  @click="updateUserPasswordClient"
                  color="primary darken-2"
                >
                  <v-icon>{{ contentSaveIcon }}</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>

          <p>{{ this.$auth.user.email }}</p>

          <p v-if="!editMode">{{ this.$auth.user.full_name }}</p>

          <!-- edit profile fields -->
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

          <v-file-input
            v-if="editMode"
            v-model="user.profile_image_source"
            :rules="profileImageRules"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Update your profile picture"
            prepend-icon="mdi-camera"
            label="Profile Picture"
          />

          <!-- change password fields -->
          <v-text-field
            v-if="editPasswordMode"
            v-model="updatePassword.old_password"
            label="Old password"
            placeholder="Old Password"
            type="password"
            autocomplete="new-password"
          />

          <v-text-field
            v-if="editPasswordMode"
            v-model="updatePassword.password"
            label="New Password"
            placeholder="New Password"
            type="password"
            autocomplete="new-password"
          />

          <v-text-field
            v-if="editPasswordMode"
            v-model="updatePassword.password_confirmation"
            label="Confirm New Password"
            placeholder="Retype New Password"
            type="password"
            autocomplete="new-password"
          />
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
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import {
  mdiAccountKey,
  mdiAccountLock,
  mdiCamera,
  mdiCancel,
  mdiContentSave,
  mdiPencil,
  mdiPencilOff
} from "@mdi/js";
export default {
  data: () => ({
    cancelIcon: mdiCancel,
    accountLockIcon: mdiAccountLock,
    cameraIcon: mdiCamera,
    contentSaveIcon: mdiContentSave,
    editMode: false,
    editPasswordMode: false,
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 50) || "Name must be less than 50 characters"
    ],
    passwordUpdatedAlert: true,
    pencilIcon: mdiPencil,
    pencilOffIcon: mdiPencilOff,
    profileImageRules: [
      value =>
        !value ||
        value.size < 2000000 ||
        "Profile image size should be less than 2 MB!"
    ],
    profileUpdatedAlert: true,
    updatePassword: {
      old_password: "",
      password: "",
      password_confirmation: ""
    },
    user: {
      first_name: "",
      last_name: "",
      profile_image_source: null
    },
    valid: true
  }),
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
    ...mapState(["passwordChanged", "profileUpdated"]),
    ...mapState("resource", ["userResources"])
  },
  created() {
    this.fetchResourcesByUser();
  },
  methods: {
    ...mapActions(["updateUserProfile", "updateUserPassword"]),
    ...mapActions("resource", ["fetchResourcesByUser"]),
    ...mapMutations(["resetPasswordChanged", "resetProfileUpdated"]),
    titleCase(string) {
      return titleCase(string);
    },
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    toggleEditPasswordMode() {
      this.editPasswordMode = !this.editPasswordMode;
    },
    updateUser() {
      this.updateUserProfile(this.user);
      this.editMode = false;
    },
    updateUserPasswordClient() {
      this.updateUserPassword(this.updatePassword);
      this.editPasswordMode = false;
    }
  },
  mounted() {
    this.resetPasswordChanged();
    this.resetProfileUpdated();
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
