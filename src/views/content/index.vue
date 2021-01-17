<template>
 <div class="content-container">
  <el-card class="content-head">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索栏 -->
    <el-form ref="content" :model="content" label-width="50px" size="mini">
      <el-form-item label="状态">
        <el-radio-group v-model="content.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="content.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card class="box-card">
    共有7777777条数据
    <!-- 表格展示 -->
    <el-table
      :data="articles"
      stripe
      style="width: 100%">
      <el-table-column
        prop="cover"
        label="封面">
        <template slot-scope="scope">
          <img class="content-img" v-if="scope.row.cover.images[0]" :src="scope.row.cover.images[0]">
          <img class="content-img" v-else src="@/assets/img/content/noP.jpg">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <el-tag :type="articleStatus[scope.row.status].showType">
            {{articleStatus[scope.row.status].text}}
            </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template>
          <el-button size="mini" circle type="danger" icon="el-icon-edit">
          </el-button>
          <el-button size="mini" circle type="primary" icon="el-icon-delete">
          </el-button>
      </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      background
      :page-size="perPage"
      @current-change="pageChange"
      :total="articleTotalNum">
    </el-pagination>
  </el-card>
 </div>
</template>

<script>
import { getContent } from '@/api/content'

export default {
  name: 'ContentIndex',
  data () {
    return {
      date: '',
      content: {
        name: '',
        region: '',
        resource: ''
      },
      articles: [],
      articleStatus: [
        { text: '草稿', showType: 'info' },
        { text: '待审核', showType: '' },
        { text: '审核通过', showType: 'success' },
        { text: '审核失败', showType: 'warning' },
        { text: '删除', showType: 'danger' }
      ],
      perPage: 10, // 每页数据展示条数
      articleTotalNum: 0
    }
  },
  methods: {
    loadContent (page = 1) {
      getContent({
        page,
        per_page: this.perPage
      }).then(res => {
        const resArticle = res.data.data
        this.articles = resArticle.results
        this.articleTotalNum = resArticle.total_count
      })
    },

    pageChange (page) {
      this.loadContent(page)
    }
  },
  components: {},
  created () {
    this.loadContent(1)
  }
}
</script>

<style lang='scss' scoped>
.content-head {
  margin-bottom: 20px;
}

.content-img {
  width: 80px;
  background-size: cover;
}
</style>
