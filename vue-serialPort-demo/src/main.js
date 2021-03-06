// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import axios from 'axios'
// import VueAxios from 'vue-axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

// Vue.use(VueAxios, axios)
// Vue.prototype.$axios = axios

import api from '@/api/index' // 统一输出接口
Vue.prototype.$api = api
// import * as webSocket from '@/utils/socket'
// Vue.prototype.$webSocket = webSocket

Vue.use(ElementUI);

// axios.defaults.baseURL = '/api'
// axios.defaults.headers.post['Content-Type'] = 'application/json'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
