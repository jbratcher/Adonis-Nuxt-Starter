export const state = () => ({
  logoutSuccessful: false,
  passwordChanged: false,
  profileUpdated: false,
  registrationSuccessful: false
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
  resetPasswordChanged(state) {
    state.passwordChanged = false;
  },
  resetProfileUpdated(state) {
    state.profileUpdated = false;
  },
  resetRegistrationSuccessful(state) {
    state.registrationSuccessful = false;
  },
  setLogoutSuccessful(state, isSuccessful) {
    state.logoutSuccessful = isSuccessful;
  },
  setPasswordChanged(state, isChanged) {
    state.passwordChanged = isChanged;
  },
  setProfileUpdated(state, isUpdated) {
    state.profileUpdated = isUpdated;
  },
  setRegistrationSuccessful(state, isSuccessful) {
    state.registrationSuccessful = isSuccessful;
  }
};

export const actions = {
  async nuxtServerInit({}) {},

  // Adonis Persona Auth Actions

  // verify a newly create user's account from an email token link
  async verifyEmailWithToken({ commit }, token) {
    await this.$axios
      .$get(`/auth/verify-email?token=${token}`)
      .then(response => console.log(response))
      .catch(e => console.log(e));
  },

  // update a user's edited profile
  async updateUserProfile({ commit, dispatch }, user) {
    // add image to static folder before update user profile
    dispatch("updateProfilePic", user);
    await this.$axios
      .$patch("/auth/update", user)
      .then(response => {
        console.log(response);
        this.$auth.setUser(response);
        commit("setProfileUpdated", true);
      })
      .catch(error => console.log(error));
  },

  // sync add new user photo to images folder and update user profile image source
  updateProfilePic({ commit }, user) {
    // new images must be post to Adonis via form data through axios
    let formData = new FormData();
    formData.append("profile_image_source", user.profile_image_source);
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
      })
      .catch(e => console.log(error));
  },

  // change password from user profile
  async updateUserPassword({ commit, dispatch }, updatePassword) {
    console.log(JSON.parse(JSON.stringify(updatePassword)));
    await this.$axios
      .$patch("/auth/update/password", updatePassword)
      .then(response => {
        console.log(response);
        commit("setPasswordChanged", true);
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
        this.$toast.error(`Password update error: ${error}`).goAway(5000)
      );
  },

  // generate a forgot password email with token link and send to user
  async forgotPasswordLink({ commit }, email) {
    console.log(email);
    await this.$axios
      .$get(`/auth/forgot/password?uid=${email}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  }
};
