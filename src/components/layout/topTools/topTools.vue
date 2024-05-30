<template>
  <div class="top-container">
    <ul class="tools-list">
      <li v-for="item in toolsNav" class="tools-list-item">
        <img :src="item.icon" alt="" />
        <label for="img">{{ item.label }}</label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const toolsNav = [
  {
    icon: "",
    label: "保存",
  },
  {
    icon: "",
    label: "导出",
  },
  {
    icon: "",
    label: "导出",
  },
];
</script>
<style lang="scss" scoped>
.top-container {
  height: $toolsNavHeight;
  background: rgb(29, 29, 29);
  margin-bottom: 8px;
  color: rgb(211, 211, 211);
  // background-color: ;
  .tools-list {
    display: flex;
   
  }
}
</style>
