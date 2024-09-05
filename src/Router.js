import { createMemoryHistory, createRouter } from 'vue-router'

import TranslateView from './Component/TranslateView.vue';
import RewriteView from './Component/RewriteView.vue';

const routes = [
  { path: '/', component: TranslateView },
  { path: '/translate', component: TranslateView },
  { path: '/rewrite', component: RewriteView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;