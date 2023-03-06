import mutations from './mutations.js';
import actions from './actions';
import getters from './getters';

export default {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false,
    };
  },
  mutations,
  getters,
  actions,
};
