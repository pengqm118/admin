<template>
<el-container class="layout-container">
  <el-aside class="aside" width="auto">
    <aside-menu class="aside-menu"/>
  </el-aside>
  <el-container>
    <el-header class="header-container" style="height: 50px">
      <header-menu :user="user" />
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import AsideMenu from './childComponents/Aside'
import HeaderMenu from './childComponents/Header'

// 数据请求
import { getUserProfile } from '@/api/user'

export default {
  name: 'LayoutIndex',
  data () {
    return {
      user: {} // 存储用户信息，用于请求用户数据展示头像等
    }
  },
  components: {
    AsideMenu,
    HeaderMenu
  },
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    }
  },
  created () {
    this.loadUserProfile()
  }
}
</script>

<style lang='scss' scoped>
.layout-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .aside {
    background-color: rgb(211, 220, 230);
    .aside-menu {
      height: 100%;
    }
  }
  .header-container {
    padding: 0;
    background-color: rgb(233, 238, 243);
  }
}
</style>
