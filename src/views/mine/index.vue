<template>
  <section>我的 </section>
</template>

<script setup name="DemoPage" lang="tsx">
  import { openFactoryModal } from '@/components/Modal/index';
  import 'quarkd/lib/button';

  const openLargeModal = () => {
    openFactoryModal({
      renderComp: function () {
        return <div>自定义内容</div>;
      },
    }).then((res) => {
      console.log('确认成功', res);
    });
  };
  const openSmallModal = () => {
    openFactoryModal({
      size: 'normal',
      renderComp: function () {
        return <div>自定义内容</div>;
      },
    }).then((res) => {
      console.log('确认成功', res);
    });
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/mixin.scss';

  section {
    .title {
      display: inline-block;
      margin-bottom: 40px;
      font-size: 40px;
      font-weight: 500;
    }

    &:nth-child(n) {
      .title {
        margin-top: 20px;
      }
    }

    &:first-child {
      .title {
        margin-top: 0;
      }
    }

    ::v-deep(.var-space) {
      margin-bottom: 10px !important;
    }
  }

  .demo {
    > :nth-child(n) {
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
</style>
