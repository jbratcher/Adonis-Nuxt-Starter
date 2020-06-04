<template>
  <v-container class="pa-0" fill-height fluid>
    <v-row class="full-height">
      <!-- User menu navigation -->
      <v-col class="py-0" cols="3">
        <v-card class="mx-6" flat>
          <v-navigation-drawer height="100%" permanent width="100%">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">
                  Profile
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ this.$auth.user.full_name }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list dense nav>
              <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                @click="item.action"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </v-col>

      <!-- User display content -->
      <v-col>
        <v-container v-if="this.$auth.user" class="py-0 profile-card">
          <v-row>
            <v-col>
              <!-- User avatar -->
              <v-card color="transparent" flat>
                <v-avatar size="128">
                  <v-img :src="this.$auth.user.profile_image_source" />
                </v-avatar>
                <!-- Avatar floating action buttons -->
                <!-- Edit/Cancel Edit Event Button -->
                <v-btn
                  @click="toggleEditProfileMode"
                  :color="editProfileMode ? 'warning' : 'secondary'"
                  class="profile-edit-button"
                  fab
                  absolute
                  small
                >
                  <v-icon small>{{
                    editProfileMode ? pencilOffIcon : pencilIcon
                  }}</v-icon>
                </v-btn>
                <!-- Update Event -->
                <v-btn
                  v-if="editProfileMode"
                  @click="updateUser"
                  color="primary darken-2"
                  class="profile-save-button"
                  fab
                  absolute
                  small
                >
                  <v-icon small>{{ contentSaveIcon }}</v-icon>
                </v-btn>
              </v-card>
            </v-col>
            <v-col class="align-self-end">
              <!-- User display info -->
              <v-card class="ml-3" color="transparent" flat>
                <p class="body-1 mb-0">
                  {{ this.$auth.user.full_name }}
                </p>
                <p class="caption mb-1">{{ this.$auth.user.email }}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <!-- Edit Fields -->
        <v-container class="py-0">
          <v-card color="transparent" flat min-width="30vw">
            <!-- edit profile fields -->
            <template v-if="editProfileMode">
              <v-text-field
                :value="this.$auth.user.first_name"
                :counter="50"
                :rules="nameRules"
                @input="setUserFirstName($event)"
                label="First Name"
              />

              <v-text-field
                :value="this.$auth.user.last_name"
                :counter="50"
                :rules="nameRules"
                @input="setUserLastName($event)"
                label="Last Name"
              />

              <v-file-input
                v-model="userProfileImage"
                :rules="profileImageRules"
                :prepend-icon="cameraIcon"
                accept="image/png, image/jpeg, image/bmp"
                clearable
                full-width
                placeholder="Update your profile picture"
                label="Profile Picture"
              />
            </template>

            <!-- change password fields -->
            <template v-if="editPasswordMode">
              <v-text-field
                v-model="updatePassword.old_password"
                label="Old password"
                placeholder="Old Password"
                type="password"
                autocomplete="new-password"
              />

              <v-text-field
                v-model="updatePassword.password"
                label="New Password"
                placeholder="New Password"
                type="password"
                autocomplete="new-password"
              />

              <v-text-field
                v-model="updatePassword.password_confirmation"
                label="Confirm New Password"
                placeholder="Retype New Password"
                type="password"
                autocomplete="new-password"
              />
            </template>

            <template v-if="editEmailMode">
              <p class="body-2">Current email: {{ this.$auth.user.email }}</p>
              <v-text-field
                v-model="updateEmail"
                :rules="emailRules"
                label="New Email"
              />
            </template>
          </v-card>
        </v-container>

        <!-- Change Password -->
        <v-container class="pa-0">
          <v-row justify="center" align="center">
            <v-col v-if="editPasswordMode" class="d-flex justify-center">
              <!-- Edit/Cancel Change Password -->
              <v-btn
                @click="toggleEditPasswordMode"
                :color="editPasswordMode ? 'warning' : 'secondary'"
                class="body-2 mr-3"
                outlined
              >
                Cancel
                <v-icon class="ml-2">{{
                  editPasswordMode ? cancelIcon : accountLockIcon
                }}</v-icon>
              </v-btn>
              <!-- Update Event -->
              <v-btn @click="updateUserPasswordClient" color="primary darken-2">
                Save
                <v-icon>{{ contentSaveIcon }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <!-- Change Email -->
        <v-container class="pa-0">
          <v-row justify="center" align="center">
            <v-col v-if="editEmailMode" class="d-flex justify-center">
              <!-- Edit/Cancel Change Password -->
              <v-btn
                @click="toggleEditEmailMode"
                :color="editEmailMode ? 'warning' : 'secondary'"
                class="body-2 mr-3"
                outlined
              >
                Cancel
                <v-icon class="ml-2">{{
                  editEmailMode ? cancelIcon : emailEditIcon
                }}</v-icon>
              </v-btn>
              <!-- Update Event -->
              <v-btn @click="updateUserEmailClient" color="primary darken-2">
                Save
                <v-icon>{{ contentSaveIcon }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <!-- User resources list -->
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
        <!-- End Main -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import {
  mdiAccount,
  mdiAccountKey,
  mdiAccountLock,
  mdiCamera,
  mdiCancel,
  mdiContentSave,
  mdiEmailEdit,
  mdiKey,
  mdiPencil,
  mdiPencilOff
} from "@mdi/js";
import formRulesMixin from "../../mixins/formRulesMixin";
export default {
  mixins: [formRulesMixin],
  data() {
    return {
      accountLockIcon: mdiAccountLock,
      cameraIcon: mdiCamera,
      cancelIcon: mdiCancel,
      contentSaveIcon: mdiContentSave,
      emailEditIcon: mdiEmailEdit,
      editEmailMode: false,
      editProfileMode: false,
      editPasswordMode: false,
      items: [
        {
          action: this.toggleEditProfileMode,
          icon: mdiAccount,
          title: "User Info"
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
      pencilIcon: mdiPencil,
      pencilOffIcon: mdiPencilOff,
      updateEmail: "",
      updatePassword: {
        old_password: "",
        password: "",
        password_confirmation: ""
      },
      userProfileImage: null,
      valid: true
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
    ...mapState("resource", ["userResources"])
  },
  created() {
    this.fetchResourcesByUser();
  },
  methods: {
    ...mapActions([
      "updateUserProfile",
      "updateUserPassword",
      "updateUserEmail"
    ]),
    ...mapActions("resource", ["fetchResourcesByUser"]),
    titleCase(string) {
      return titleCase(string);
    },
    ...mapMutations(["setUserFirstName", "setUserLastName"]),
    toggleEditEmailMode() {
      this.editEmailMode = !this.editEmailMode;
      this.editPasswordMode = false;
      this.editProfileMode = false;
    },
    toggleEditProfileMode() {
      this.editEmailMode = false;
      this.editProfileMode = !this.editProfileMode;
      this.editPasswordMode = false;
    },
    toggleEditPasswordMode() {
      this.editEmailMode = false;
      this.editPasswordMode = !this.editPasswordMode;
      this.editProfileMode = false;
    },
    updateUserEmailClient() {
      this.updateUserEmail({ email: this.updateEmail });
      this.editEmailMode = false;
    },
    updateUser() {
      this.updateUserProfile({
        user: this.$auth.user,
        profileImage: this.userProfileImage
      });
      this.editProfileMode = false;
    },
    updateUserPasswordClient() {
      this.updateUserPassword(this.updatePassword);
      this.editPasswordMode = false;
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

.profile-edit-button {
  top: 0;
  right: -15px;
}

.profile-save-button {
  top: 0;
  right: -60px;
}

@media screen and (min-width: 768px) {
  .profile-card {
    width: 50vw;
  }
}
</style>
