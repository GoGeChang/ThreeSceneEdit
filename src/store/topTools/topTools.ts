import { defineStore } from "pinia";

export const topToolsStore = defineStore("topToolsStore", {
  state() {
    return {
      /**
       * 顶部选中的功能栏
       */
      currentTopTool: "",
      /**
       * 顶部选中功能栏参数配置菜单
       */
      currentToolMenue: "",
    };
  },
  actions: {
    /**
     * 设置顶部功能栏
     * @param toolName 顶部功能栏名
     */
    setCurrentTopTool(toolName: string) {
      this.currentTopTool = toolName;
    },
    /**
     * 设置顶部功能栏二级菜单
     * @param menueName 顶部功能栏名
     */
    setCurrentToolMenue(menueName: string) {
      this.currentToolMenue = menueName;
    },
  },
});
