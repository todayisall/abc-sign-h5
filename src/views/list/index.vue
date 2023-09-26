<template>
  <div class="list"> 联系人 </div>
</template>

<script lang="ts" setup name="ListPage">
  import { listData } from './data';

  const router = useRouter();

  let list = ref(listData);

  const toDetails = (index) => {
    router.push({ path: '/details', query: { id: index } });
  };
</script>

<style lang="scss" scoped>
  .nut-card {
    padding: 15px;
    border-bottom: 1px solid #e5e5e5;
  }
</style>
