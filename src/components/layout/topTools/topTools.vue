<template>
  <div class="top-container">
    <ul class="tools-list">
      <li
        v-for="item in toolsNav"
        class="tools-list-item"
        @click="func[item.key]()">
        <img :src="getIconImg(item.icon)" alt="" />
        <label for="img">{{ item.label }}</label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { getIconImg } from "@/utils/globalMethods";
import { openFileSelect } from "@/utils/topTools/tolTools";

const toolsNav = [
  {
    icon: "save.png",
    label: "保存",
    key: "save",
  },
  {
    icon: "modelImport.png",
    label: "导入",
    key: "import",
  },
  {
    icon: "modelExport.png",
    label: "导出",
    key: "export",
  },
];

let emits = defineEmits(["click"]);

const func: { [key: string]: Function } = {
  import: async () => {
    let fileData = await openFileSelect();
    emits("click", { type: "import", value: fileData });
  },
  export: async () =>{
    emits("click", { type: "export" });
  }
};
</script>
<style lang="scss" scoped>
.top-container {
  height: $toolsNavHeight;
  background: rgb(29, 29, 29);
  margin-bottom: 8px;
  color: rgb(211, 211, 211);
  .tools-list {
    height: 100%;
    display: flex;
    align-items: center;
    &-item {
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      width: 60px;
      img {
        width: 14px;
        height: 14px;
        margin-top: 8px;
        cursor: pointer;
      }
      label {
        font-size: 12px;
        margin: 4px 0;
        cursor: pointer;
      }
      &:hover {
        background-color: black;
      }
    }
  }
}
</style>
