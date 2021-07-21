<template>
  <div class="login">
    <el-form
      ref="loginForm"
      class="login-form"
      status-icon
      :rules="loginRules"
      :model="loginForm"
      label-width="0"
    >
      <el-form-item class="title">
        <span class="cn">登录</span>
        /Sign Up
      </el-form-item>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="请输入用户名"
          name="loginName"
          @keyup.enter="handleLogin"
        >
          <template #prefix>
            <i class="el-icon-user"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          name="password"
          :type="passwordType"
          auto-complete="off"
          placeholder="请输入密码"
          @keyup.enter="handleLogin"
        >
          <template #suffix>
            <i
              class="el-icon-view el-input__icon"
              @click="showPassword"
            ></i>
          </template>
          <template #prefix>
            <i class="el-icon-user"></i>
          </template>
        </el-input>
      </el-form-item>
      <!-- <el-form-item prop="checked">
        <el-checkbox v-model="loginForm.checked">记住密码</el-checkbox>
      </el-form-item> -->
      <el-form-item>
        <el-button
          type="primary"
          class="login-submit"
          @click.prevent="handleLogin"
        >登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginForm: {
        username: '', // 默认登录时的用户名和密码
        password: '',
        code: '',
        redomStr: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' }
        ]
      },
      passwordType: 'password'
    }
  },
  methods: {
    handleLogin() {
      console.log(this.loginForm, 123);
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // console.log(this.loginForm)
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then((res) => {
              console.log(res, 100);
              this.$router.push({ path: '/' });
              // this.uid = JSON.parse(
              //   sessionStorage.getItem('user')
              // ).user.user_id;
              // 获取权限
              // this.getAuthority({ userId: this.$store.state.user.user_id });
            })
            .catch(() => {
              // this.refreshCode();
              // this.$emit('closeLogin', false)
            });
        }
      });
    },
    showPassword() {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '');
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
    .login-submit {
      width: 100%;
    }
  }
}
</style>
