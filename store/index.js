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

  async verifyEmailWithToken({ commit }, token) {
    console.log(token);
    await this.$axios
      .$get(`/auth/verify-email?token=${token}`)
      .then(response => console.log(response))
      .catch(e => console.log(e));
  }
};
