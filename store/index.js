export const state = () => ({});

export const getters = {
  isAuthenticated(state) {
    console.log(`Checking user authentication...`);
    return state.auth.loggedIn;
  },

  loggedInUser(state) {
    console.log(`Fetching current user info...`);
    return state.auth.user;
  }
};

export const mutations = {};

export const actions = {
  async nuxtServerInit({}) {},

  // Adonis Persona Auth Actions

  // verify a newly create user's account from an email token link
  async verifyEmailWithToken({ commit }, token) {
    console.log(token);
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
      })
      .catch(error => console.log(error));
  },

  // password reset method
  async updateUserPasswordByToken({ commit }, payload) {
    console.log(payload.updatePassword.password);
    console.log(payload.updatePassword.password_confirmation);
    console.log(payload.token);
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
      .then(response => console.log(response))
      .catch(e => console.log(e));
  },

  // generate a forgot password email with token link and send to user
  async forgotPasswordLink({ commit }, email) {
    console.log(JSON.parse(JSON.stringify(email)));
    await this.$axios
      .$get(`/auth/forgot/password?uid=${email}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  }
};
