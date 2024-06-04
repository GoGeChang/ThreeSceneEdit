<template>
  <el-tooltip  placement="left" v-bind="$attrs">
    <div class="tooltip-btn" :class="{'tooltip-btn-active': props.active}" @click="sendClick">
      <img :src="imgUrl">
    </div>
  </el-tooltip>
</template>

<script lang='ts' setup>
import { getIconImg } from '@/utils/globalMethods';
let props = defineProps<{
  herf: string;
  active: boolean;
}>();

let imgUrl = getIconImg(props.herf);
let emits = defineEmits(["click"]);

function sendClick() {
  emits("click");
}
</script>
<style lang='scss' scoped>
.tooltip-btn{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;  
  padding: 8px;
  border-radius: 4px;
  background: rgb(52, 51, 55);
  cursor: pointer;
  margin: 8px;
  transition: all .3s;
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
</style>