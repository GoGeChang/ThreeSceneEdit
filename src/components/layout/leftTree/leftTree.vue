<template>
  <div class="left-container">
    <el-tree
      style="max-width: 600px"
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick">
    </el-tree>
  </div>
</template>

<script lang="ts" setup>
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
</script>
<style lang="scss" scoped>
.left-container {
  width: $moduleTreeWidth;
  height: 100vh;
  background-color: $bckColor;
}
</style>
