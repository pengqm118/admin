<template>
 <div class="login-container">
   <el-form class="login-form" ref="login-form" :model="user" :rules="formRules">
   <div class="logo"></div>
    <el-form-item prop="mobile">
      <el-input v-model="user.mobile" placeholder="请输入电话号码"></el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
    </el-form-item>
    <el-form-item prop="isAgree">
      <el-checkbox v-model="user.isAgree">同意服务条款、隐私政策、儿童隐私政策</el-checkbox>
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click="onLogin" class="login-submit" :loading="loginLoading">登录</el-button>
    </el-form-item>
  </el-form>
 </div>
</template>

<script>
import { login } from '@/api/user.js'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        isAgree: '' // 勾选服务条款
      },
      loginLoading: false, // Loding加载状态
      formRules: {
        mobile: [
          { required: true, message: '输入电话号码不能为空!', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '输入长度必须为11位', trigger: 'change' }
        ],
        code: [
          { required: true, message: '输入验证码不能为空!', trigger: 'change' },
          { pattern: /\d{6}/, message: '输入长度必须为6位', trigger: 'change' }
        ],
        isAgree: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请勾选用户协议'))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      this.$refs['login-form'].validate(valid => {
        if (!valid) {
          return ''
        }
        // 验证通过，请求登录
        this.Login()
      })
    },
    Login () {
      const user = this.user
      this.loginLoading = true

      login(user).then(res => {
        this.$message({
          message: '恭喜你，登录成功!',
          type: 'success'
        })

        // 禁止点击登录按钮
        this.loginLoading = false

        // 存储用户信息
        window.localStorage.setItem('user', JSON.stringify(res.data.data))

        // 跳转路由到首页
        this.$router.push({
          name: 'home'
        })
      }
      ).catch(err => {
        console.log('登陆失败', err)
        this.$message.error('输入错误!')

        // 禁止点击登录按钮
        this.loginLoading = false
      })
    }
  },
  components: {

  }
}
</script>

<style lang='scss' scoped>
.login-container {
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url('~@/assets/img/user/haizeiwang.jpg') no-repeat;
  background-size: cover;
  .logo {
    height: 120px;
    min-width: 200px;
    margin-bottom: 20px;
    background: url('~@/assets/img/user/eye.jpg') no-repeat;
    background-size: cover;
  }
  .login-form {
    background: #fff;
    min-width: 200px;
    padding: 20px;
    .login-submit {
      width: 100%;
    }
  }
}
</style>
