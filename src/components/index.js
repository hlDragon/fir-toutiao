import MyBread from '@/components/mybread'
import myChannel from '@/components/myChannel'

export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(myChannel.name, myChannel)
  }
}
