<template>
  <div class='container'>
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn_box">
        <el-radio-group
          v-model="reqParams.collect"
          size="small"
          @change="changeCollect"
        >
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          type="success"
          size="small"
          style="float:right"
          @click="openDialog()"
        >添加素材</el-button>
      </div>
      <div class="img_list">
        <div
          class="img_item"
          v-for="item in images"
          :key="item.id"
        >
          <img
            :src="item.url"
            alt=""
          >
          <div
            class="footer"
            v-show="!reqParams.collect"
          >
            <span :class="item.is_collected?'el-icon-star-on':'el-icon-star-off'"></span>
            <span class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <div
        class="page"
        style="text-align:center"
      >
        <el-pagination
          v-if="total > reqParams.per_page"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="changePage"
        >
        </el-pagination>
      </div>
    </el-card>
    <el-dialog
      title="添加素材"
      :visible.sync="dialogVisible"
      width="300px"
    >
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :headers="imgHeaders"
        name="image"
      >
        <img
          v-if="imageUrl"
          :src="imageUrl"
          class="avatar"
        >
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
        ></i>
      </el-upload>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      imgHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    openDialog () {
      this.imageUrl = null
      this.dialogVisible = true
    },
    handleAvatarSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    }
  }
}
</script>

<style scoped lang='less'>
.img_list {
  margin-top: 20px;
  .img_item {
    display: inline-block;
    position: relative;
    width: 160px;
    height: 160px;
    border: 1px dashed #ddd;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
      // display: block;
    }
    .footer {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      text-align: center;
      span {
        margin: 0 20px;
        cursor: pointer;
      }
      .el-icon-star-on {
        color: red;
        font-size: 20px;
      }
    }
  }
}
</style>
