import MyBread from '@/components/mybread'
import myChannel from '@/components/myChannel'
import MyImage from '@/components/my-image'

export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(myChannel.name, myChannel)
    Vue.component(MyImage.name, MyImage)
  }
}
