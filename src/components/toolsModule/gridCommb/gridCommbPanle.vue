<template>
  <div>
    <g-panle :title="'网格组合'">
      <template #content>
        <g-form>
          <g-form-item label="中心位置不变">
            <el-radio-group>
              <el-radio-button>是</el-radio-button>
              <el-radio-button>否</el-radio-button>
            </el-radio-group>
          </g-form-item>
        </g-form>
      </template>
      <template #foot>
        <el-button size="small">组合选中</el-button>
        <el-button size="small">自动分组</el-button>
        <el-button size="small" type="warning">撤销</el-button>
        <el-button size="small" type="warning">取消选中</el-button>
        <el-button size="small" type="success">应用</el-button>
      </template>
    </g-panle>
  </div>
</template>

<script lang="ts" setup></script>
<style lang="scss" scoped></style>
