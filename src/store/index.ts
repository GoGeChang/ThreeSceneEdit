import { defineStore } from "pinia";
import * as THREE from "three";

interface selecteMesh {
  selectedMesh: THREE.Object3D<THREE.Object3DEventMap> | null
}
export const globalStore = defineStore("global", {
  state(): selecteMesh {
    return {
      /**
       * 当前右侧功能栏，默认infor功能栏
       */
      selectedMesh: null
    };
  },
  actions: {
    /**
     * 设置选中的mesh对象
     * @param mesh 选中的对象
     */
    setSelectedMesh(mesh: THREE.Object3D<THREE.Object3DEventMap>) {
      this.selectedMesh = mesh;
    }
  },
});
