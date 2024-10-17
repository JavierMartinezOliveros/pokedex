import { createApp, h } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';

import './style.scss';
import './assets/css/main.scss';

const app = createApp({
  render: () => h(App),
});

app.use(router);
app.use(createPinia());

app.mount('#app');
