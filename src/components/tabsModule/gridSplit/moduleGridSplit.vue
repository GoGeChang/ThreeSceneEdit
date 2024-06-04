<template>
  <div class="grid-split-container">
    <g-form label-width="100px" style="padding: 5px" :inline="true">
      <g-collapse v-model="collapseActive">
        <g-collapse-item :title="'通用参数'" name="1">
          <g-form-item label="显示法线" style="margin-top: 15px">
            <el-radio-group>
              <el-radio-button>是</el-radio-button>
              <el-radio-button>否</el-radio-button>
            </el-radio-group>
          </g-form-item>
          <g-form-item label="法线长度">
            <el-input style="width: 80px"></el-input>
          </g-form-item>
          <g-form-item label="法线夹角阈值">
          </g-form-item>
          <g-form-item>
            <div class="flex-center"  style="width: 100%;padding-left:30px;">
              <el-slider v-model="value2" style="width: 150px;"/>
              <el-input style="margin-left: 15px;width:50px;"></el-input>
            </div>
          </g-form-item>
          <g-form-item label="平均法线夹角阈值">
            <el-input style="width: 80px"></el-input>
          </g-form-item>
          <g-form-item label="按平均法线分组">
            <el-radio-group>
              <el-radio-button>是</el-radio-button>
              <el-radio-button>否</el-radio-button>
            </el-radio-group>
          </g-form-item>
        </g-collapse-item>
        <g-collapse-item :title="'高级参数'" name="2">
          <g-form-item label="仅保留正面" style="margin-top: 15px">
            <el-radio-group>
              <el-radio-button>是</el-radio-button>
              <el-radio-button>否</el-radio-button>
            </el-radio-group>
          </g-form-item>
          <g-form-item label="正面识别角度阈值">
            <el-input style="width: 80px"></el-input>
          </g-form-item>
          <g-form-item label="移除背面">
            <el-radio-group>
              <el-radio-button>是</el-radio-button>
              <el-radio-button>否</el-radio-button>
            </el-radio-group>
          </g-form-item>
          <g-form-item label="背面识别角度阈值">
            <el-input style="width: 80px"></el-input>
          </g-form-item>
          <g-form-item label="正面参考法线">
            <div class="flex-center">x：<el-input></el-input></div>
            <div class="flex-center">y： <el-input></el-input></div>
            <div class="flex-center">z：<el-input></el-input></div>
          </g-form-item>
          <g-form-item label="参考线数量">
            <el-input style="width: 80px"></el-input>
          </g-form-item>
          <g-form-item class="width-100">
            <el-button size="small">增加参考线</el-button>
            <el-button size="small" type="warning">清除参考线</el-button>
          </g-form-item>
        </g-collapse-item>
        <g-collapse-item :title="'操作按钮'" name="3">
          <g-form-item class="width-100" style="margin-top: 15px">
            <el-button size="small">开始拆分</el-button>
            <el-button size="small" type="warning">撤销拆分</el-button>
            <el-button size="small" type="success">保存结果</el-button>
          </g-form-item>
        </g-collapse-item>
      </g-collapse>
    </g-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
let collapseActive = ref(["1", "3"]);
</script>
<style lang="scss" scoped>
.grid-split-container {
  .grid-edit-btns {
    .el-button {
      margin: 4px 8px;
    }
  }
}
</style>
