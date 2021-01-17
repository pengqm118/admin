import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入第三方组件库
import ElementUI from 'element-ui'

// 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css'

import './styles/index.scss'

// 全局注册element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
