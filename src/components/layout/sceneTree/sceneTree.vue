<template>
  <div class="tree-container">
    <div class="module-name">场景信息</div>
    <el-tree
      style="max-width: 600px"
      :data="sceneTree"
      :props="defaultProps"
      :render-after-expand="false"
      @node-click="handleNodeClick">
      <template #default="{ node, data }">
        <div class="three-item">
          <div class="three-item-img" @click.stop="toggle(data)">
            <img
              v-if="data.visible"
              :src="getIconImg('show.png')"
              class="tree-visible" />
            <img v-else :src="getIconImg('hidden.png')" class="tree-visible" />
          </div>
          <p>{{ data.label }}</p>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getIconImg } from "../../../utils/globalMethods";
import * as THREE from "three";

const props = defineProps({
  scene: {
    type: THREE.Scene,
  },
});
const defaultProps = {
  children: "children",
  label: "label",
};
interface Tree {
  label: string;
  id: number;
  visible: boolean;
  children?: Tree[];
}

const handleNodeClick = (data: Tree) => {
  console.log(data.children);
};

const sceneTree = ref<Tree[]>([]);

onMounted(() => {
  if (props.scene) {
    sceneTree.value = setSceneTree(props.scene).children as Tree[];
  }
});

function setSceneTree(
  root: THREE.Object3D<THREE.Object3DEventMap>,
) {
  let tempItem: Tree = {
    id: root.id,
    label: root.name || root.type,
    visible: root.visible,
  };
  if (root.children) {
    tempItem.children = [];
    root.children.forEach((item) => {
      tempItem.children?.push(setSceneTree(item))
    });
  } else {
    delete tempItem.children;
  }
  return tempItem
}

function toggle(data: Tree) {
  if (props.scene) {
    let scene = props.scene;
    let findObj = scene.getObjectById(data.id);

    if (findObj) {
      data.visible = !data.visible;
      findObj.visible = data.visible;
    }
  }
}
</script>
<style lang="scss" scoped>
.tree-container {
  width: $moduleTreeWidth;
  height: calc(100vh - 60px);
  overflow-y: auto;
  background-color: $bckColor;
  border-top-left-radius: $borderRadius;
  border-top-right-radius: $borderRadius;
  .module-name {
    border-top-left-radius: $borderRadius;
    border-top-right-radius: $borderRadius;
    font-weight: bold;
    font-size: 14px;
    color: var(--el-text-color-regular);
    padding: 15px;
    background-color: #29292d;
    text-align: center;
  }
}
.three-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 42px;
  width: 100%;
  height: 100%;
  .three-item-img {
    position: absolute;
    left: 0;
    height: 100%;
    line-height: 45px;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    img {
      width: 20px;
      height: 15px;
      margin: 0 8px;
    }
  }
  p {
    padding-left: 5px;
  }
}
</style>
