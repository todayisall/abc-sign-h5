<template>
  <div class="words">
    <NavBar title="常用单词" />
    <video controls class="play" ref="video" :src="wordResult.data[currentWord].videoUrl"></video>
    <!-- 切换题目 -->
    <div class="words-option">
      <div class="option" v-for="(item, index) in wordResult.data[currentWord].optionContent" :key="index" @click="handleOptionTap">
        {{ item }}
      </div>
    </div>
    <div class="words-selection">
      <div class="left" @click="handleLeft">
        <img src="@/assets/images/left.png" alt="" />
      </div>
      <div class="center">
        <div class="process"> {{ currentWord + 1 }} / {{ wordResult.data.length }}</div>
      </div>
      <div class="right" @click="handleRight">
        <img src="@/assets/images/right.png" alt="" />
      </div>
    </div>
  </div>
</template>

import { Success } from '@nutui/icons-vue';
<script lang="ts" setup>
  import { ref, nextTick } from 'vue';
  import NavBar from '@/components/nav-bar/index.vue';
  import { showToast } from 'vant';

  const currentWord = ref(0);

  const wordResult = {
    code: 200,
    message: 'success',
    data: [
      {
        id: 1,
        characters: '你',
        videoUrl: '/resource/video/children-service/static/你.mp4',
        videoPath: null,
        type: 'WORD',
        optionContent: ['他', '我', '你'],
        studyStatus: 1,
        testStatus: 1,
      },
      {
        id: 2,
        characters: '我',
        videoUrl: '/resource/video/children-service/static/我.mp4',
        videoPath: null,
        type: 'WORD',
        optionContent: ['他', '我', '你'],
        studyStatus: 1,
        testStatus: null,
      },
      {
        id: 3,
        characters: '他',
        videoUrl: '/resource/video/children-service/static/他.mp4',
        videoPath: null,
        type: 'WORD',
        optionContent: ['他', '我', '你'],
        studyStatus: 0,
        testStatus: null,
      },
    ],
  };

  const handleOptionTap = () => {
    // 随机显示错误或者整整的toash
    const random = Math.random();
    if (random > 0.5) {
      // 错误
      showToast('错误');
    } else {
      // 正确
      showToast('正确');
    }
    setTimeout(() => {
      currentWord.value -= 1;
      if (currentWord.value < 0) {
        currentWord.value = wordResult.data.length - 1;
      }
      handlePlay();
    }, 1000);
  };
  const handlePlay = () => {
    nextTick(() => {
      const video = document.querySelector('.play');
      if (!video) return;
      // 设置视频播放地址
      video.src = wordResult.data[currentWord.value].videoUrl;
      video?.play();
    });
  };
  const handleLeft = () => {
    currentWord.value -= 1;
    if (currentWord.value < 0) {
      currentWord.value = wordResult.data.length - 1;
    }
    handlePlay();
  };
  const handleRight = () => {
    currentWord.value += 1;
    if (currentWord.value >= wordResult.data.length) {
      currentWord.value = 0;
    }
    handlePlay();
  };
</script>

<style lang="scss" scoped>
  .words {
    width: 100%;
    height: 100vh;
    padding-top: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f9c73b;

    .words-option {
      padding: 24px;
      width: 100%;
      height: 180px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 40px;
      font-weight: bold;
      gap: 24px;
      .option {
        width: 264px;
        height: 88px;
        background: #fff;
        border-radius: 24px;
        padding: 6px 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .words-selection {
      width: 100%;
      height: 40vh;
      box-sizing: border-box;
      padding: 0 24px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 40px;
      font-weight: bold;
      color: #fff;
      gap: 24px;

      .left,
      .right {
        width: 88px;
        height: 88px;
        background: #fff;
        border-radius: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 40px;
          object-fit: cover;
        }
      }
      .center {
        text-align: center;
        flex: 1;
        position: relative;
        .content {
          border: 1px solid #fff;
          border-radius: 4px;
        }
      }
    }
  }
  .play {
    width: 100%;
    height: 30vh;
    object-fit: cover;
  }
</style>
