import { createApp, h } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';

import './style.scss';
import './assets/css/main.scss';

const app = createApp({
  render: () => h(App),
});
app.use(createPinia());

app.use(router);

app.mount('#app');

/* import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);
app.use(createPinia()); 
app.mount('#app'); */