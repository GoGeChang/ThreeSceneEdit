<template>
  <div>
    <g-panle :title="'网格合并'">
      <template #content> 操作 </template>
      <template #foot>
        <div>
          <el-button size="small">合并选中</el-button>
          <el-button size="small">自动合并</el-button>
        </div>
        <el-button size="small" type="warning">取消选中</el-button>
        <el-button size="small" type="warning">撤销</el-button>
        <el-button size="small" type="success">应用</el-button>
      </template>
    </g-panle>
  </div>
</template>

<script lang="ts" setup></script>
<style lang="scss" scoped></style>
