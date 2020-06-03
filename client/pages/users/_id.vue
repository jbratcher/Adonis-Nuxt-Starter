<template>
  <v-container>
    <v-row>
      <v-col>
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

          <v-card color="transparent" flat min-width="30vw">
            <!-- edit profile fields -->
            <v-text-field
              v-if="editMode"
              :value="this.$auth.user.first_name"
              :counter="50"
              :rules="nameRules"
              @input="setUserFirstName($event)"
              label="First Name"
            />

            <v-text-field
              v-if="editMode"
              :value="this.$auth.user.last_name"
              :counter="50"
              :rules="nameRules"
              @input="setUserLastName($event)"
              label="Last Name"
            />

            <v-file-input
              v-if="editMode"
              v-model="userProfileImage"
              :rules="profileImageRules"
              :prepend-icon="cameraIcon"
              accept="image/png, image/jpeg, image/bmp"
              clearable
              full-width
              placeholder="Update your profile picture"
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
          </v-card>
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
    accountLockIcon: mdiAccountLock,
    cameraIcon: mdiCamera,
    cancelIcon: mdiCancel,
    contentSaveIcon: mdiContentSave,
    editMode: false,
    editPasswordMode: false,
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
    updatePassword: {
      old_password: "",
      password: "",
      password_confirmation: ""
    },
    userProfileImage: null,
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
    ...mapActions(["updateUserProfile", "updateUserPassword"]),
    ...mapActions("resource", ["fetchResourcesByUser"]),
    titleCase(string) {
      return titleCase(string);
    },
    ...mapMutations(["setUserFirstName", "setUserLastName"]),
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    toggleEditPasswordMode() {
      this.editPasswordMode = !this.editPasswordMode;
    },
    updateUser() {
      this.updateUserProfile({
        user: this.$auth.user,
        profileImage: this.userProfileImage
      });
      this.editMode = false;
      this.$toast.success("Profile updated...").goAway(3000);
    },
    updateUserPasswordClient() {
      this.updateUserPassword(this.updatePassword);
      this.editPasswordMode = false;
      this.$toast.success("Password changed...").goAway(3000);
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
