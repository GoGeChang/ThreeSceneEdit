<template>
  <el-tooltip
    placement="left"
    style="position: relative"
    :effect="'dark'"
    v-if="disable">
    <div
      class="tooltip-btn"
      :class="{ 'tooltip-btn-active': active, 'tooltip-btn-disable': disable }">
      <img :src="imgUrl" />
    </div>
    <template #content>
      <slot name="content"></slot>
    </template>
  </el-tooltip>
  <el-tooltip placement="left" v-bind="$attrs" :effect="'dark'" v-else>
    <div class="tooltip-btn" :class="{ 'tooltip-btn-active': active }"  @click="sendClick">
      <img :src="imgUrl" />
    </div>
    <template #content>
      <slot name="content"></slot>
    </template>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { getIconImg } from "@/utils/globalMethods";
let props = defineProps<{
  herf: string;
  active: boolean;
  disable?: boolean;
}>();

let imgUrl = getIconImg(props.herf);
let emits = defineEmits(["click"]);

function sendClick() {
  emits("click");
}
</script>
<style lang="scss" scoped>
.tooltip-btn {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 4px;
  background: rgb(52, 51, 55);
  cursor: pointer;
  margin: 8px;
  transition: all 0.3s;
  img {
    width: 100%;
    height: 100%;
    padding: 3px;
  }
  &:hover {
    background-color: $primaryColor;
  }
}
.tooltip-btn-active {
  background-color: $primaryColor;
}
.tooltip-btn-disable {
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 2;
    background-color: rgba($color: #000000, $alpha: 0.5);
  }
  &:hover {
    background-color: rgb(52, 51, 55);
  }
}
</style>
