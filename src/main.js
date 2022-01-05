import Vue from 'vue'
import App from './App.vue'
import store from '@/store/store';
import router from './router'
import Axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'


Vue.config.productionTip = false;

Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
