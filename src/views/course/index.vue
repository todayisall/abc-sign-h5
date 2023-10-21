<template>
  <div class="course-wrap">
    <CourseCard type="1" :current="studyCurrent.study.word" :total="total.study.word" @click="goTo('/words')" />
    <CourseCard type="2" :current="studyCurrent.test.word" :total="total.test.word" @click="goTo('/wordsTest')" />
    <CourseCard type="3" :current="studyCurrent.study.phrase" :total="total.study.phrase" @click="goTo('/phrase')" />
    <CourseCard type="4" :current="studyCurrent.test.phrase" :total="total.test.phrase" @click="goTo('/phraseTest')" />
  </div>
</template>

<script lang="ts" setup name="MemberPage">
  import { useRouter } from 'vue-router';
  import CourseCard from '@/components/course-card/index.vue';

  import { getCourseList, getTestList } from '@/api/index.ts';

  const studyCurrent = ref({
    study: {
      word: 0,
      phrase: 0,
    },
    test: {
      word: 0,
      phrase: 0,
    },
  });
  const total = ref({
    study: {
      word: 0,
      phrase: 0,
    },
    test: {
      word: 0,
      phrase: 0,
    },
  });

  const randomCurrent = (length: number) => {
    return Math.floor(Math.random() * length);
  };
  getCourseList({ courseType: 'WORD' }).then((res) => {
    // 随机以为小于 res.data.length 的整数
    studyCurrent.value.study.word = randomCurrent(res.data.length);

    total.value.study.word = res.data.length;
  });
  getCourseList({ courseType: 'PHRASE' }).then((res) => {
    studyCurrent.value.study.phrase = randomCurrent(res.data.length);
    total.value.study.phrase = res.data.length;
  });
  getTestList({ courseType: 'WORD' }).then((res) => {
    studyCurrent.value.test.word = randomCurrent(res.data.length);
    total.value.test.word = res.data.length;
  });
  getTestList({ courseType: 'PHRASE' }).then((res) => {
    studyCurrent.value.test.phrase = randomCurrent(res.data.length);
    total.value.test.phrase = res.data.length;
  });
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
