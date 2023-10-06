<!-- 注册界面 -->
<template>
  <div class="login">
    <div class="logo">
      <img src="@/assets/images/login/logo.png" alt="logo" />
    </div>
    <div class="main">
      <form ref="ruleForm" :model-value="formData">
        <div class="form-content">
          <input v-model="formData.userName" class="nut-input-text" placeholder="请输入用户名" type="text" />
          <input v-model="formData.password" class="nut-input-text" placeholder="请输入密码" type="password" />
          <input v-model="formData.conformPwd" class="nut-input-text" placeholder="重复密码" type="password" />
          <nut-button class="submit-btn" block type="info" @click="submit"> 登录 </nut-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup name="LoginPage">
  import { useRouter } from 'vue-router';
  import { reactive, ref } from 'vue';
  import { showToast } from '@nutui/nutui';
  import { register } from '@/api/index';

  const router = useRouter();
  const formData = reactive({
    name: '',
    pwd: '',
    conformPwd: '',
    userType: '1',
  });
  const ruleForm = ref<any>(null);
  const submit = () => {
    // todo 校验表单数据
    register(formData).then((res: any) => {
      showToast.text('注册成功');
      setTimeout(() => {
        router.push('/login');
      }, 300);
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
      }

      .submit-btn {
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
