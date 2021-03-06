import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/reset.css'
// 引入axios
import axios from 'axios'
// 创建axios实例
const service = axios.create({
  baseURL: '/api',  // 根路径
  timeout: 500000   // 请求超时时间
});
Vue.prototype.$service = service;

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
