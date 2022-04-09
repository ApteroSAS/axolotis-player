import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
import Component from "@root/lib/modules/core/ecs/Component";
import { instanciateLocalAsyncModule } from "@root/lib/modules/core/loader/LocalLoader";
import { loadModules } from "@root/lib/generated/webpack/module/WebpackLoader";
import { getGlobalStorage } from "@root/lib/modules/core/loader/global";

export type Module = () => Promise<{ module: any; classname: string }>;
export interface LocalModules {
  [id: string]: Module;
}

export function registerLocalModule(name: string, module: Module) {
  if (getGlobalStorage<LocalModules>("localModules")[name]) {
    throw new Error("Module already defined");
  }
  getGlobalStorage<LocalModules>("localModules")[name] = module;
}

export function registerLocalModuleList(
  localModulesList: LocalModules,
  verbose: boolean = false
) {
  if (verbose) {
    console.log("imported module :", localModulesList);
  }
  Object.assign(
    getGlobalStorage<LocalModules>("localModules"),
    localModulesList
  );
}

registerLocalModuleList(loadModules());

export async function instanciateJsAsyncModule<T>(
  moduleName: string
): Promise<T> {
  let module = null;
  if (getGlobalStorage<LocalModules>("localModules")[moduleName]) {
    module = await instanciateLocalAsyncModule<ComponentFactory<Component>>(
      moduleName,
      getGlobalStorage<LocalModules>("localModules")
    );
  } else {
    //TODO remote module "https://"
    console.log(
      "local module installed:",
      getGlobalStorage<LocalModules>("localModules")
    );
    throw new Error("unknown module - please register it - " + moduleName);
  }
  return module;
}
