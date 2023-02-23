import { createRouter, createWebHistory } from 'vue-router';
import coachDetail from './pages/coaches/coachDetail.vue';
import coachesList from './pages/coaches/coachesList.vue';
import coachRegistration from './pages/coaches/coachRegistration.vue';
import contactCoach from './pages/requests/contactCoach.vue';
import requestRecieved from './pages/requests/requestsRecieved.vue';
import NotFound from './pages/NotFound.vue';

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
    },
    {
      path: '/requests',
      component: requestRecieved,
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

export default router;
