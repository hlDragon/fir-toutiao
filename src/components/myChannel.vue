<template>
  <el-select
    :value="value"
    @change="fn"
    placeholder="请选择"
    clearable
  >
    <el-option
      v-for="item in channelOptions"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'myChannel',
  props: ['value'],
  // watch: {
  //   'reqParams.channel_id': function (newVal, oldVal) {
  //     if (newVal === '') {
  //       this.reqParams.channel_id = null
  //     }
  //   }
  // },
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (val) {
      if (!val) val = null
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped lang='less'></style>
