import { CodeLoaderComponent } from "@root/lib/modules/core/loader/CodeLoaderComponent";
import { ServiceEntity } from "@root/lib/modules/core/service/ServiceEntity";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";

export const BUILD_VERSION = require("../../../../../package.json").version;
console.log(BUILD_VERSION);

const domReady = (callBack: () => void) => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callBack);
  } else {
    callBack();
  }
};

const windowReady = (callBack: () => void) => {
  if (document.readyState === "complete" && document.body) {
    callBack();
  } else {
    window.addEventListener("DOMContentLoaded", callBack);
  }
};

export async function initHtmlFromUrl(
  url: string,
  config: {
    onProgress?: (progress: number, total: number) => void;
    onLoaded?: () => void;
  } = {}
): Promise<WorldEntity> {
  if (!config.onProgress) {
    config.onProgress = (progress: number, total: number) => {
      console.log("[" + url + "] : [" + progress + "/" + total + "]");
    };
  }
  if (!config.onLoaded) {
    config.onLoaded = () => {
      console.log("[" + url + "] : loading complete");
    };
  }
  let serviceEntity = new ServiceEntity();
  let world = new WorldEntity();
  world.addComponent(serviceEntity);
  let codeLoaderComponent = new CodeLoaderComponent();
  serviceEntity.setService(
    "@aptero/axolotis-player/modules/core/loader/CodeLoaderService",
    codeLoaderComponent
  );
  const r = await fetch(url);
  const html = await r.text();
  const parser = new DOMParser();
  const document = parser.parseFromString(html, "text/html");
  let scene: HTMLCollection = document.body.getElementsByTagName("ax-scene"); //TODO assume only one scene
  if (!scene || (scene && scene.length == 0)) {
    console.warn("Axolotis scene not found (no tag ax-scene)");
    config.onLoaded();
    return;
  }
  console.log(scene);
  codeLoaderComponent
    .startLoadingJson(world, htmlToJson(scene), config.onProgress)
    .then(config.onLoaded);
  return world;
}

export function initHtml(
  config: {
    onProgress?: (progress: number, total: number) => void;
    onLoaded?: () => void;
  } = {}
): WorldEntity {
  if (!config.onProgress) {
    config.onProgress = (progress: number, total: number) => {
      console.log("[" + progress + "/" + total + "]");
    };
  }
  if (!config.onLoaded) {
    config.onLoaded = () => {
      console.log("loading complete");
    };
  }
  let serviceEntity = new ServiceEntity();
  let world = new WorldEntity();
  world.addComponent(serviceEntity);
  let codeLoaderComponent = new CodeLoaderComponent();
  serviceEntity.setService(
    "@aptero/axolotis-player/modules/core/loader/CodeLoaderService",
    codeLoaderComponent
  );
  windowReady(() => {
    let scene: HTMLCollection =
      window.document.body.getElementsByTagName("ax-scene"); //TODO assume only one scene
    if (!scene || (scene && scene.length == 0)) {
      console.warn("Axolotis scene not found (no tag ax-scene)");
      config.onLoaded();
      return;
    }
    console.log(scene);
    codeLoaderComponent
      .startLoadingJson(world, htmlToJson(scene), config.onProgress)
      .then(config.onLoaded);
  });
  return world;
}

function htmlToJson(scene: HTMLCollection): {
  version: string;
  entities: {
    components: {
      module: string;
      config: any;
      classname: string | undefined;
    }[];
  }[];
  services: { module: string }[];
} {
  let sceneEl = scene[0];
  const ret = {
    version: "2.0",
    entities: [],
    services: [],
  };
  // @ts-ignore
  for (const entity of sceneEl.getElementsByTagName("ax-entity")) {
    //§§§ ICI sdhdfhdfshdf
    let entityRet = { components: [] };

    for (const componentEl of entity.getElementsByTagName("ax-component")) {
      //convert relaxed json to proper json
      let correctJson = componentEl
        .getAttribute("config")
        .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
      let component = {
        module: componentEl.getAttribute("module"),
        config: JSON.parse(correctJson),
      };
      entityRet.components.push(component);
    }
    ret.entities.push(entityRet);
  }
  // @ts-ignore
  for (const service of sceneEl.getElementsByTagName("ax-service")) {
    ret.services.push({ module: service.getAttribute("module") });
  }
  return ret;
}
