//import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios';

import App from './App.vue'
import router from './router'
import Dashboard from './Dashboard.vue'

// Check for token and set it to Axios headers if present
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const app = createApp(Dashboard)


app.use(createPinia())
app.use(router)

app.mount('#app')

if (document.querySelector('#navbarSideCollapse')!=null){
  document.querySelector('#navbarSideCollapse').addEventListener('click', function () {
    document.querySelector('.offcanvas-collapse').classList.toggle('open')
  })
}