import { defineStore } from "pinia";

export const funcTabsStore = defineStore("funcTabsStore", {
  state() {
    return {
      /**
       * 当前右侧功能栏，默认场景功能栏
       */
      currentFuncTab: "scene",
    };
  },
  actions: {
    /**
     * 设置当前右侧功能栏
     * @param tabName 右侧tab名
     */
    setCurrentFuncTab(tabName: string) {
      this.currentFuncTab = tabName;
    }
  },
});
