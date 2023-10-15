<template>
  <!-- 视频播放区 -->
  <div class="home">
    <div class="card">
      <!-- 第一部分是一个待播放的视频 -->
      <div class="video-card">
        <video class="play" controls ref="video" src=""></video>
      </div>
      <!-- 识别 & 播报按钮 -->
      <!-- <div class="btn-wrap">
        <van-button type="primary" @click="handleRecognition">识别</van-button>
        <van-button type="primary" @click="handlePlay">播报</van-button>
      </div> -->
      <div class="btn-wrap">
        <van-tabs v-model:active="active" @change="handleChange">
          <van-tab title="识别" />
          <van-tab title="播报" />
        </van-tabs>
      </div>
      <!-- 第二部分是一个消息列表 -->
      <!-- 消息列表 -->
      <div class="messageList">
        <template v-if="recognitionResultList.length === 0"> 暂无消息</template>
        <template v-else>
          <div class="message-item" v-for="item in recognitionResultList" :key="item.id" :class="{ right: item.type === 'right' }">
            <!-- 头像 -->
            <div class="message-item__avatar">
              <img v-if="item.type === 'right'" src="@/assets/images/child_avatar.jpg" alt="" />
              <img v-else src="@/assets/images/robot_avatar.jpg" alt="" />
            </div>
            <div class="message-item__content">
              <span>{{ item.name }}</span>
              <!-- 增加一个播放的icon -->
              <van-icon class="play" name="play-circle-o" size="20px" color="#000" @click="handlePlay(item.url)"
            /></div>
          </div>
        </template>
      </div>
    </div>
    <div class="btn-wrap">
      <van-cell-group inset>
        <van-field v-model="inputMessage" center clearable placeholder="请输入需要翻译的消息" :aria-autocomplete="canPlayList">
          <template #button>
            <van-button size="small" type="primary" @click="handleSend">发送</van-button>
          </template>
        </van-field>
      </van-cell-group>
    </div>
  </div>
</template>

