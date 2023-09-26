<template>
  <!-- 一个课程卡片, 一个标题. 一个背景图片, 还有当前课程/总课程 -->
  <div class="course-card">
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
      desc: '快速记忆单词，提高沟通效率',
    },
    '3': {
      title: '常用短语',
      cover: '/images/card-3.png',
      desc: '快速记忆单词，提高沟通效率 拷贝 2',
    },
    '4': {
      title: '短语测验',
      cover: '/images/card-4.png',
      desc: '快速记忆单词，提高沟通效率 拷贝 3',
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
      font-size: 16px;
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
      font-size: 16px;
      color: #fff;
      position: absolute;
      left: 24%;
      top: 36%;
      z-index: 100;
    }
    .course-card__count {
      padding: 20px;
      font-size: 16px;
      color: #333;
      position: absolute;
      right: 8%;
      top: 36%;
      z-index: 100;
      .course-card__count--current {
        font-weight: bold;
        font-size: 36px;
      }
      .course-card__count-div {
        padding: 0 5px;
      }
      .course-card__count--total {
        margin-left: 5px;
        color: #999;
      }
    }
  }
</style>
