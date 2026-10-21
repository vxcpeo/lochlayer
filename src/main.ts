import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/signal.css';
import './styles/signal-report.css';

createApp(App).use(router).mount('#app');
