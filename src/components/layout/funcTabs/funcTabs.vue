<template>
  <div class="func-area-container">
    <div class="func-nav">
      <tooltipBtn
        v-for="item in funcList"
        :active="currentTab === item.key"
        :content="item.label"
        :herf="item.icon"
        @click="selectTab(item.key)"></tooltipBtn>
    </div>
    <div class="func-panel">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import tooltipBtn from "@/components/tooltipBtn/tooltipBtn.vue";
import { ref } from "vue";
import { globalStore } from "@/store";

const _globalStore = globalStore();
const funcList = [
  {
    label: "信息",
    key: "infor",
    icon: "infor.png",
  },
  {
    label: "对象",
    key: "object",
    icon: "object.png",
  },
  {
    label: "场景",
    key: "scene",
    icon: "scene.png",
  }
];
const currentTab = ref(funcList[0].key);

function selectTab(value: string) {
  currentTab.value = value;
  _globalStore.setCurrentFuncTab(value);
}
</script>
<style lang="scss" scoped>
.func-area-container {
  position: absolute;
  right: 5px;
  top: calc($toolsNavHeight + 8px);
  display: flex;  
  .func-panel {
    padding: 8px;
    width: 300px;
    max-height: calc(100vh - 70px);
    overflow-y: auto;
    color: rgb(212, 212, 212);
  }
}
</style>
