<template>
  <v-container class="pa-0" fill-height fluid>
    <v-row class="full-height">
      <!-- User menu navigation -->
      <v-col
        cols="12"
        class="py-0 col-md-3"
        :class="$breakpoint.mdAndUp ? '' : 'px-0'"
      >
        <v-card class="d-flex flex-column align-center py-6" flat>
          <!-- User Avatar -->
          <v-avatar :size="$breakpoint.mdAndUp ? '5rem' : '10rem'">
            <v-img :src="this.$auth.user.profile_image_source" />
          </v-avatar>

          <!-- User display info -->

          <p
            class="pt-3 mb-2"
            :class="$breakpoint.mdAndUp ? 'title' : 'display-1'"
          >
            {{ this.$auth.user.full_name }}
          </p>
          <p
            class="font-regular mb-0"
            :class="$breakpoint.mdAndUp ? 'subtitle-2' : 'title'"
          >
            {{ this.$auth.user.email }}
          </p>
        </v-card>
      </v-col>

      <!-- User display content -->
      <v-col>
        <!-- Edit Fields -->
        <v-card
          class="mx-auto"
          color="transparent"
          flat
          :width="$breakpoint.mdAndUp ? '50%' : '80vw'"
        >
          <!-- edit profile fields -->
          <template v-if="editProfileMode">
            <v-text-field
              :value="this.$auth.user.first_name"
              :counter="50"
              :rules="nameRules"
              @input="setUserFirstName($event)"
              label="First Name"
              outlined
            />

            <v-text-field
              :value="this.$auth.user.last_name"
              :counter="50"
              :rules="nameRules"
              @input="setUserLastName($event)"
              label="Last Name"
              outlined
            />

            <v-file-input
              v-model="userProfileImage"
              :rules="profileImageRules"
              prepend-icon=""
              :prepend-inner-icon="cameraIcon"
              accept="image/png, image/jpeg, image/bmp"
              clearable
              clear-icon
              placeholder="Update your profile picture"
              show-size
              label="Profile Picture"
              outlined
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
              outlined
            />

            <v-text-field
              v-model="updatePassword.password"
              label="New Password"
              placeholder="New Password"
              type="password"
              autocomplete="new-password"
              outlined
            />

            <v-text-field
              v-model="updatePassword.password_confirmation"
              label="Confirm New Password"
              placeholder="Retype New Password"
              type="password"
              autocomplete="new-password"
              outlined
            />
          </template>

          <template v-if="editEmailMode">
            <p class="body-2">Current email: {{ this.$auth.user.email }}</p>
            <v-text-field
              v-model="updateEmail"
              :rules="emailRules"
              label="New Email"
              outlined
            />
          </template>
        </v-card>

        <!-- Edit Profile Action Buttons -->
        <v-container class="pa-0">
          <v-row justify="center" align="center">
            <v-col v-if="editProfileMode" class="d-flex justify-center">
              <!-- Cancel Profile Edit -->
              <v-btn
                @click="toggleEditProfileMode"
                :color="editEmailMode ? 'warning' : 'secondary'"
                class="body-2 mr-3"
                outlined
              >
                Cancel
                <v-icon class="ml-2">{{
                  editProfileMode ? accountEditCancelIcon : accountEditIcon
                }}</v-icon>
              </v-btn>
              <!-- Update Event -->
              <v-btn @click="updateUserProfileClient" color="primary darken-2">
                Save
                <v-icon>{{ contentSaveIcon }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <!-- Change Password Action Buttons -->
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

        <!-- Change Email Action Buttons -->
        <v-container class="pa-0">
          <v-row justify="center" align="center">
            <v-col v-if="editEmailMode" class="d-flex justify-center">
              <!-- Edit/Cancel Change Email -->
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
  mdiAccountCancel,
  mdiAccountEdit,
  mdiAccountKey,
  mdiAccountLock,
  mdiCamera,
  mdiCancel,
  mdiContentSave,
  mdiEmailEdit,
  mdiKey
} from "@mdi/js";
import formRulesMixin from "../../mixins/formRulesMixin";
export default {
  layout: "profile",
  mixins: [formRulesMixin],
  data() {
    return {
      accountEditIcon: mdiAccountEdit,
      accountEditCancelIcon: mdiAccountCancel,
      accountLockIcon: mdiAccountLock,
      cameraIcon: mdiCamera,
      cancelIcon: mdiCancel,
      contentSaveIcon: mdiContentSave,
      emailEditIcon: mdiEmailEdit,
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
    ...mapState(["editEmailMode", "editPasswordMode", "editProfileMode"]),
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
    ...mapMutations([
      "setEditEmailMode",
      "setEditPasswordMode",
      "setEditProfileMode",
      "setUserFirstName",
      "setUserLastName",
      "toggleEditEmailMode",
      "toggleEditPasswordMode",
      "toggleEditProfileMode"
    ]),
    updateUserEmailClient() {
      this.updateUserEmail({ email: this.updateEmail });
      this.setEditEmailMode(false);
    },
    updateUserProfileClient() {
      this.updateUserProfile({
        user: this.$auth.user,
        profileImage: this.userProfileImage
      });
      this.setEditProfileMode(false);
    },
    updateUserPasswordClient() {
      this.updateUserPassword(this.updatePassword);
      this.setEditPasswordMode(false);
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
