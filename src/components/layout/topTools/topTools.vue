<template>
  <div class="top-container">
    <ul class="tools-list">
      <li
        v-for="item in toolsNav"
        class="tools-list-item"
        :class="{
          'mult-tools': item.icons,
          'tools-list-item-active':
            _globalStore.currentTopTool === item.key && !item.icons,
        }"
        @click="eventClick(item)">
        <template v-if="item.icon">
          <img :src="getIconImg(item.icon)" />
          <label for="img">{{ item.label }}</label>
        </template>
        <template v-else-if="item.icons">
          <label for="img">{{ item.label }}</label>
          <img
            :src="getIconImg(imgItem.icon)"
            v-for="imgItem in item.icons"
            @click.stop="eventClick(imgItem)" />
        </template>
      </li>
    </ul>
    <exportPlanle
      v-if="_globalStore.currentTopTool === 'export'"></exportPlanle>
    <gridCommbPanle
      v-if="_globalStore.currentTopTool === 'gridCommb'"></gridCommbPanle>
    <gridMergPanle
      v-if="_globalStore.currentTopTool === 'gridMerg'"></gridMergPanle>
    <instaniationPanle
      v-if="_globalStore.currentTopTool === 'instaniation'"></instaniationPanle>
    <antiInstancePanle
      v-if="_globalStore.currentTopTool === 'antiInstance'"></antiInstancePanle>
    <contourLinePanle
      v-if="_globalStore.currentTopTool === 'contourLine'"></contourLinePanle>
  </div>
</template>

<script lang="ts" setup>
import { getIconImg } from "@/utils/globalMethods";
import { openFileSelect } from "@/utils/topTools/tolTools";
import navs from "./nav.json";
import { ElMessage } from "element-plus";
import exportPlanle from "@/components/toolsModule/export/exportPanle.vue";
import gridCommbPanle from "@/components/toolsModule/gridCommb/gridCommbPanle.vue";
import gridMergPanle from "@/components/toolsModule/gridMerg/gridMergPanle.vue";
import instaniationPanle from "@/components/toolsModule/instaniation/instaniationPanle.vue";
import antiInstancePanle from "@/components/toolsModule/antiInstance/antiInstancePanle.vue";
import contourLinePanle from "@/components/toolsModule/contourLine/contourLinePanle.vue";
import { globalStore } from "@/store";

const toolsNav = navs;
const _globalStore = globalStore();

let emits = defineEmits(["click"]);

type funcType<T> = {
  [key in EventListType]: T;
};
const func: funcType<Function> = {
  import: async () => {
    _globalStore.setCurrentTopTool("import");
    let fileData = await openFileSelect();
    emits("click", { type: "import", value: fileData });
  },
  export: async () => {
    emits("click", { type: "export" });
  },
  save: async () => {
    emits("click", { type: "save" });
  },

  contourLine: async () => {
    emits("click", { type: "contourLine" });
  },
  posiRotationX: async () => {
    emits("click", { type: "posiRotationX" });
  },
  posiRotationY: async () => {
    emits("click", { type: "posiRotationY" });
  },
  posiRotationZ: async () => {
    emits("click", { type: "posiRotationZ" });
  },
  vertexRotationX: async () => {
    emits("click", { type: "vertexRotationX" });
  },
  vertexRotationY: async () => {
    emits("click", { type: "vertexRotationY" });
  },
  vertexRotationZ: async () => {
    emits("click", { type: "vertexRotationZ" });
  },
  resetFront: async () => {
    emits("click", { type: "resetFront" });
  },
  resetBck: async () => {
    emits("click", { type: "resetBck" });
  },
  resetCenter: async () => {
    emits("click", { type: "resetCenter" });
  },
};

function eventClick(item: TopToolsType) {
  let key = item.key;
  if (item.icon && func[key]) {
    func[key]();
    return;
  }
  if (!item.icons) {
    ElMessage.warning(`${key}该功能暂未实现`);
  }
}
</script>
<style lang="scss" scoped>
.top-container {
  height: $toolsNavHeight;
  background: rgb(29, 29, 29);
  margin-bottom: 8px;
  color: rgb(211, 211, 211);
  .tools-list {
    height: 100%;
    display: flex;
    align-items: center;
    .tools-list-item-active {
      background-color: $primaryColor;
    }
    &-item {
      transition: all 0.3s;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      min-width: 60px;
      padding: 0 8px;
      user-select: none;
      img {
        width: 14px;
        height: 14px;
        margin-top: 8px;
        cursor: pointer;
      }
      label {
        font-size: 11px;
        margin: 4px 0;
        cursor: pointer;
      }
      &:hover {
        background-color: $primaryColor;
      }
    }
    .mult-tools {
      flex-direction: row;
      align-items: center;
      justify-content: center;
      &:first-child {
        border-right: 1px solid #fff !important;
        margin-left: 10px;
      }
      &:hover {
        background-color: #1d1d1d;
      }
      img {
        margin: 0 6px;
        padding: 3px;
        width: 17px;
        height: 17px;
        background-color: #545454;
        &:hover {
          background-color: $primaryColor;
        }
      }
    }
  }
}
</style>
