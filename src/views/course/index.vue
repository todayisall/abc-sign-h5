<template>
  <div class="course-wrap">
    <CourseCard type="1" :current="7" :total="50" @click="goTo('/words')" />
    <CourseCard type="2" :current="12" :total="50" @click="goTo('/wordsTest')" />
    <CourseCard type="3" :current="3" :total="50" @click="goTo('/phrase')" />
    <CourseCard type="4" :current="0" :total="50" @click="goTo('/phraseTest')" />
  </div>
</template>

<script lang="ts" setup name="MemberPage">
  import { useRouter } from 'vue-router';
  import CourseCard from '@/components/course-card/index.vue';

  const router = useRouter();
  const goTo = (path) => {
    router.push(path);
  };
</script>

<style lang="scss">
  .course-wrap {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }
</style>
