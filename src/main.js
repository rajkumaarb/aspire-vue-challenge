import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import Fragment from 'vue-fragment';
import VueRouter from 'vue-router';
import routes from './routes.js';
import store from './store/index.js';

import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false
Vue.use(Antd);
Vue.use(Fragment.Plugin);
Vue.use(VueRouter);

const router = new VueRouter({ routes })

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
