<template>
  <div class="func-area-container">
    <div class="func-nav">
      <template v-for="item in funcList">
        <tooltipBtn
          v-if="['对象', '节点信息'].includes(item.label)"
          :active="currentTab === item.key"
          :content="item.label"
          :herf="item.icon"
          :disable="!_globalStore.selectedMesh"
          @click="selectTab(item.key)">
        </tooltipBtn>
        <tooltipBtn
          v-else
          :active="currentTab === item.key"
          :content="item.label"
          :herf="item.icon"
          @click="selectTab(item.key)">
        </tooltipBtn>
      </template>
    </div>
    <div class="func-panel">
      <panelScene
        v-show="_funcTabsStore.currentFuncTab === 'scene'"></panelScene>
      <modelInfor
        v-show="_funcTabsStore.currentFuncTab === 'infor'"></modelInfor>
      <modelObject
        v-show="_funcTabsStore.currentFuncTab === 'object'"></modelObject>
    </div>
  </div>
</template>

<script lang="ts" setup>
import modelObject from "@/components/tabsModule/object/modelObject.vue";
import modelInfor from "@/components/tabsModule/infor/modelInfor.vue";
import panelScene from "@/components/tabsModule/scene/panelScene.vue";
import tooltipBtn from "@/components/tooltipBtn/tooltipBtn.vue";
import { ref } from "vue";
import { funcTabsStore } from "@/store/funcTabs/funcTabs";
import { globalStore } from "@/store";

const _funcTabsStore = funcTabsStore();
const _globalStore = globalStore();

const funcList = [
  {
    label: "场景",
    key: "scene",
    icon: "scene.png",
  },
  {
    label: "节点信息",
    key: "infor",
    icon: "infor.png",
  },
  {
    label: "对象",
    key: "object",
    icon: "object.png",
  },
];
const currentTab = ref(funcList[0].key);

function selectTab(value: string) {
  currentTab.value = value;
  _funcTabsStore.setCurrentFuncTab(value);
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
