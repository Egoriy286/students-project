import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      auth: null, // Global authentication variable
    };
  },
  mutations: {
    setAuth(state, payload) {
      state.auth = payload; // Mutation to change the auth state
    },
  },
  actions: {
    login({ commit }, user) {
      // Simulate login
      commit('setAuth', user);
    },
  },
});

export default store;
