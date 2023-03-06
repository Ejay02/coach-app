export default {
  userId(state) {
    return state.userId;
  },

  token(state) {
    return state.token;
  },

  isAuthenticated(state) {
    return !!state.token; //!! converts truthy/falsy values to boolean
  },

  didAutoLogout(state) {
    return state.didAutoLogout;
  },
};
