<template>
  <div class="left-container">
    <div class="module-name">汽车模型.gltf</div>
    <el-tree
      style="max-width: 600px"
      :data="data"
      :props="defaultProps"
      :render-after-expand="false"
      @node-click="handleNodeClick">
      <template #default="{ node, data }">
        <div class="three-item">
          <div class="three-item-img" @click.stop="toggle(data)">
            <img
              v-if="!data.visible"
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
import { getIconImg } from "../../../utils/globalMethods";
const defaultProps = {
  children: "children",
  label: "label",
};
interface Tree {
  label: string;
  children?: Tree[];
}

const handleNodeClick = (data: Tree) => {
  console.log(data.children);
};

const data: Tree[] = [
  {
    label: "Level one 1",
    children: [
      {
        label: "Level two 1-1",
        children: [
          {
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 2",
    children: [
      {
        label: "Level two 2-1",
        children: [
          {
            label: "Level three 2-1-1",
            children: [
              {
                label: "Level three 2-1-1",
              },
            ],
          },
        ],
      },
      {
        label: "Level two 2-2",
        children: [
          {
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 3",
    children: [
      {
        label: "Level two 3-1",
        children: [
          {
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        label: "Level two 3-2",
        children: [
          {
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
];

function toggle(data: any) {
  data.visible = !data.visible;
}
</script>
<style lang="scss" scoped>
.left-container {
  width: $moduleTreeWidth;
  height: 100vh;
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
