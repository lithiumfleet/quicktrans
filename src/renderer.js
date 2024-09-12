import './index.css';
import { createApp } from 'vue';
import App from './App.vue';

import { createWebHistory, createRouter } from 'vue-router'

import MainPage from '@src/Component/MainPage.vue';
import SettingPaddle from '@src/Component/SettingPaddle.vue';

const routes = [
  { path: '/main', component: MainPage },
  { path: '/', component: SettingPaddle }
]

const router = createRouter({
  history: createWebHistory(), // not createMemoryHistory
  routes,
})


createApp(App)
    .use(router)
    .mount('#app');
