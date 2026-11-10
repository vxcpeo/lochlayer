import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/cobalt.css';
import './styles/cobalt-report.css';

createApp(App).use(router).mount('#app');
