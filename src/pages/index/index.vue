<template>
  <div class="container" ref="sceneAre" v-loading="!sceneReady" v-loading-text="'正在加载场景'">
    <topTools @click="toolsEventOperation"></topTools>
    <sceneTree v-if="sceneReady" :scene="_threeScene.scene"></sceneTree>
    <div class="three-scene">
      <threeScene @onReady="scenReady"></threeScene>
    </div>
    <funcTabs></funcTabs>
  </div>
</template>

<script lang="ts" setup>
import topTools from "@/components/layout/topTools/topTools.vue";
import sceneTree from "@/components/layout/sceneTree/sceneTree.vue";
import funcTabs from "@/components/layout/funcTabs/funcTabs.vue";
import { onMounted, onUnmounted, ref, nextTick } from "vue";


import { globalStore } from "@/store";
import threeScene from "threescene-vue3/components/threeScene.vue";
import { ElMessage } from "element-plus";
import baseScene from "threescene-vue3/lib/baseScene";
import * as THREE from "three";
import * as modelMethods from "@/lib/model/modelMethods";
import * as globalMethods  from "@/lib/global/globalMethods"

const sceneAre = ref<HTMLElement>();
const _globalStore = globalStore();

function toolsEventOperation(e: ToolsEventType) {
  _globalStore.setCurrentTopTool(e.type);
  if (!toolsEvent[e.type]) return ElMessage.warning("功能暂未实现");

  toolsEvent[e.type](e.value);

  if (e.type === "save") {
    _globalStore.setCurrentTopTool("");
    ElMessage.success("模型保存成功");
  }
}

let _threeScene: baseScene;
let sceneReady = ref(false);

const toolsEvent: { [key: string]: Function } = {
  save: () => {},
  import: async (modelDat: ArrayBuffer) => {
    let  model = await modelMethods.importModel(modelDat);
    model.scene.translateY(2);

    globalMethods.clearScene(_threeScene.scene, _threeScene.scene);

    _threeScene.scene.add(model.scene);
    setScaleToFitSize(model.scene);
    sceneReady.value = false;
    nextTick(() =>{
      sceneReady.value = true;
    })
  },
  export: () => {
    modelMethods.exportModel(_threeScene.scene);
  },
};

let dragFunc: { [key: string]: any } = {
  dragenter: (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  },
  dragover: (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  },
  drop: async (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();

    let file = e.dataTransfer?.files[0];
    if (file) {
      if (!/\.glb$/i.test(file.name)) {
        ElMessage.error("选择的文件不是一个glb格式");
      } else {
        let modelDat = await file.arrayBuffer();
        toolsEvent.import(modelDat);
        globalMethods.clearScene(_threeScene.scene, _threeScene.scene);
      }
    }
  },
};
function setScaleToFitSize(obj: THREE.Group<THREE.Object3DEventMap>) {
  const boxHelper = new THREE.BoxHelper(obj);
  boxHelper.geometry.computeBoundingBox();
  const box = boxHelper.geometry.boundingBox as THREE.Box3;
  const maxDiameter = Math.max(
    box.max.x - box.min.x,
    box.max.y - box.min.y,
    box.max.z - box.min.z
  );
  const scaleValue = _threeScene.camera.position.z / maxDiameter;
  obj.scale.set(scaleValue, scaleValue, scaleValue);
}
onMounted(async () => {
  sceneAre.value = document.querySelector(".three-container") as HTMLElement;
  Object.keys(dragFunc).forEach((key) => {
    sceneAre.value?.addEventListener(key, dragFunc[key]);
  });

  _threeScene.scene.background = new THREE.Color("#1B1B1C");
});
onUnmounted(() => {
  Object.keys(dragFunc).forEach((key) => {
    sceneAre.value?.removeEventListener(key, dragFunc[key]);
  });
});

function scenReady(Scene: baseScene) {
  _threeScene = Scene;
  _threeScene.addEventListener("onRenderAfter", () => {});
  sceneReady.value = true;
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
import THREE from "three"; import { GLTFLoader, OutlinePass, GLTFExporter,
OutputPass, ShaderPass, FXAAShader } from "three/examples/jsm/Addons.js"; import
baseScene from "threescene-vue3/lib/baseScene"; import { threeSceneOptions }
from "threescene-vue3/types/threeScene"; import THREE from "three"; import {
GLTFLoader, OutlinePass, GLTFExporter, OutputPass, ShaderPass, FXAAShader } from
"three/examples/jsm/Addons.js"; import baseScene from
"threescene-vue3/lib/baseScene"; import { threeSceneOptions } from
"threescene-vue3/types/threeScene";
