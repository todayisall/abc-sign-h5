<template>
  <div class="login">
    <div class="logo">
      <img src="@/assets/images/login/logo.png" alt="logo" />
    </div>
    <div class="main">
      <form ref="ruleForm" :model-value="formData">
        <div class="form-content">
          <!-- 用户名和密码, 带有左侧logo的input -->
          <nut-input v-model="formData.userName" class="nut-input-text" placeholder="请输入用户名" type="text">
            <template #left> <img class="input-icon" src="@/assets/images/login/user.png" alt="user" /> </template>
          </nut-input>
          <nut-input v-model="formData.password" class="nut-input-text" placeholder="请输入密码" type="password">
            <template #left> <img class="input-icon" src="@/assets/images/login/password.png" alt="password" /> </template>
          </nut-input>
          <van-checkbox class="remember" v-model="formData.remember" checked-color="#7863fc">
            <span style="color: #d1cefd">记住账号密码</span></van-checkbox
          >
          <!-- 记住密码radio -->
          <nut-button class="submit-btn" block type="info" @click="submit"> 登录 </nut-button>
          <div class="tips"> 没有账号? <router-link to="/register">立即注册</router-link> </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup name="LoginPage">
  import { useRouter } from 'vue-router';
  import { reactive, ref, onMounted } from 'vue';

  // vant toast
  import { showToast } from 'vant';

  import { login, getUserInfo } from '@/api/index';

  const router = useRouter();

  onMounted(() => {
    // 如果本地有账号密码, 则自动填充
    if (localStorage.getItem('userName')) {
      formData.userName = localStorage.getItem('userName') as string;
    }
    if (localStorage.getItem('password')) {
      formData.password = localStorage.getItem('password') as string;
    }
  });
  const formData = reactive({
    password: '',
    userName: '',
    remember: true,
  });
  const ruleForm = ref<any>(null);
  const submit = () => {
    // 表单校验
    // 如果用户名为空, 则给出提示
    if (!formData.userName) {
      showToast({
        message: '请输入用户名',
      });
      return;
    }
    // 如果密码为空, 则给出提示
    if (!formData.password) {
      showToast('请输入密码');
      return;
    }

    login(formData).then((res: any) => {
      // 提示登录成功, 并跳转到首页
      showToast('登录成功');

      // 如果选择记住账号密码, 则保存在本地
      if (formData.remember) {
        localStorage.setItem('userName', formData.userName);
        localStorage.setItem('password', formData.password);
      }
      // 保存token
      localStorage.setItem('token', res.data);

      // 查询个人信息
      getUserInfo().then((res: any) => {
        // 保存个人信息
        localStorage.setItem('userInfo', JSON.stringify(res.data));
      });
      router.replace('/communication');
    });
  };
</script>

<style scoped lang="scss">
  .login {
    background: url('@/assets/images/login/login_bg.png') no-repeat center center;
    background-size: cover;
    padding: 20px;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;

    .logo {
      position: relative;
      top: 180px;
      width: 180px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .main {
      position: relative;
      top: 24%;
    }
    .remember {
      margin-top: 32px;
    }
    .form-content {
      background-color: transparent;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 46px;
      .nut-input-text {
        height: 80px;
        width: 100%;
        background: #ffffff;
        border: 1px solid #ffffff;
        border-radius: 40px;
        margin-bottom: 20px;

        .input-icon {
          margin-left: -16px;
          width: 32px;
          height: 32px;
        }
      }
      .tips {
        padding-top: 36px;
        color: #ffffff;
        font-size: 32px;
        margin-top: 20px;
        a {
          color: #ffffff;
          text-decoration: underline;
        }
      }
      .nut-radio__label {
        color: #d1cefd;
      }

      .submit-btn {
        margin-top: 40px;
        height: 80px;
        width: 100%;
        background: linear-gradient(90deg, #ffd74b 0%, #ffba19 100%);
        box-shadow: 0px 10px 20px 0px rgba(255, 188, 28, 0.2);
        border-radius: 40px;
        font-size: 28px;
        font-weight: bold;
      }
    }
  }
</style>
