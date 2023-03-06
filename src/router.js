import { createRouter, createWebHistory } from 'vue-router';
import coachDetail from './pages/coaches/coachDetail.vue';
import coachesList from './pages/coaches/coachesList.vue';
import coachRegistration from './pages/coaches/coachRegistration.vue';
import contactCoach from './pages/requests/contactCoach.vue';
import requestRecieved from './pages/requests/requestsRecieved.vue';
import NotFound from './pages/NotFound.vue';
import userAuth from './pages/auth/userAuth.vue';
import store from './store/index';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
    },
    {
      path: '/coaches',
      component: coachesList,
    },
    {
      path: '/coaches/:id',
      component: coachDetail,
      props: true,
      children: [{ path: 'contact', component: contactCoach }], // coaches/id1/contact
    },
    {
      path: '/register',
      component: coachRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: requestRecieved,
      meta: { requiresAuth: true },
    },
    {
      path: '/auth',
      component: userAuth,
      meta: { requiresUnauth: true },
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, _1, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
