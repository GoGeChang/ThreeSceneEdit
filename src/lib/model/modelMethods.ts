import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * 导出模型
 * @param exportObj
 */
export function exportModel(
  exportObj: THREE.Object3D<THREE.Object3DEventMap>,
  options = {
    trs: true,
    onlyVisible: true,
    binary: true,
  }
) {
  let exporter = new GLTFExporter();
  let exportModel = new THREE.Group();

  exportObj.traverse((obj: THREE.Object3D<THREE.Object3DEventMap>) => {
    if (obj.userData.needExport) {
      exportModel.add(obj.clone());
    }
  });

  try {
    exporter.parse(
      exportModel,
      (modelData) => {
        downModel(modelData as ArrayBuffer);
      },
      (error) => {
        console.error(error);
      },
      options
    );
  } catch (error) {
    return error;
  }
}

/**
 * 下载模型
 * @param model
 */
export function downModel(model: ArrayBuffer) {
  let blobData = new Blob([model], { type: "application/octet-stream" });
  let dataUrl = URL.createObjectURL(blobData);

  let oA = document.createElement("a");
  oA.style.display = "none";

  oA.href = dataUrl;
  oA.download = new Date().toLocaleDateString() + ".glb";
  document.body.appendChild(oA);

  oA.click();

  URL.revokeObjectURL(dataUrl);
  document.body.removeChild(oA);
}

export async function importModel(modelData: ArrayBuffer, path = "./") {
  let glbLoader = new GLTFLoader();
  let model = await glbLoader.parseAsync(modelData, path);
  model.scene.userData.canExport = true;

  return model;
}
