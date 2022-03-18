/*
please do not add static import
 */
export class AssetsLoader {
  loaderCache = {};
  assets = {};

  async getLoader(loaderName: string, loaderLoader: () => void) {
    if (!this.loaderCache[loaderName]) {
      this.loaderCache[loaderName] = await loaderLoader();
    }
    return this.loaderCache[loaderName];
  }
}

export const assetsLoader: AssetsLoader = new AssetsLoader();

export async function loadAssets(path: string) {
  if (assetsLoader.assets[path]) {
    return assetsLoader.assets[path];
  }
  /*
    TODO createa a early start download of assets so that the GLB start downloading early in the waterfall
    Not as simple as it seems may be doable using service worker
    fetch(path);//start download of assets
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", ()=>{});
    oReq.open("GET", path);
    oReq.send();
    */
  if (path.endsWith(".glb")) {
    const loader = await assetsLoader.getLoader("GLTFLoader", async () => {
      const GLTFLoader: any = await import(
        "three/examples/jsm/loaders/GLTFLoader"
      );
      const gltfLoader = new GLTFLoader.GLTFLoader();
      return gltfLoader;
    });
    const result = await loader.loadAsync(path);
    assetsLoader.assets[path] = result;
  }
  if (path.endsWith(".jpg")) {
    const loader = await assetsLoader.getLoader("TextureLoader", async () => {
      const THREE: any = await import("three");
      const texLoader = new THREE.TextureLoader();
      return texLoader;
    });
    const result = await loader.loadAsync(path);
    assetsLoader.assets[path] = result;
  }
  return assetsLoader.assets[path];
}
