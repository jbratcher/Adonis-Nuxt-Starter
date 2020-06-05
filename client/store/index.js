export const state = () => ({
  editEmailMode: false,
  editPasswordMode: false,
  editProfileMode: false
});

export const getters = {
  isAuthenticated(state) {
    let loggedIn;
    if (state.auth) {
      loggedIn = state.auth.loggedIn;
    }
    return loggedIn;
  },

  loggedInUser(state) {
    let user;
    if (state.auth) {
      user = state.auth.user;
    }
    return user;
  }
};

export const mutations = {
  setEditEmailMode(state, mode) {
    state.editEmailMode = mode;
  },
  setEditPasswordMode(state, mode) {
    state.editPasswordMode = mode;
  },
  setEditProfileMode(state, mode) {
    state.editProfileMode = mode;
  },
  setUserEmail(state, user_email) {
    state.auth.user.email = user_email;
  },
  setUserFirstName(state, first_name) {
    state.auth.user.first_name = first_name;
  },
  setUserLastName(state, last_name) {
    state.auth.user.last_name = last_name;
  },
  setUserProfileImageSource(state, profile_image_source) {
    state.auth.user.profile_image_source = profile_image_source;
  },
  toggleEditEmailMode(state) {
    state.editEmailMode = !state.editEmailMode;
    state.editPasswordMode = false;
    state.editProfileMode = false;
  },
  toggleEditPasswordMode(state) {
    state.editEmailMode = false;
    state.editPasswordMode = !state.editPasswordMode;
    state.editProfileMode = false;
  },
  toggleEditProfileMode(state) {
    state.editEmailMode = false;
    state.editPasswordMode = false;
    state.editProfileMode = !state.editProfileMode;
  }
};

export const actions = {
  async nuxtServerInit({}) {},

  // Adonis Persona Auth Actions

  // generate a forgot password email with token link and send to user
  async forgotPasswordLink({ commit }, email) {
    await this.$axios
      .$get(`/auth/forgot/password?uid=${email}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  },

  // update a user's email address with verification
  async updateUserEmail({ commit, dispatch }, updatedEmail) {
    console.log(updatedEmail);
    await this.$axios
      .$patch("/auth/update/email", updatedEmail)
      .then(response => {
        this.$auth.setUser(response);
        this.$toast.success("Email updated...").goAway(3000);
      })
      .catch(error => {
        this.$toast
          .error(`Email update error: ${error.response.data[0].message}`)
          .goAway(5000);
      });
  },

  // update a user's edited profile
  async updateUserProfile({ commit, dispatch }, { user, profileImage }) {
    // add image to static folder before update user profile
    dispatch("updateProfilePic", profileImage);
    await this.$axios
      .$patch("/auth/update", user)
      .then(response => {
        this.$auth.setUser(response);
        this.$toast.success("Profile updated...").goAway(3000);
      })
      .catch(error => console.log(error));
  },

  // sync add new user photo to images folder and update user profile image source
  updateProfilePic({ commit }, profileImage) {
    // new images must be post to Adonis via form data through axios
    let formData = new FormData();
    formData.append("profileImage", profileImage);
    let url = "/auth/update/profile-pic";
    let config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    this.$axios({
      method: "post",
      url: url,
      data: formData,
      config: config
    })
      .then(response => {
        console.log(response);
        commit("setUserProfileImageSource", response.data.profile_image_source);
      })
      .catch(e => console.log(error));
  },

  // change password from user profile
  async updateUserPassword({ commit, dispatch }, updatePassword) {
    await this.$axios
      .$patch("/auth/update/password", updatePassword)
      .then(response => {
        console.log(response);
        this.$toast.success("Password changed...").goAway(3000);
      })
      .catch(error => console.log(error));
  },

  // password reset method
  async updateUserPasswordByToken({ commit }, payload) {
    await this.$axios
      .$post(
        `/auth/update/password-by-token?token=${encodeURIComponent(
          payload.token
        )}`,
        {
          password: payload.updatePassword.password,
          password_confirmation: payload.updatePassword.password_confirmation
        }
      )
      .then(() => {
        this.$toast.success("Your password has been updated").goAway(3000);
        this.$router.replace("/login");
      })
      .catch(error =>
        this.$toast
          .error(`Password update error: ${error.response.data[0].message}`)
          .goAway(5000)
      );
  },

  // verify a newly created user's account from an email token link
  async verifyEmailWithToken({ commit }, token) {
    await this.$axios
      .$get(`/auth/verify-email?token=${token}`)
      .then(response => console.log(response))
      .catch(e => console.log(e));
  }
};
