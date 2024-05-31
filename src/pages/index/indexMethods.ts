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

/**
 * 导出模型
 * @param module 
 */
export function exportModule(module: ArrayBuffer) {
  let blobData = new Blob([module], { type: "application/octet-stream" });
  let dataUrl = URL.createObjectURL(blobData);

  let oA = document.createElement("a");
  oA.style.display = "none";

  oA.href = dataUrl;
  oA.download = new Date().toLocaleDateString() + '.glb';
  document.body.appendChild(oA);

  oA.click();

  URL.revokeObjectURL(dataUrl);

  document.body.removeChild(oA);
}
