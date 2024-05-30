<template>
  <div class="container" ref="sceneAre">
    <topTools @click="toolsEventOperation"></topTools>
    <leftTree></leftTree>
    <threeScene
      class="three-scene"
      @onReady="scenReady"
      :options="threeSceneOption"></threeScene>
  </div>
</template>

<script lang="ts" setup>
import * as THREE from "three";
import topTools from "@/components/layout/topTools/topTools.vue";
import leftTree from "@/components/layout/leftTree/leftTree.vue";
import threeScene from "threescene-vue3/components/threeScene.vue";
import { onMounted, onUnmounted, ref } from "vue";
import baseScene from "threescene-vue3/lib/baseScene";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { ElMessage } from "element-plus";
import * as methods from "./indexMethods";
import { threeSceneOptions } from "threescene-vue3/types/threeScene";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

const sceneAre = ref<HTMLElement>();
let _threeScene: baseScene;
let glbLoader = new GLTFLoader();

let composer: EffectComposer, renderPass, effectFXAA, outlinePass: OutlinePass;

const threeSceneOption: threeSceneOptions = {
  enableRay: true,
  showAxesHelper: true,
  showGridHelper: true,
};

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
  _threeScene.addEventListener('onRenderAfter', () =>{
    if (composer) composer.render(); // 要在动画循环里去不断渲染后期处理器
  })
}

interface toolsEventType {
  type: "save" | "import" | "export";
  value: any;
}
function toolsEventOperation(e: toolsEventType) {
  toolsEvent[e.type](e.value);
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
  composer.addPass( outputPass );

  effectFXAA = new ShaderPass( FXAAShader );
  effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
  composer.addPass( effectFXAA );

  outlinePass.selectedObjects = []; // 这里传入需要描边的物体
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .three-scene {
    position: absolute;
    left: $moduleTreeWidth;
    top: $toolsNavHeight;
    padding: 8px;
    width: calc(100% - $moduleTreeWidth);
    height: calc(100vh - $toolsNavHeight);
  }
}
</style>
