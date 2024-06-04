<template>
  <div>
    <g-panle :title="'实例化'">
      <template #content>
        <g-form label-width="125px" :model="formData">
          <g-form-item label="只显示选中对象">
            <el-radio-group>
              <el-radio-button>是</el-radio-button>
              <el-radio-button>否</el-radio-button>
            </el-radio-group>
          </g-form-item>
          <g-form-item label="实例化后移除空节点">
            <el-radio-group>
              <el-radio-button >是</el-radio-button>
              <el-radio-button >否</el-radio-button>
            </el-radio-group>
          </g-form-item>
          <g-form-item label="以第一个实例为参考系">
            <el-radio-group>
              <el-radio-button >是</el-radio-button>
              <el-radio-button >否</el-radio-button>
            </el-radio-group>
          </g-form-item>
        </g-form>
      </template>
      <template #foot>
        <el-button size="small">清除</el-button>
        <el-button size="small">实例化</el-button>
        <el-button size="small">自动识别</el-button>
        <el-button size="small" type="success">应用</el-button>
      </template>
    </g-panle>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
let formData = ref({});
</script>
<style lang="scss" scoped></style>
