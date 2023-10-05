<template>
  <div class="words">
    <!-- <n-nav-bar title="词汇学习" /> -->
    <NavBar title="常用单词" />
    <video controls class="play" ref="video" :src="wordResult.data[currentWord].videoUrl"></video>
    <!-- 切换题目 -->
    <div class="words-selection">
      <div class="left" @click="handleLeft">
        <img src="@/assets/images/left.png" alt="" />
      </div>
      <div class="center">
        <div class="content">{{ wordResult.data[currentWord].characters }}</div>
        <div class="process"> {{ currentWord + 1 }} / {{ wordResult.data.length }}</div>
      </div>
      <div class="right" @click="handleRight">
        <img src="@/assets/images/right.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, nextTick } from 'vue';
  import NavBar from '@/components/nav-bar/index.vue';

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
        optionContent: '["他","我","你"]',
        studyStatus: 1,
        testStatus: 1,
      },
      {
        id: 2,
        characters: '我',
        videoUrl: '/resource/video/children-service/static/我.mp4',
        videoPath: null,
        type: 'WORD',
        optionContent: '["他","我","你"]',
        studyStatus: 1,
        testStatus: null,
      },
      {
        id: 3,
        characters: '他',
        videoUrl: '/resource/video/children-service/static/他.mp4',
        videoPath: null,
        type: 'WORD',
        optionContent: '["他","我","你"]',
        studyStatus: 0,
        testStatus: null,
      },
    ],
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

    .n-nav-bar {
      background-color: transparent;
      box-shadow: none;
      color: #fff;
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
        .process {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -72px;
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
