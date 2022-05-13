import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
import { createWorld } from "@root/lib/modules/core/loader/BasicInit";
import {
  WorldDefinition,
  WorldDefinitionV2,
} from "@root/lib/modules/core/loader/WorldDefinition";

export const BUILD_VERSION = require("../../../../../package.json").version;
console.log("Axolotis-player version :" + BUILD_VERSION);

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
  const world = await createWorld(htmlToJson(scene), config.onProgress);
  config.onLoaded();
  return world;
}

export function initHtml(
  config: {
    onProgress?: (progress: number, total: number) => void;
    onLoaded?: (world: WorldEntity) => void;
  } = {}
) {
  if (!config.onProgress) {
    config.onProgress = (progress: number, total: number) => {
      console.log("[" + progress + "/" + total + "]");
    };
  }
  if (!config.onLoaded) {
    config.onLoaded = (world: WorldEntity) => {
      console.log("loading complete");
    };
  }
  windowReady(() => {
    let scene: HTMLCollection =
      window.document.body.getElementsByTagName("ax-scene"); //TODO assume only one scene
    if (!scene || (scene && scene.length == 0)) {
      console.warn("Axolotis scene not found (no tag ax-scene)");
      createWorld().then(config.onLoaded);
      return;
    }
    console.log(scene);
    createWorld(htmlToJson(scene), config.onProgress).then(config.onLoaded);
  });
}

function htmlToJson(scene: HTMLCollection): WorldDefinition {
  let sceneEl = scene[0];
  const ret: WorldDefinitionV2 = {
    version: "2.0",
    entities: [],
  };
  // @ts-ignore
  for (const entity of sceneEl.getElementsByTagName("ax-entity")) {
    let entityRet = { components: [] };

    for (const componentEl of entity.getElementsByTagName("ax-component")) {
      let correctJson = JSON.stringify({});
      if (componentEl.getAttribute("config")) {
        //convert relaxed json to proper json
        correctJson = componentEl
          .getAttribute("config")
          .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
      }
      let component = {
        module: componentEl.getAttribute("module"),
        config: JSON.parse(correctJson),
      };
      entityRet.components.push(component);
    }
    ret.entities.push(entityRet);
  }
  return ret;
}
