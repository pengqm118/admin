<template>
   <el-menu
      default-active="/"
      class="nav-menu"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="$store.state.isCollapse"
      router
      >
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index='/content'>
        <i class="el-icon-document"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-picture-outline"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-position"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
            <el-menu-item index="6">
        <i class="el-icon-help"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
            <el-menu-item index="7">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: 'AsideMenu',
  props: {
  },
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style lang='scss' scoped>

</style>
