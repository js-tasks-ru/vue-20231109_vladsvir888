import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router/index.js';
import { createProgress } from './plugins/progress/index.js';

const progress = createProgress({ router });

createApp(App).use(router).use(progress).mount('#app');
