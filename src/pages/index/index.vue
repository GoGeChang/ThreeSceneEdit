<template>
  <div class="container" ref="sceneAre">
    <topTools @click="toolsEventOperation">
      <exportPlanle
        v-if="_globalStore.currentTopTool === 'export'"></exportPlanle>
      <gridCommbPanle
        v-if="_globalStore.currentTopTool === 'gridCommb'"></gridCommbPanle>
      <gridMergPanle
        v-if="_globalStore.currentTopTool === 'gridMerg'"></gridMergPanle>
      <instaniationPanle
        v-if="
          _globalStore.currentTopTool === 'instaniation'
        "></instaniationPanle>
      <antiInstancePanle
        v-if="
          _globalStore.currentTopTool === 'antiInstance'
        "></antiInstancePanle>
      <contourLinePanle
        v-if="_globalStore.currentTopTool === 'contourLine'"></contourLinePanle>
    </topTools>
    <leftTree></leftTree>
    <div class="three-scene"><threeScene @onReady="scenReady"></threeScene></div>
    <funcTabs>
      <moduleInfor
        v-show="_globalStore.currentFuncTab === 'infor'"></moduleInfor>
      <moduleObject
        v-show="_globalStore.currentFuncTab === 'object'"></moduleObject>
      <panelScene v-show="_globalStore.currentFuncTab === 'scene'"></panelScene>
      <moduleEarth
        v-show="_globalStore.currentFuncTab === 'earth'"></moduleEarth>
      <moduleGridSplit
        v-show="_globalStore.currentFuncTab === 'gridSplit'"></moduleGridSplit>
      <moduleGridEdit
        v-show="_globalStore.currentFuncTab === 'gridEdit'"></moduleGridEdit>
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
import panelScene from "@/components/tabsModule/scene/panelScene.vue";
import moduleEarth from "@/components/tabsModule/earth/panelEarth.vue";
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
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import baseScene from "threescene-vue3/lib/baseScene";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import * as THREE from "three";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import * as methods from "./indexMethods";

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
let glbLoader = new GLTFLoader();

let composer: EffectComposer, renderPass, effectFXAA, outlinePass: OutlinePass;

const toolsEvent: { [key: string]: Function } = {
  save: () => {},
  import: (modelDat: ArrayBuffer) => {
    glbLoader.parse(modelDat, "./", (model) => {
      methods.clearScene(_threeScene.scene, _threeScene.scene);
      model.scene.userData.needExport = true;
      model.scene.translateY(2);
      _threeScene.scene.add(model.scene);
      setScaleToFitSize(model.scene);

      window.addEventListener("click", () => {
        let meshs = _threeScene.raycaster.ray.intersectObjects(
          _threeScene.scene.children,
          true
        );
        if (meshs.length) {
          outlinePass.selectedObjects = [meshs[0].object];
        }
      });
    });
  },
  export: () => {
    let exporter = new GLTFExporter();
    let exportModule = new THREE.Group();

    const options = {
      trs: true,
      onlyVisible: true,
      binary: true,
    };

    _threeScene.scene.traverse((obj) => {
      if (obj.userData.needExport) {
        exportModule.add(obj.clone());
      }
    });

    exporter.parse(
      exportModule,
      (moduleData) => {
        methods.exportModule(moduleData as ArrayBuffer);
      },
      (error) => {
        ElMessage.error(error);
      },
      options
    );
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
        methods.clearScene(_threeScene.scene, _threeScene.scene);
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

async function scenReady(Scene: baseScene) {
  _threeScene = Scene;
  createComposer();
  _threeScene.addEventListener("onRenderAfter", () => {
    if (composer) composer.render(); // 要在动画循环里去不断渲染后期处理器
  });
}
function createComposer() {
  composer = new EffectComposer(_threeScene.renderer);
  // 新建一个场景通道  为了覆盖到原理来的场景上
  renderPass = new RenderPass(_threeScene.scene, _threeScene.camera);
  composer.addPass(renderPass);

  //创建物体边缘发光通道
  outlinePass = new OutlinePass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    _threeScene.scene,
    _threeScene.camera
  );

  composer.addPass(outlinePass);

  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  effectFXAA = new ShaderPass(FXAAShader);
  effectFXAA.uniforms["resolution"].value.set(
    1 / window.innerWidth,
    1 / window.innerHeight
  );
  composer.addPass(effectFXAA);

  outlinePass.selectedObjects = []; // 这里传入需要描边的物体
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
