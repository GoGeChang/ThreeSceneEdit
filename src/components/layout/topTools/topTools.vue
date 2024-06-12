<template>
  <div class="top-container">
    <ul class="tools-list">
      <li
        v-for="item in toolsNav"
        class="tools-list-item"
        :class="{
          'mult-tools': item.icons,
          'tools-list-item-active':
            _topToolsStore.currentTopTool === item.key && !item.icons,
        }"
        @click="eventClick(item as TopToolsType)">
        <template v-if="item.icon">
          <img :src="getIconImg(item.icon)" />
          <label for="img">{{ item.label }}</label>
          <template
            v-if="hasMenue.find((menueItem) => menueItem.key === item.key)">
            <el-icon
              class="more-icon"
              @click.stop="toggleToolMeue(item as TopToolsType)"
              v-if="_topToolsStore.currentToolMenue !== item.key"
              ><ArrowRightBold
            /></el-icon>
            <el-icon class="more-icon" v-else><ArrowDownBold /></el-icon>
          </template>
        </template>
        <template v-else-if="item.icons">
          <label for="img">{{ item.label }}</label>
          <img
            :src="getIconImg(imgItem.icon)"
            v-for="imgItem in item.icons"
            @click.stop="eventClick(imgItem as TopToolsType)" />
        </template>
      </li>
    </ul>
    <exportPlanle
      v-if="_topToolsStore.currentTopTool === 'export'"></exportPlanle>

    <contourLinePanle
      v-if="_topToolsStore.currentTopTool === 'contourLine'"></contourLinePanle>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { getIconImg } from "@/utils/globalMethods";
import { openFileSelect } from "@/utils/topTools/tolTools";
import navs from "./nav.json";
import { ElMessage } from "element-plus";

import { topToolsStore } from "@/store/topTools/topTools";

import contourLinePanle from "@/components/toolsModule/contourLine/contourLinePanle.vue";
import { ArrowRightBold, ArrowDownBold } from "@element-plus/icons-vue";
import exportPlanle from "@/components/toolsModule/export/exportPanle.vue";

const toolsNav = navs;
const _topToolsStore = topToolsStore();

let emits = defineEmits(["click"]);

/**
 * 有多选下拉框的功能的工具栏条目
 */
let hasMenue = [{ label: "模型导出", key: "export" }];

type funcType<T> = {
  [key in EventListType]: T;
};
const func: funcType<Function> = {
  import: async () => {
    _topToolsStore.setCurrentTopTool("import");
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

function toggleToolMeue(item: TopToolsType) {
  let keyVal: string = item.key;
  let selectTool = hasMenue.find((menueItem) => menueItem.key === keyVal);
  if (
    _topToolsStore.currentToolMenue === item.key ||
    _topToolsStore.currentToolMenue === item.label
  )
    keyVal = "";
  _topToolsStore.setCurrentToolMenue(keyVal);
  _topToolsStore.setCurrentTopTool(selectTool!.key);
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
      position: relative;
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
      .more-icon {
        position: absolute;
        right: 4px;
        top: 8px;
        transform: scale(0.9, 0.8);
        &:hover {
          color: #e6a23c;
        }
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
