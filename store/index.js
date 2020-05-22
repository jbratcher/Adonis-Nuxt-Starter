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

  async verifyEmailWithToken({ commit }, token) {
    console.log(token);
    await this.$axios
      .$get(`/auth/verify-email?token=${token}`)
      .then(response => console.log(response))
      .catch(e => console.log(e));
  },

  async updateUserProfile({ commit, dispatch }, user) {
    console.log(JSON.parse(JSON.stringify(user)));
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
  }
};
