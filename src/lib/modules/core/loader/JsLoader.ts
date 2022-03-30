import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
import Component from "@root/lib/modules/core/ecs/Component";
import { instanciateLocalAsyncModule } from "@root/lib/modules/core/loader/LocalLoader";
import { loadModules } from "@root/lib/generated/webpack/module/WebpackLoader";

export type Module = () => Promise<{ module: any; classname: string }>;
export interface LocalModules {
  [id: string]: Module;
}

let localModules: LocalModules = {};

export function registerLocalModule(name: string, module: Module) {
  if (localModules[name]) {
    throw new Error("Module already defined");
  }
  localModules[name] = module;
}

export function registerLocalModuleList(localModulesList: LocalModules) {
  localModules = { ...localModules, ...localModulesList };
}

registerLocalModuleList(loadModules());

export async function instanciateJsAsyncModule<T>(
  moduleName: string
): Promise<T> {
  let module = null;
  if (localModules[moduleName]) {
    module = await instanciateLocalAsyncModule<ComponentFactory<Component>>(
      moduleName,
      localModules
    );
  } else {
    //TODO remote module "https://"
    throw new Error("unkown module - plese register it - " + moduleName);
  }
  return module;
}
