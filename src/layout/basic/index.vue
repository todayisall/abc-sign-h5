<template>
  <div class="custom-header">
    <img :src="backgroundImg" alt="banner" />
  </div>
  <van-nav-bar :title="$route.meta.title" class="nav-bar" :border="false" />
  <div class="main-page" :class="{ tabbar: tabbarVisible, border: showBorder }">
    <RouterView v-slot="{ Component }" v-if="$route.meta.keepAlive">
      <keep-alive>
        <component :is="Component" :key="$route.path" />
      </keep-alive>
    </RouterView>
    <RouterView v-if="!$route.meta.keepAlive" :key="$route.path" />
  </div>
  <nut-tabbar unactive-color="#364636" active-color="#837df9" bottom v-model="activeTab" v-show="tabbarVisible" @tab-switch="tabSwitch">
    <nut-tabbar-item v-for="item in tabItem" :key="item.key" :tab-title="item.label" :icon="item.icon" />
  </nut-tabbar>
</template>

<script lang="ts" setup name="BasicLayoutPage">
  import { useRouter } from 'vue-router';
  import { Home, My, Checklist } from '@nutui/icons-vue';
  import homeTop from '@/assets/images/home-top.png';
  import contactTop from '@/assets/images/contact-top.png';
  import courseTop from '@/assets/images/course-top.png';
  import mineTop from '@/assets/images/mine-top.png';

  const tabItem = [
    { key: 'communication', icon: Home, label: '交流' },
    { key: 'course', icon: Checklist, label: '课程' },
    { key: 'mine', icon: My, label: '我的' },
  ];

  const router = useRouter();

  const activeTab = ref(0);

  const tabbarVisible = ref(true);

  const showBorder = ref(true);

  const backgroundImg = ref(homeTop);
  // 根据 activeTab 显示不同的背景图
  watch(
    () => activeTab.value,
    (val) => {
      switch (val) {
        case 0:
          backgroundImg.value = homeTop;
          break;
        case 1:
          backgroundImg.value = courseTop;
          break;
        case 2:
          backgroundImg.value = mineTop;
          break;
      }
    },
  );

  watch(
    () => router,
    () => {
      const judgeRoute = tabItem.some((item) => item.key === router.currentRoute.value.path.replace('/', ''));
      activeTab.value = tabItem.findIndex((item) => item.key === router.currentRoute.value.path.replace('/', ''));
      tabbarVisible.value = true;
      showBorder.value = judgeRoute;
    },
    { deep: true, immediate: true },
  );

  const tabSwitch = (_item, index) => {
    switch (index) {
      case 0:
        router.push('/communication');
        break;
      case 1:
        router.push('/course');
        break;
      case 2:
        router.push('/mine');
        break;
    }
    activeTab.value = index;
  };
</script>

<style scoped lang="scss">
  .nav-bar {
    position: fixed;
    top: 90px;
    z-index: 999;
    width: 100vw;
    background-color: transparent;
  }
  .custom-header {
    box-sizing: content-box;
    width: 100vw;
    height: 240px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.6s ease-in-out;
    }
  }

  .nut-navbar {
    margin-bottom: 0;
  }

  .main-page {
    box-sizing: border-box;
    height: calc(100vh - 92px);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .tabbar {
    height: calc(100vh - 92px);
    padding-bottom: 100px;
  }

  .border {
    padding-left: 30px;
    padding-right: 30px;
  }
</style>
