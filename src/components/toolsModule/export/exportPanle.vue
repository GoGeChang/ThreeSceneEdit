<template>
  <div>
    <g-panle :title="'模型导出'">
      <template #content>
        <g-form :model="formData">
          <g-form-item label="导出品质">
            <el-radio-group v-model="formData.quality">
              <el-radio value="0">低</el-radio>
              <el-radio value="1">中</el-radio>
              <el-radio value="2">高</el-radio>
            </el-radio-group>
          </g-form-item>
        </g-form>
        <g-collapse
          style="width: calc(100% + 30px); position: relative; left: -15px">
          <g-collapse-item :title="'高级参数'">
            <g-form style="padding: 15px;padding-bottom: 0;">
              <g-form-item label="构建量化属性">
                <el-radio-group>
                  <el-radio-button>是</el-radio-button>
                  <el-radio-button>否</el-radio-button>
                </el-radio-group>
              </g-form-item>
            </g-form>
          </g-collapse-item>
        </g-collapse>
      </template>
      <template #foot>
        <el-button size="small" type="primary">确定</el-button>
        <el-button size="small" type="warning">取消</el-button>
      </template>
    </g-panle>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

let formData = ref({
  quality: "1",
});
</script>
<style lang="scss" scoped></style>
