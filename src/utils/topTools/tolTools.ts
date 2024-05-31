export function openFileSelect() {
  return new Promise((res, rej) => {
    let oFile = document.createElement("input");
    oFile.type = "file";
    oFile.style.display = "none";
    oFile.accept = ".glb";
    document.body.appendChild(oFile);
    oFile.click();
    oFile.onchange = async (e) => {
      let files = (e.target as HTMLInputElement).files;
      if (files && files.length) {
        let data = await files[0].arrayBuffer();
        res(data);
        document.body.removeChild(oFile);
      } else {
        rej()
      }
    };
  });
}
