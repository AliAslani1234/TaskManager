import { createStore } from 'vuex'

export default createStore({
  state: {
    userRole: localStorage.getItem('userRole') || null,
    userImage: localStorage.getItem('userImage') || null,
    userId:localStorage.getItem('userId') || null,
    tokenId: localStorage.getItem('tokenId') || null,
  },
  getters: {

  },
  mutations: {
    SET_USER_ROLE(state, role) {
      state.userRole = role;
      localStorage.setItem('userRole', role);
    },
    CLEAR_USER_ROLE(state) {
      state.userRole = null;
      localStorage.removeItem('userRole');
    },
    SET_USER_IMAGE(state , image){
      state.userImage = image;
      localStorage.setItem('userImage', image);
    },
    SET_USER_ID(state, id) {
      state.userId = id;
      localStorage.setItem('userId', id);
    },
    SET_TOKEN_ID(state, token) {
      state.tokenId = token;
      localStorage.setItem('tokenId', token);
    },
    CLEAR_TOKEN_ID(state) {
      state.tokenId = null;
      localStorage.removeItem('tokenId');
    },
  },
  actions: {
    setUserRole({ commit }, { role }) {
    
      commit('SET_USER_ROLE', role);
    },
    clearUserRole({ commit }) {
      commit('CLEAR_USER_ROLE');
    },
    setUserImage({ commit }, { image }) {
      commit('SET_USER_IMAGE', image);
    },
    setUserId({ commit }, { id }) {
      commit('SET_USER_ID', id);
    },
    setTokenId({ commit }, { token }) {
      commit('SET_TOKEN_ID', token);
    },
    cleareTokenId({ commit }) {
      commit('CLEAR_TOKEN_ID');
    },
  },
  modules: {
  }
})
