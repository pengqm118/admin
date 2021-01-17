<template>
 <div class="header">
   <div class="title">
     <i :class="`el-icon-s-${foldState}`" @click="clickCollapse()"> </i>
     <div>向海贼王进击的火影忍者</div>
   </div>
   <el-dropdown trigger="click">
      <div class="user-info">
        <img :src="user.photo">
        <span>{{user.name}}</span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>登录</el-dropdown-item>
        <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
 </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    user: Object
  },
  data () {
    return {
      isCollapse: false,
      foldState: 'unfold'
    }
  },
  methods: {
    clickCollapse () {
      this.isCollapse = !this.isCollapse
      this.$store.state.isCollapse = this.isCollapse
      this.foldState = this.isCollapse ? 'fold' : 'unfold'
    },
    logOut () {
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        // 刷新页面
        location.reload(true)
        this.$message({
          type: 'success',
          message: '成功退出!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  },
  components: {

  }
}
</script>

<style lang='scss' scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .title {
    display: flex;
    align-items: center;
    i {
      margin-right: 10px;
    }
  }
  .user-info {
    display: flex;
    margin-right: 10px;
    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }

}
</style>
