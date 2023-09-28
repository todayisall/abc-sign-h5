<template>
  <div class="nav-bar">
    <div class="nav-bar__left" @click="goLogin">
      <van-icon name="arrow-left" size="20px" color="#fff" />
    </div>
    <div class="nav-bar__title">{{ props.title }}</div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import { defineProps } from 'vue';

  const router = useRouter();

  const goLogin = () => {
    // 返回上一级菜单
    router.go(-1);
  };

  // 属性 title
  const props = defineProps({
    title: {
      type: String,
      default: '默认标题',
    },
  });
</script>

<style lang="scss" scoped>
  .nav-bar {
    width: 100%;
    height: 100px;
    position: fixed;

    // 在安全区域内
    padding: env(safe-area-inset-top) 24px 0;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #fff;
  }
</style>
