<template>
  <div class="container" ref="sceneAre">
    <topTools @click="toolsEventOperation">
      <exportPlanle v-if="_globalStore.currentTopTool === 'export'"></exportPlanle>
      <gridCommbPanle v-if="_globalStore.currentTopTool === 'gridCommb'"></gridCommbPanle>
      <gridMergPanle v-if="_globalStore.currentTopTool === 'gridMerg'"></gridMergPanle>
      <instaniationPanle v-if="_globalStore.currentTopTool === 'instaniation'"></instaniationPanle>
      <antiInstancePanle v-if="_globalStore.currentTopTool === 'antiInstance'"></antiInstancePanle>
      <contourLinePanle v-if="_globalStore.currentTopTool === 'contourLine'"></contourLinePanle>
    </topTools>
    <leftTree></leftTree>
    <div class="three-scene"><threeScene></threeScene></div>
    <funcTabs>
      <moduleInfor v-show="_globalStore.currentFuncTab === 'infor'"></moduleInfor>
      <moduleObject v-show="_globalStore.currentFuncTab === 'object'"></moduleObject>
      <panelScene v-show="_globalStore.currentFuncTab === 'scene'"></panelScene>
      <moduleEarth v-show="_globalStore.currentFuncTab === 'earth'"></moduleEarth>
      <moduleGridSplit v-show="_globalStore.currentFuncTab === 'gridSplit'"></moduleGridSplit>
      <moduleGridEdit v-show="_globalStore.currentFuncTab === 'gridEdit'"></moduleGridEdit>
    </funcTabs>
  </div>
</template>

<script lang="ts" setup>
import topTools from "@/components/layout/topTools/topTools.vue";
import leftTree from "@/components/layout/leftTree/leftTree.vue";
import funcTabs from "@/components/layout/funcTabs/funcTabs.vue";
import { onMounted, onUnmounted, ref } from "vue";
import moduleObject from "@/components/tabsModule/object/moduleObject.vue";
import moduleInfor from "@/components/tabsModule/infor/moduleInfor.vue";
import panelScene from "@/components/tabsModule/scene/panelScene.vue"
import moduleEarth from "@/components/tabsModule/earth/panelEarth.vue"
import moduleGridSplit from "@/components/tabsModule/gridSplit/moduleGridSplit.vue";
import moduleGridEdit from "@/components/tabsModule/gridEdit/moduleGridEdit.vue";

import exportPlanle from "@/components/toolsModule/export/exportPanle.vue";
import gridCommbPanle from "@/components/toolsModule/gridCommb/gridCommbPanle.vue";
import gridMergPanle from "@/components/toolsModule/gridMerg/gridMergPanle.vue";
import instaniationPanle from "@/components/toolsModule/instaniation/instaniationPanle.vue";
import antiInstancePanle from "@/components/toolsModule/antiInstance/antiInstancePanle.vue";
import contourLinePanle from "@/components/toolsModule/contourLine/contourLinePanle.vue";

import { globalStore } from "@/store";
import threeScene from "threescene-vue3/components/threeScene.vue";
import { ElMessage } from "element-plus";

const sceneAre = ref<HTMLElement>();
const _globalStore = globalStore();
const toolsEvent: { [key: string]: Function } = {
  save: () => {},
  import: () => {
  },
  export: () => {
  },
};


onMounted(async () => {

});
onUnmounted(() => {

});

function toolsEventOperation(e: ToolsEventType) {
  _globalStore.setCurrentTopTool(e.type);
  if(!toolsEvent[e.type]) return  ElMessage.warning('功能暂未实现');

  toolsEvent[e.type](e.value);

  if(e.type === 'save') {
    _globalStore.setCurrentTopTool('');
    ElMessage.success('模型保存成功');
  }

}

</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
  .three-scene {
    position: absolute;
    left: $moduleTreeWidth;
    top: $toolsNavHeight;
    padding: 8px;
    width: calc(100% - $moduleTreeWidth - 10px);
    height: calc(100vh - $toolsNavHeight - 10px);
    background-color: $bckColor;
    margin-left: 5px;
    margin-top: 8px;
    border-radius: $borderRadius;
    user-select: none;
  }
}
</style>
