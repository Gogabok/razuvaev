import { createApp } from 'vue'
import './assets/styles/main.scss';
import router from './router/index';
import App from './App.vue';

const app = createApp(App);
app.use(router);
app.mount('#app')