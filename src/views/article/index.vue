<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form
        label-width="80px"
        size="small"
      >
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dataArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="search()"
          >筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">
        根据筛选条件共查询到{{total}}条结果：
      </div>
    </el-card>
    <el-table :data="articles">
      <el-table-column
        prop="date"
        label="封面"
      >
        <template slot-scope="scope">
          <el-image
            :src="scope.row.cover.images[0]"
            fit="cover"
            style="width:120px;height:80px"
          >
            <div slot="error">
              <img
                src="../../assets/images/error.gif"
                style="width:120px;height:80px"
                alt=""
              >
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
      >
      </el-table-column>
      <el-table-column
        prop="date"
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.status === 0"
            type="info"
          >草稿</el-tag>
          <el-tag v-if="scope.row.status === 1">待审核</el-tag>
          <el-tag
            v-if="scope.row.status === 2"
            type="success"
          >审核通过</el-tag>
          <el-tag
            v-if="scope.row.status === 3"
            type="warning"
          >审核失败</el-tag>
          <el-tag
            v-if="scope.row.status === 4"
            type="danger"
          >删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间"
      >
      </el-table-column>
      <el-table-column
        width="120px"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="edit(scope.row.id)"
          ></el-button>
          <el-button
            plain
            type="danger"
            @click="del(scope.row.id)"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align:center;margin-top:30px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      channelOptions: [],
      dataArr: [],
      articles: [],
      total: 0
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    edit (id) {
      this.$router.push('/publish?id=' + id)
    },
    del (id) {
      // 弹出确认框 点击确认后  发删除请求  响应成功更新列表即可
      this.$confirm('亲，此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 点击确认
          await this.$http.delete(`articles/${id}`)
          // 这两句代码没有执行  上面一句代码报错  没有抛出这个错误
          this.$message.success('删除文章成功')
          this.getArticles()
        })
        .catch(() => {})
    },
    changeDate (dateArr) {
      // 严谨一些，清空数据考虑在内
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    search () {
      // 筛选项双向绑定  拿着对应的数据发请求即可  注意：重新筛选后页码第一页
      this.reqParams.page = 1
      this.getArticles()
    },
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    }
  }
}
</script>

<style scoped lang='less'>
.el-card {
  margin-bottom: 20px;
}
</style>
