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
            <div class="message-item__content">{{ item.name }}</div>
            <!-- 增加一个播放的icon -->
            <van-icon name="play-circle-o" size="20px" color="#000" @click="handlePlay(item.url)" />
          </div>
        </template>
      </div>
    </div>
    <!-- 初始化ws链接 -->
    <!-- <div class="wrap">
      <van-button type="primary" @click="initWs">初始化ws链接</van-button>
      <van-button type="primary" @click="getResourse">获取资源</van-button>
      <van-button type="primary" @click="closeWs">关闭链接</van-button>
    </div> -->
    <!-- 调起摄像头 -->
    <!-- <div class="wrap">
      <van-button type="primary" @click="openCamera">调起摄像头</van-button>
      <van-button type="primary" @click="closeCamera">关闭摄像头</van-button>
    </div> -->

    <!-- mock 手语识别 -->
    <!-- <div class="wrap">
      <van-button type="primary" @click="handleRecognition">视频识别</van-button>
    </div> -->
    <!-- <div class="wrap">
      <van-button type="primary" @click="joinChannel">ai识别</van-button>
    </div> -->
    <div class="btn-wrap">
      <van-cell-group inset>
        <van-field v-model="inputMessage" center clearable placeholder="请输入需要翻译的消息">
          <template #button>
            <van-button size="small" type="primary" @click="handleSend">发送</van-button>
          </template>
        </van-field>
      </van-cell-group>
    </div>
  </div>
</template>

<script lang="ts" setup name="HomePage">
  import { showToast, Popup } from '@nutui/nutui';
  import '@nutui/nutui/dist/packages/toast/style';

  const active = ref(1);

  const inputMessage = ref('');
  const handleSend = () => {
    recognitionResultList.value.push({
      id: recognitionResultList.value.length + 1,
      name: inputMessage.value,
      url: '/resource/video//children-service/static/你好.mp4',
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
    url: 'ws://47.100.114.23:10103',
    options: {
      reconnect: true,
    },
    secret: '3mLKJQI6zGOgGTI938iGZLf2lrRQcA',
    client_id: 'App_pufa_001',
    passwd: '6vniPbTg95oex510ZhbKt3nkluU=',
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
      if (message.code === 0 && message.function === 'hand_resourceinfo') {
        console.log('获取资源成功 -> hand_resourceinfo');
        agoraConfig.uid = message.data.uid;
        agoraConfig.channelName = message.data.room;
        console.info('agoraConfig', message.data);
      } else if (message.code === 0 && message.packType === 'noAck') {
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

  // AgoraRTC sdk 加入频道
  const joinChannel = () => {
    const client = AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' });
    client.init(agoraConfig.appid, () => {
      console.log('AgoraRTC client initialized');
      client.join(
        agoraConfig.token ? agoraConfig.token : null,
        agoraConfig.channelName,
        agoraConfig.uid ? +agoraConfig.uid : null,
        (uid) => {
          console.log('User ' + uid + ' join channel successfully');
          // 创建本地流
          const localStream = AgoraRTC.createStream({
            streamID: agoraConfig.uid,
            audio: true,
            video: true,
            screen: false,
          });
          // 初始化本地流
          localStream.init(
            () => {
              console.log('getUserMedia successfully');
              localStream.play('agora_local');
              // 将本地流发布到频道中
              client.publish(localStream, (err) => {
                console.log('Publish local stream error: ' + err);
              });
            },
            (err) => {
              console.log('getUserMedia failed', err);
            },
          );
        },
        (err) => {
          console.log('Join channel failed', err);
        },
      );
    });
  };

  // 获取资源
  const getResourse = () => {
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
  };

  const originMessage = [
    {
      id: 1,
      name: '你好',
      type: 'left',
      url: '/resource/video//children-service/static/你好.mp4',
    },
    {
      id: 2,
      name: '你从哪里来',
      type: 'left',
      url: '/resource/video//children-service/static/你从哪里来的.mp4',
    },
    {
      id: 3,
      name: '你吃饭了么?',
      type: 'left',
      url: '/resource/video//children-service/static/最近还好吗.mp4',
    },
  ];
  const timerInterval = ref(null);
  // 接收消息的方法, 每分钟自动生成一条消息
  const receiveMessage = () => {
    // 如果有计时器, 则清空计时器
    if (timerInterval.value) clearInterval(timerInterval.value);

    timerInterval.value = setInterval(() => {
      const newMessage = JSON.parse(JSON.stringify(originMessage[recognitionResultList.value.length % 3]));
      console.log('newMessage', newMessage);
      newMessage.id = recognitionResultList.value.length + 1;
      recognitionResultList.value.push({ ...newMessage });
      // 获取messageList的滚动条, 自动滚动到底部
      const messageList = document.querySelector('.messageList');
      if (messageList) {
        messageList.scrollTop = messageList.scrollHeight;
      }
    }, 1000);
  };

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
        // 清空消息
        recognitionResultList.value = [];
        receiveMessage();
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

    setTimeout(() => {
      textToast('获取资源');
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
        font-size: 18px;
        font-weight: bold;
        color: #121212;
      }
    }
    .right {
      justify-content: flex-end;
      .message-item__content {
      }
    }
  }
</style>
