<template>
 <div class="content-container">
  <el-card class="content-head">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
    </el-breadcrumb>
  </el-card>
  <el-card class="content-body">
    <!-- 搜索栏 -->
    <el-form ref="content" class="search-content" :model="content" label-width="50px" size="mini">
      <el-form-item label="状态">
        <el-radio-group v-model="status">
          <el-radio label="null">全部</el-radio>
          <el-radio label="0">草稿</el-radio>
          <el-radio label="1">待审核</el-radio>
          <el-radio label="2">审核通过</el-radio>
          <el-radio label="3">审核失败</el-radio>
          <el-radio label="4">删除</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="channelId" placeholder="请选择">
          <el-option
          label="全部"
          :value="null"
          ></el-option>
          <el-option
          v-for="item in articleChannels"
          :key="item.id"
          :label="item.name"
          :value="item.id"
          ></el-option>
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
      <el-form-item>
        <el-button type="primary" @click="onSearch()">搜索</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card class="box-card">
    共有{{articleTotalNum}}条数据
    <!-- 表格展示 -->
    <el-table
      :data="articles"
      stripe
      style="width: 100%">
      <el-table-column
        prop="cover"
        label="封面">
        <template slot-scope="scope">
          <!-- <img class="content-img" v-if="scope.row.cover.images[0]" :src="scope.row.cover.images[0]">
          <img class="content-img" v-else src="@/assets/img/content/noP.jpg"> -->
          <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.cover.images[0]"
          lazy
          fit="cover">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
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
import {
  getContent,
  getContentChannels
} from '@/api/content'

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
      articleTotalNum: 0,
      status: null, // 文章筛选状态，请求体参数之一
      articleChannels: [], // 分类类型
      channelId: null
    }
  },
  methods: {
    // 加载数据
    loadContent (page = 1) {
      getContent({
        page,
        per_page: this.perPage,
        status: this.status,
        channel_id: this.channelId
      }).then(res => {
        // console.log(res)
        const resArticle = res.data.data
        this.articles = resArticle.results
        this.articleTotalNum = resArticle.total_count
      })
    },
    loadContentChannels () {
      getContentChannels().then(res => {
        // console.log(res)
        this.articleChannels = res.data.data.channels
      })
    },

    // 结合分页栏点击事件取请求对应页内容
    pageChange (page) {
      this.loadContent(page)
    },

    // 搜索相关内容
    onSearch () {
      this.loadContent()
    }
  },
  components: {},
  created () {
    this.loadContent(1)
    this.loadContentChannels()
  }
}
</script>

<style lang='scss' scoped>
.content-head {
  margin-bottom: 2px;
  border-bottom: 1px solid #ccc;
}

.content-img {
  width: 80px;
  background-size: cover;
}

.el-icon-picture-outline {
  width: 100px;
  height: 100px;
}
</style>
