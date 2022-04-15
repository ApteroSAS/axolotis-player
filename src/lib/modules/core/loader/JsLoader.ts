import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
import Component from "@root/lib/modules/core/ecs/Component";
import {
  instantiateLocalAsyncModule,
  LocalModules,
} from "@root/lib/modules/core/loader/LocalLoader";
import { getGlobalStorage } from "@root/lib/modules/core/loader/global";

export async function instantiateAsyncModule<T>(
  moduleName: string,
  moduleStorage: LocalModules
): Promise<T> {
  let module = null;
  if (moduleStorage) {
    module = await instantiateLocalAsyncModule<ComponentFactory<Component>>(
      moduleName,
      moduleStorage
    );
  } else if (moduleName.startsWith("http")) {
    //TODO remote module "https://"
    throw new Error("remote modules not implemented yet");
  } else {
    console.log("local module installed:", moduleStorage);
    throw new Error("unknown module - please register it - " + moduleName);
  }
  return module;
}
