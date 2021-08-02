import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

import loanStateModule from './loan/index.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    loan: loanStateModule
  },
  state: {
    isLoggedIn: false,
    loggedInUser: {}
  },
  mutations: {
    login(state, data) {
      state.loggedInUser = { ...data.data };
      console.log(state.loggedInUser);
    }
  },
  actions: {
    login(context, payload) {
      return axios.post("http://localhost:3000/api/user/login", payload)
        .then(response => {
          context.commit('login', response);
          return response;
        })
        .catch(err => {
          throw err;
        })
    },
    register(context, payload) {
      return axios.post('http://localhost:3000/api/user', payload)
        .then(response => {
          context.commit('login', response);
          return response;
        })
        .catch(err => {
          throw err;
        })
    }
  },
});

export default store;