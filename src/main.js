import Vue from 'vue'
import App from './App.vue'
// 控制台输出信息，不使用生产阶段提示，使用开发阶段提示，更详细，上线后改成true
// 加载所有资源
// 根实例
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
