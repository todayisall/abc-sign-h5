<template>
  <section>
    <div class="user-info">
      <div class="user-info__avatar">
        <img src="@/assets/images/mine/avatar.png" alt="头像" />
      </div>
      <div class="middle">
        <div class="user-info__name">{{ userInfo.user.userName }}</div>
        <div class="process">sdfaf</div>
      </div>
      <div class="user-info__icon">
        <img src="@/assets/images/mine/score.png" alt="" />
        <span class="score">68</span>
      </div>
    </div>
  </section>
  <section>
    <div class="card">
      <div class="cover">
        <img src="@/assets/images/mine/card_1_head.png" alt="封面图片" />
      </div>
      <div class="content">
        <div class="title">单次进度</div>
        <div class="desc">
          <div class="desc-status">已完成</div>
          <div class="desc-process">总数: 50</div>
        </div>
      </div>
      <div class="footer">
        <img src="@/assets/images/mine/card_1_footer.png" alt="页脚" />
        <div class="score">68</div>
      </div>
    </div>
    <div class="card card-2">
      <div class="cover">
        <img src="@/assets/images/mine/card_2_head.png" alt="封面图片" />
      </div>
      <div class="content">
        <div class="title">单词得分</div>
        <div class="desc">
          <div class="desc-status">已完成</div>
          <div class="desc-process">总数: 50</div>
        </div>
      </div>
      <div class="footer">
        <img src="@/assets/images/mine/card_2_footer.png" alt="页脚" />
        <div class="score">98</div>
      </div>
    </div>
    <div class="card card-3">
      <div class="cover">
        <img src="@/assets/images/mine/card_3_head.png" alt="封面图片" />
      </div>
      <div class="content">
        <div class="title">短语进度</div>
        <div class="desc">
          <div class="desc-status">已完成</div>
          <div class="desc-process">总数: 50</div>
        </div>
      </div>
      <div class="footer">
        <img src="@/assets/images/mine/card_3_footer.png" alt="页脚" />
        <div class="score">50</div>
      </div>
    </div>
    <div class="card card-4">
      <div class="cover">
        <img src="@/assets/images/mine/card_4_head.png" alt="封面图片" />
      </div>
      <div class="content">
        <div class="title">短语得分</div>
        <div class="desc">
          <div class="desc-status">已完成</div>
          <div class="desc-process">总数: 10</div>
        </div>
      </div>
      <div class="footer">
        <img src="@/assets/images/mine/card_4_footer.png" alt="页脚" />
        <div class="score">80</div>
      </div>
    </div>
  </section>
</template>

<script setup name="DemoPage" lang="tsx">
  // 从localStorage中获取用户信息
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  console.info('userInfo', userInfo);
</script>

<style lang="scss" scoped>
  @import '../../styles/mixin.scss';
  .user-info {
    display: flex;
    align-items: center;
    padding: 0;
    height: 96px;
    background-color: #fff;
    .user-info__avatar {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .middle {
      flex: 1;
      margin-left: 10px;
      .user-info__name {
        font-size: 22px;
        color: #121212;
        margin-bottom: 5px;
      }
      .process {
        font-size: 12px;
        color: #999;
      }
    }
    .user-info__icon {
      position: relative;
      img {
        width: 90px;
        height: 90px;
      }
      .score {
        position: absolute;
        top: 26px;
        left: 32px;
        font-size: 16px;
        font-weight: bold;
        color: #fda30d;
      }
    }
  }

  .card {
    margin: 0 15px;
    margin-top: 20px;
    overflow: hidden;

    background: #ffffff;
    box-shadow: 0px 1px 10px 0px rgba(196, 200, 213, 0.4);
    border-radius: 16px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .cover {
      height: 120px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .content {
      padding: 10px 15px;
      background-color: #fff;
      flex: 1;
      .title {
        font-size: 18px;
        font-weight: bold;
        color: #121212;
        margin-bottom: 10px;
      }
      .desc {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .desc-status {
          font-size: 12px;
          color: #ffae04;
          padding: 2px 10px;
          background: #fff3d8;
          border-radius: 4px;
        }
        .desc-process {
          margin-left: 16px;
          font-size: 12px;
          color: #616572;
          padding: 2px 10px;
          background: #ebecef;
          border-radius: 4px;
        }
      }
    }
    .footer {
      height: 140px;
      background-color: #fff;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .score {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
  .card-2 {
    .content {
      .desc {
        .desc-status {
          background: #fee8eb;
          color: #ff7b8c;
        }
      }
    }
  }
  .card-3 {
    .content {
      .desc {
        .desc-status {
          background: #f1ebfc;
          color: #926ff7;
        }
      }
    }
  }
  .card-4 {
    .content {
      .desc {
        .desc-status {
          background: #e8f7d6;
          color: #6db834;
        }
      }
    }
  }
</style>
