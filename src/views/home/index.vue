<template>
  <!-- 视频播放区 -->
  <div class="video-wrap">
    <video src="/video/demo.mp4"></video>
  </div>
  <!-- 初始化ws链接 -->
  <van-button type="primary" @click="initWs">初始化ws链接</van-button>
  <van-button type="primary" @click="getResourse">获取资源</van-button>
  <van-button type="primary" @click="closeWs">关闭链接</van-button>
  <!-- 调起摄像头 -->
  <van-button type="primary" @click="openCamera">调起摄像头</van-button>
</template>

<script lang="ts" setup name="HomePage">
  import { computed } from 'vue';
  import { useUserStore } from '@/store/modules/user';

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

  const openCamera = () => {
    // 调起摄像头
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        console.log(stream);
        // const video = document.querySelector('video');
        // video.srcObject = stream;
        // video.onloadedmetadata = (e) => {
        //   video.play();
        // };
      })
      .catch((err) => {
        console.log(err);
      });
  };
</script>
<style lang="scss">
  .video-wrap {
    padding-top: 36px;
    video {
      width: 100%;
      height: 320px;
      object-fit: cover;
    }
  }
</style>
