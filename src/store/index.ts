import { defineStore } from "pinia";
import * as THREE from "three";

export const globalStore = defineStore("global", {
  state() {
    return {
      /**
       * 当前右侧功能栏，默认infor功能栏
       */
      currentFuncTab: "infor",
      /**
       * 顶部选中的功能栏
       */
      currentTopTool: "",
      /**
       * 全局Three的场景
       */
      scene: new THREE.Scene
    }
  },
  actions: {
    /**
     * 设置当前右侧功能栏
     * @param tabName 右侧tab名
     */
    setCurrentFuncTab(tabName: string) {
      this.currentFuncTab = tabName;
    },
    /**
     * 设置顶部功能栏
     * @param toolName 顶部功能栏名
     */
    setCurrentTopTool(toolName: string) {
      this.currentTopTool = toolName;
    },
    /**
     * 设置全局场景
     */
    setScene(scene: THREE.Scene) {
      this.scene = scene;
    }
  }
})