<template>
  <div class="panle" style="position: relativel">
    <p class="panle-title">
      {{ props.title
      }}<span size="small" @click="close" class="panle-close-btn">x</span>
    </p>

    <div class="panle-content">
      <slot name="content"></slot>
    </div>
    <div class="panle-foot">
      <div class="flex-space-between flex-wrap">
        <slot name="foot"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted } from "vue";
import { topToolsStore } from "@/store/topTools/topTools";

let props = defineProps<{
  clearStore: boolean;
  title: string;
}>();
let emits = defineEmits(["close"]);

let _topToolsStore = topToolsStore();

onUnmounted(() => {
  if (props.clearStore) {
    _topToolsStore.setCurrentTopTool("");
  }
});

function close() {
  _topToolsStore.setCurrentTopTool("");
  emits("close");
}
</script>
<style lang="scss" scoped>
.panle {
  background-color: $panleBckColor;

  position: relative;
  top: 8px;
  left: calc($moduleTreeWidth + 5px);
  z-index: 1;
  width: 300px;
  border-radius: $borderRadius;
  font-size: 12px;
  .panle-title {
    text-align: center;
    font-weight: bold;
    background-color: $titleClor;
    height: 35px;
    line-height: 35px;
    .panle-close-btn {
      position: absolute;
      right: 15px;
      cursor: pointer;
      font-size: 14px;
    }
  }
  .panle-content {
    padding: 15px;
  }
  .panle-foot {
    border-top: 1px solid #000;
    padding: 15px;
    flex-wrap: wrap;
    :deep(.el-button) {
      margin: 5px;
      flex: 1;
    }
  }
}
</style>
