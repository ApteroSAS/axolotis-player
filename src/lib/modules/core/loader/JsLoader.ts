import Component from "@root/lib/modules/core/ecs/Component";
import { instantiateLocalAsyncModule, LocalModules } from "@root/lib/modules/core/loader/LocalLoader";
import { WorldEntity } from "../ecs/WorldEntity";

export async function instantiateAsyncModule<T>(moduleName: string, moduleStorage: LocalModules, world?: WorldEntity, config?: any): Promise<T> {
  let module = null;
  if (moduleStorage && moduleStorage[moduleName]) {
    module = await instantiateLocalAsyncModule<Component>(moduleName, moduleStorage, world, config);
  } else if (moduleName.startsWith("http")) {
    //TODO remote module "https://"
    throw new Error("remote modules not implemented yet");
  } else {
    console.log("local module installed:", moduleStorage);
    throw new Error("unknown module - please register it - " + moduleName);
  }
  return module;
}
