<template>
  <div class="login">
    <div class="login-form">
      <div class="title">
        <span class="cn">登录</span>
        /Sign Up
      </div>
      <el-input
        v-model="userName"
        class="ipt"
        size="large"
        placeholder="用户名"
        @blur="validateName"
      >
      </el-input>
      <el-input
        v-model="userName"
        class="ipt"
        size="large"
        placeholder="密码"
        @blur="validateName"
      >
      </el-input>
      <div class="save-pwd">
        <el-checkbox v-model="checked">记住密码</el-checkbox>
      </div>
      <el-button type="primary" class="btn" @click="login">登录</el-button>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      userName: '' // 用户名
    }
  },
  methods: {
    validateName (value) {
      console.log(value, 111);
    },
    login () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('../../assets/background.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .login-form {
    color: #000;
    position: absolute;
    left: 60%;
    top: 30%;
    width: 30rem;
    height: 35rem;
    padding: 2rem 1.5rem 0;
    background-color: #fff;
    border-radius: 2rem;

    .title {
      font-size: 2rem;
      text-align: center;
      margin: 3rem 0;

      .cn {
        font-weight: bold;
        font-size: 2.5rem;
      }
    }
    .save-pwd {
      font-size: 1.4rem;
      margin-bottom: 1rem;
    }
    .ipt {
      margin-bottom: 2rem;
    }
    .btn {
      width: 100%;
    }
  }
}
</style>
