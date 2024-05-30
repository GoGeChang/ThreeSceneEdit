<template>
  <div class="container" ref="sceneAre">
    <topTools></topTools>
    <leftTree></leftTree>
    <threeScene class="three-scene" @onReady="scenReady"></threeScene>
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
import { ElMessage } from "element-plus";

const sceneAre = ref<HTMLElement>();
let _threeScene: baseScene;
let glbLoader = new GLTFLoader();

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

        _threeScene.scene.traverse((obj) => {
          if (obj instanceof THREE.Group || obj instanceof THREE.Mesh) {
            _threeScene.scene.remove(obj);
          }
        });
        glbLoader.parse(modelDat, "./", (model) => {
          _threeScene.scene.add(model.scene);
          setScaleToFitSize(model.scene);
        });
      }
    }
  },
};

async function scenReady(Scene: baseScene) {
  _threeScene = Scene;
}
function setScaleToFitSize(obj: THREE.Group<THREE.Object3DEventMap>) {
  const boxHelper = new THREE.BoxHelper(obj);
  boxHelper.geometry.computeBoundingBox();
  const box = boxHelper.geometry.boundingBox as THREE.Box3;
  const maxDiameter = Math.max(
    box.max.x - box.min.x,
    box.max.y - box.min.y,
    box.max.z - box.min.z
  );
  const scaleValue = (_threeScene.camera.position.z * 2.8) / maxDiameter;
  obj.scale.set(scaleValue, scaleValue, scaleValue);
}
onMounted(async () => {
  sceneAre.value = document.querySelector(".three-container") as HTMLElement;
  Object.keys(dragFunc).forEach((key) => {
    sceneAre.value?.addEventListener(key, dragFunc[key]);
  });

  _threeScene.scene.background = new THREE.Color('#1B1B1C');

});
onUnmounted(() => {
  Object.keys(dragFunc).forEach((key) => {
    sceneAre.value?.removeEventListener(key, dragFunc[key]);
  });
});
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
