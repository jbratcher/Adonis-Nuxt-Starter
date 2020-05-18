export const state = () => ({
  resources: [],
  resource: {},
  userResources: []
});

export const getters = {};

export const mutations = {
  addNewResourceToResources(state, resource) {
    state.resources.push(resource);
  },
  editResourceInResourcesArray(state, { editedResource, index }) {
    if (index > -1) {
      Object.assign(state.resources[index], editedResource);
    } else {
      state.resources.push(editedResource);
    }
  },
  removeResourceFromResources(state, index) {
    state.resources.splice(index, 1);
  },
  setResource(state, resource) {
    state.resource = resource;
  },
  setResources(state, resources) {
    state.resources = resources;
  },
  setUserResources(state, userResources) {
    state.userResources = userResources;
  }
};

export const actions = {
  // fetch all resources
  async fetchResources({ commit }) {
    await this.$axios
      .$get(`/resources/`)
      .then(data => {
        commit("setResources", data);
      })
      .catch(error => {
        console.log(`Fetch resources error: ${error}`);
      });
  },
  async fetchResourcesByUser({ commit }) {
    // todo
  },
  // fetch resources by id
  async fetchResource({ commit }, id) {
    await this.$axios
      .$get(`/resources/${id}`)
      .then(data => {
        commit("setResource", data);
      })
      .catch(error => {
        console.log(`Fetch resource error: ${error}`);
      });
  },
  // create a new resource
  async createResource({ commit }, resource) {
    console.log(`Creating resource`);
    await this.$axios
      .$post("/resources/", {
        name: resource.name,
        quantity: resource.quantity
      })
      .then(data => {
        commit("setResource", data);
        commit("addNewResourceToResources", data);
      })
      .catch(error => {
        console.log(`Create event error: ${error}`);
      });
  },
  // update a resource
  async updateResource({ commit }, resource) {
    console.log(`Resource: ${JSON.stringify(resource)}`);
    await this.$axios
      .$patch(`/resources/${resource.id}`, resource)
      .then(data => console.log(data))
      .catch(error => console.log(error));
  },
  // delete a resource
  async deleteResource({ commit }, resource) {
    await this.$axios
      .$delete(`/resources/${resource.id}`)
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }
};