<script lang="ts" setup name="HomePage">
  import { showToast } from '@nutui/nutui';
  import '@nutui/nutui/dist/packages/toast/style';

  import { translate } from '@/api/index';

  import { onMounted, onUnmounted } from 'vue';

  import { onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';

  // 可以用作播报的单词列表
  const canPlayList = ['你好', '你是谁', '你会做什么', '对不起', '谢谢', '再见', '你从哪里来的', '你叫什么'];

  const active = ref(1);

  const inputMessage = ref('');
  const handleSend = () => {
    // 如果播报内容不在可以播放的列表, 则给出提示
    if (canPlayList.indexOf(inputMessage.value) === -1) {
      showToast.warn(`暂不支持播报该内容, 可播报的短语部分如下: ${canPlayList.join(', ')}`);
      return;
    }

    // 翻译文本内容
    translate({
      content: inputMessage.value,
    }).then((res: any) => {
      if (res.code !== 200) {
        textToast(res.message);
        return;
      } else if (res.data.indexOf('http') === -1) {
        textToast(res.data);
        return;
      } else {
        const videoUrl = res.data.replace('http://43.136.59.50:9870', '/resource/video');
        recognitionResultList.value.push({
          id: recognitionResultList.value.length + 1,
          name: inputMessage.value,
          url: videoUrl,
          type: 'right',
        });
        inputMessage.value = '';

        // 消息列表的滚动条滚动到最低
        nextTick(() => {
          const messageList = document.querySelector('.messageList');
          if (messageList) {
            messageList.scrollTop = messageList.scrollHeight;
          }
        });
      }
    });
  };
  const handleChange = (index) => {
    if (index === 0) {
      handleRecognition();
    } else {
      closRecognition();
    }
  };
  const textToast = (msg) => {
    showToast.loading(msg, {
      duration: 1000,
      forbidClick: false,
    });
  };

  onUnmounted(() => {
    closeWs();
    closeCamera();
  });
  // 路由不活跃时的钩子函数
  onBeforeRouteLeave(() => {
    closeWs();
    closeCamera();
    // 卸载的时候保存消息记录, 最长50条
    const messageList = recognitionResultList.value;
    if (messageList.length > 50) {
      recognitionResultList.value = messageList.slice(messageList.length - 50, messageList.length);
    }
    localStorage.setItem('messageList', JSON.stringify(recognitionResultList.value));
  });

  // 声网相关配置
  const agoraConfig = {
    appid: 'c9c7e2a5c7924281b298f24e06c6ad49',
    channelName: 'test',
    uid: 0,
    token: '',
    videoEncoderConfig: {
      width: 360,
      height: 640,
      bitrate: 1,
      frameRate: 15,
      orientationMode: 0,
    },
    swapWidthAndHeight: true,
  };

  // websocket config initWs
  const wsConfig = {
    url: `wss://${location.host}`,
    options: {
      reconnect: true,
    },
    secret: '3mLKJQI6zGOgGTI938iGZLf2lrRQcA',
    client_id: 'App_beijingredshan1',
    passwd: 'ybuv1S0XATTCdfmspzLRFMiveMY=',
  };

  let ws: WebSocket | null = null;

  // ws 心跳检测
  const heartCheck = {
    timeout: 6000, // 60秒
    timeoutObj: null as any,
    reset: function () {
      clearInterval(this.timeoutObj);
      return this;
    },
    start: function () {
      console.info('start heartCheck');
      const self = this;
      this.timeoutObj = setInterval(() => {
        // 如果ws 为关闭则清空定时器
        if (ws?.readyState === 3) {
          self.reset();
          return;
        }

        ws?.send(
          JSON.stringify({
            function: 'hand_DHeart',
            source: 'pc',
            packType: 'request',
            data: {},
          }),
        );
      }, this.timeout);
    },
  };

  const initWs = () => {
    ws = new WebSocket(
      `${wsConfig.url}/tech/ws/appclient?secret=3mLKJQI6zGOgGTI938iGZLf2lrRQcA&clientid=${wsConfig.client_id}&passwd=${wsConfig.passwd}`,
    );

    ws.onopen = () => {
      console.log('open');
      ws?.send(
        JSON.stringify({
          data: {
            streamtype: 1, //自搭建流媒体
          },
          function: 'hand_getresource',
          packType: 'request',
          source: 'pc',
          mode: 'test',
          timestamp: Date.now(),
        }),
      );
      // 心跳检测重置
      heartCheck.start();
    };
    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.info('message', message);
      if (message.code === 0 && message.function === 'hand_resourceinfo') {
        console.log('获取资源成功 -> hand_resourceinfo');
        agoraConfig.uid = message.data.uid;
        agoraConfig.channelName = message.data.room;
        console.info('agoraConfig', message.data);
      } else if (message.code === 0 && message.function === 'hand_translate') {
        recognitionResultList.value.push({
          id: recognitionResultList.value.length + 1,
          name: message.data.text,
          type: 'left',
        });
        scrollToBottom();
        // 增加消息
      } else if (message.code === 0 && message.function === 'hand_DHeart') {
        console.log('心跳检测 -> hand_DHeart');
      } else {
        console.log('message', message);
      }
    };
    ws.onerror = (e) => {
      console.log('error:', e);
    };
    ws.onclose = (e) => {
      console.log('close:', e);
    };
  };

  const closeWs = () => {
    ws?.close();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      const messageList = document.querySelector('.messageList');
      if (messageList) {
        messageList.scrollTop = messageList.scrollHeight;
      }
    }, 100);
  };
  const timerInterval = ref(null);

  const openCamera = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices = {};
    }
    // 调起 前置 摄像头
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        console.log(stream);
        const video = document.querySelector('video');
        video.srcObject = stream;
        video.onloadedmetadata = (e) => {
          video.play();
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeCamera = () => {
    const video = document.querySelector('video');
    if (video) {
      // 关闭摄像头
      video.srcObject = null;
    }
  };

  const handleRecognition = () => {
    // 1. 初始化ws链接
    // 2. 获取资源
    // 3. 调起摄像头
    // 4. 识别手语
    // 6. 返回结果
    // 1. 模拟 -> 初始化ws链接
    textToast('初始化ws链接');

    // initWs();
    setTimeout(() => {
      textToast('获取资源');
      initWs();
    }, 1000);

    setTimeout(() => {
      openCamera();
    }, 500);
  };

  // mock识别返回结果
  const recognitionResultList = ref([]);
  // 关闭识别
  const closRecognition = () => {
    // 清空消息生成器
    if (timerInterval.value) clearInterval(timerInterval.value);
    closeCamera();
    closeWs();
  };

  const handlePlay = (url) => {
    const video = document.querySelector('.play');
    if (!video) return;

    // 关闭识别
    closRecognition();
    // 设置视频播放地址
    video.src = url;
    video?.play();
  };

  const initMessageList = () => {
    // 初始化的时候获取消息记录
    const messageList = localStorage.getItem('messageList');
    if (messageList) {
      recognitionResultList.value = JSON.parse(messageList);
      scrollToBottom();
    }
  };
  onMounted(() => {
    initMessageList();
  });
  // 初始化的时候获取消息记录
  onBeforeRouteUpdate(() => {
    initMessageList();
  });
</script>
<style lang="scss">
  .video-card {
    width: 100%;
    height: 40vh;
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .btn-wrap {
    margin-top: 24px;
    width: 100%;
  }
  .video-wrap {
    padding-top: 36px;
    video {
      width: 100%;
      height: 80vh;
      object-fit: cover;
    }
    .btn-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .wrap {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 60px;
  }

  .messageList {
    width: 100%;
    height: 20vh;
    overflow-y: scroll;
    // 实现消息自动由下向上无限滚动
    .message-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 60px;
      background-color: #fff;
      margin-bottom: 10px;
      .message-item__content {
        font-size: 20px;
        font-weight: bold;
        color: #121212;
        .play {
          display: none;
        }
      }

      &__avatar {
        width: 64px;
        height: 64px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .right {
      flex-direction: row-reverse;
      .message-item__content {
        flex-direction: row-reverse;
        .play {
          display: inline-block;
        }
      }
    }
  }
</style>
