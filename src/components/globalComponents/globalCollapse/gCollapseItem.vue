<template>
   <el-collapse-item>
      <template #title>
        <img :src="getIconImg('decorate.png')" alt="">
        <span>{{ props.title }}</span>
      </template>
      <slot></slot>
    </el-collapse-item>
</template>

<script lang='ts' setup>
import { getIconImg } from '@/utils/globalMethods';
const props = defineProps<{
  title: string;
}>()
</script>
<style lang='scss' scoped>
</style>