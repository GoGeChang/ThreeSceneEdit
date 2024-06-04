<template>
  <div class="grid-edit-container">
    <g-collapse v-model="collapseActive">
      <g-collapse-item :title="'通用参数'" name="1">
        <g-form label-width="80px" style="margin-top: 15px">
          <g-form-item label="编辑操作">
            <el-select>
              <el-option value="1" label="1"></el-option>
              <el-option value="2" label="2"></el-option>
            </el-select>
          </g-form-item>
          <g-form-item label="顶点高度">
            <el-input style="width: 80px"></el-input>
          </g-form-item>
          <g-form-item label="采样下降高度">
            <el-input style="width: 80px"></el-input>
          </g-form-item>
          <g-form-item label="采样向上贴地">
            <el-radio-group>
              <el-radio-button>是</el-radio-button>
              <el-radio-button>否</el-radio-button>
            </el-radio-group>
          </g-form-item>
          <g-form-item label="当前点坐标">
            <div class="flex-center">x：<el-input></el-input></div>
            <div class="flex-center">y： <el-input></el-input></div>
            <div class="flex-center">z：<el-input></el-input></div>
          </g-form-item>
          <g-form-item label="顶点偏移量">
            <div class="flex-center">x：<el-input></el-input></div>
            <div class="flex-center">y： <el-input></el-input></div>
            <div class="flex-center">z：<el-input></el-input></div>
          </g-form-item>
          <g-form-item label="显示原始网格">
            <el-radio-group>
              <el-radio-button>是</el-radio-button>
              <el-radio-button>否</el-radio-button>
            </el-radio-group>
          </g-form-item>
          <g-form-item label="填充三角面">
            <el-radio-group>
              <el-radio-button>是</el-radio-button>
              <el-radio-button>否</el-radio-button>
            </el-radio-group>
          </g-form-item>
          <g-form-item label="深度测试">
            <el-radio-group>
              <el-radio-button>是</el-radio-button>
              <el-radio-button>否</el-radio-button>
            </el-radio-group>
          </g-form-item>
        </g-form>
      </g-collapse-item>
      <g-collapse-item :title="'操作按钮'" name="2">
        <g-form-item
          class="grid-edit-btns"
          label="操作"
          style="padding:12px;padding-bottom: 0;">          
          <el-button size="small">添加采样</el-button>
          <el-button size="small">开始采样</el-button>
          <el-button size="small" type="warning">清除采样</el-button>
          <el-button size="small">添加辅助</el-button>
          <el-button size="small" type="warning">清除辅助</el-button>
          <el-button size="small">开始编辑</el-button>
          <el-button size="small" type="warning">取消编辑</el-button>
          <el-button size="small" type="success">完成编辑</el-button>
        </g-form-item>
      </g-collapse-item>
    </g-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

let collapseActive = ref(["1", "2"]);
</script>
<style lang="scss" scoped>
.grid-edit-container {
  border-radius: $borderRadius;
  padding: 8px;
  .grid-edit-btns {
    .el-button {
      margin: 4px 8px;
    }
  }
}
</style>
