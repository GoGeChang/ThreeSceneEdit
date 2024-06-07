import * as THREE from "three";
/**
 * 清空场景对象
 * @param scene
 * @param obj
 */
export function clearScene(
  scene: THREE.Scene,
  obj: THREE.Object3D<THREE.Object3DEventMap>
) {
  obj.traverse((item) => {
    if (item instanceof THREE.Mesh) {
      item.material.dispose();
      item.geometry.dispose();
      scene.remove(item);
    }
  });
}
