import { createRouter, createWebHashHistory } from 'vue-router';
import WorksView from '../views/WorksView.vue';

const routes = [
  {
    path: '/',
    component: WorksView
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
  routes
});

export default router;