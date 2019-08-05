<template>
  <div>文章页</div>
</template>

<script>
export default {
  created () {
    this.$http.get('articles').then(res => {
      console.log(res.data)
    })
  }
}
</script>

<style scoped lang='less'></style>
