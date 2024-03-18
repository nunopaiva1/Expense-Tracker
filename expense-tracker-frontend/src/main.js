import { createApp } from 'vue';
import App from './App.vue';

// Import Bootstrap CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

// Create a new Vue application
const app = createApp(App);

// Mount the root component to the DOM
app.mount('#app');