<template>
  <!-- 一个课程卡片, 一个标题. 一个背景图片, 还有当前课程/总课程 -->
  <div class="course-card" :class="cardType">
    <div class="course-card__title">{{ title }}</div>
    <div class="course-card__desc">{{ desc }}</div>
    <div class="course-card__cover">
      <img :src="cover" alt="背景图拍呢" />
    </div>
    <div class="course-card__count">
      <span class="course-card__count--current">{{ current }}</span>
      <span class="course-card__count-div">/</span>
      <span class="course-card__count--total">{{ total }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue';

  // vue3 写法
  // 定义组件属性, type, current /total
  const props = defineProps<{
    type: string;
    current: number;
    total: number;
  }>();

  // 根据type 获取cardType
  const cardType = `course-card--${props.type}`;
  // 定义组件type 对应的title 和 cover 和desc
  const titleMap = {
    '1': {
      title: '常用单词',
      cover: '/images/card-1.png',
      desc: '快速记忆单词，提高沟通效率',
    },
    '2': {
      title: '单词测验',
      cover: '/images/card-2.png',
      desc: '课后巩固单词，提高沟通效率',
    },
    '3': {
      title: '常用短语',
      cover: '/images/card-3.png',
      desc: '快速记忆短语，提高学习效率',
    },
    '4': {
      title: '短语测验',
      cover: '/images/card-4.png',
      desc: '巩固短语记忆，提高学习效果',
    },
  };

  // 根据 type 和 titleMap 获取对应的title 和 cover
  const { title, cover, desc } = titleMap[props.type];

  // 导出
</script>
<style lang="scss">
  .course-card {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    .course-card__title {
      padding: 24px;
      font-size: 34px;
      font-weight: bold;
      color: #fff;
      position: absolute;
      left: 24%;
      top: 24%;
      z-index: 100;
    }
    .course-card__cover {
      width: 100%;
      height: 240px;
      position: relative;
      zip-index: -1;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .course-card__desc {
      padding: 20px;
      font-size: 24px;
      color: #fff;
      position: absolute;
      left: 25%;
      top: 48%;
      z-index: 100;
    }
    .course-card__count {
      padding: 20px;
      font-size: 16px;
      color: #333;
      position: absolute;
      right: 8%;
      top: 28%;
      z-index: 100;
      .course-card__count--current {
        font-weight: bold;
        font-size: 40px;
      }
      .course-card__count-div {
        padding: 0 5px;
      }
      .course-card__count--total {
        margin-left: 5px;
        font-size: 28px;
        color: #999;
      }
    }
  }
  .course-card--1 {
    .course-card__count--current {
      color: #ff780b;
    }
    .course-card__count--total {
      color: #b57f04;
    }
  }
  .course-card--2 {
    .course-card__count--current {
      color: #ff6377;
    }
    .course-card__count--total {
      color: #ad636d;
    }
  }
  .course-card--3 {
    .course-card__count--current {
      color: #5b36c8;
    }
    .course-card__count--total {
      color: #8059f1 !important;
    }
  }
  .course-card--4 {
    .course-card__count--current {
      color: #4e8a04;
    }
    .course-card__count--total {
      color: #679e22;
    }
  }
</style>
