import { createStore } from 'vuex';
import coachesModule from './modules/coaches/index.js';
import requestsModules from './modules/requests/index.js';
import authModule from './modules/auth/index';

const store = createStore({
  modules: {
    auth: authModule,
    coaches: coachesModule,
    requests: requestsModules,
  },



});

export default store;
