import './main.css';

import { createApp } from 'vue';

import directive from '@/directive';
import pinia from '@/stores';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(directive);
app.use(pinia);
app.use(router);
app.mount('#app');
