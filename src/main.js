// import './assets/main.css'
// import "./assets/css/ayoflex.css";
import 'ayoflex/dist/ayoflex.min.css';

import './assets/css/example.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
