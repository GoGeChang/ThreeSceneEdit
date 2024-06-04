<template>
  <g-collapse v-model="collapseActive">
    <g-collapse-item :title="'基础设置'" name="1"></g-collapse-item>
    <g-collapse-item :title="'地球参数'"></g-collapse-item>
    <g-collapse-item :title="'太阳参数'"></g-collapse-item>
    <g-collapse-item :title="'大气圈参数'"></g-collapse-item>
    <g-collapse-item :title="'雾化参数'"></g-collapse-item>
    <g-collapse-item :title="'环境光遮蔽（AO）'"></g-collapse-item>
    <g-collapse-item :title="'星空贴图'"></g-collapse-item>
    <g-collapse-item :title="'全局泛光参数'"></g-collapse-item>
  </g-collapse>
</template>
<script lang='ts' setup>
import { ref } from "vue"
let collapseActive = ref(["1"]);
</script>
<style lang='scss' scoped>
</style>