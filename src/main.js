import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/style/index.less'
// @ 是某一路径别名  src路径别名 在vue-cli创建的项目下才可以使用
// 目录下是有默认索引文件 index.js 就是索引文件 导入顺序：index.js index.vue index.json 报错
import router from '@/router'

import axios from '@/api'
Vue.prototype.$http = axios

// 控制台输出信息，不使用生产阶段提示，使用开发阶段提示，更详细，上线后改成true
// 加载所有资源
// 根实例

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
