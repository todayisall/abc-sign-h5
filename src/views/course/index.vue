<template>
  <div class="course-wrap">
    <CourseCard type="1" :current="7" :total="50" />
    <CourseCard type="2" :current="12" :total="50" />
    <CourseCard type="3" :current="3" :total="50" />
    <CourseCard type="4" :current="0" :total="50" />
  </div>
</template>

<script lang="ts" setup name="MemberPage">
  import { useRouter } from 'vue-router';
  import CourseCard from '@/components/course-card/index.vue';

  const router = useRouter();
  // const userStore = useUserStore();
  // const getUserInfo = computed(() => {
  //   const { name = '' } = userStore.getUserInfo || {};
  //   return name;
  // });
  const goLogin = () => {
    router.push('/login');
  };
</script>

<style lang="scss">
  .course-wrap {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }
</style>
