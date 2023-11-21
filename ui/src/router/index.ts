import { createRouter, createWebHashHistory } from 'vue-router';
import WorksView from '../views/WorksView.vue';
import WorksDetailsView from '../views/WorksDetailsView.vue';
import BiographyView from '../views/BiographyView.vue';

const routes = [
  {
    path: '/',
    redirect: '/works'
  },
  {
    path: '/works',
    component: WorksView
  },
  {
    path: '/works/:id',
    component: WorksDetailsView
  },
  {
    path: '/bio',
    component: BiographyView
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
  routes
});

export default router;