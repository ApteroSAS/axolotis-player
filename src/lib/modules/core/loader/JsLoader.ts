import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
import Component from "@root/lib/modules/core/ecs/Component";
import { instanciateLocalAsyncModule } from "@root/lib/modules/core/loader/LocalLoader";
import { loadModules } from "@root/lib/generated/webpack/module/WebpackLoader";

export type Module = () => Promise<{ module: any; classname: string }>;
export interface LocalModules {
  [id: string]: Module;
}
declare const window: any;

if (window) {
  if (!window.axolotis) {
    window.axolotis = {};
  }
  if (!window.axolotis.localModule) {
    window.axolotis.localModule = {};
  }
}
let localModules: LocalModules = window.axolotis.localModule || {};

export function registerLocalModule(name: string, module: Module) {
  if (localModules[name]) {
    throw new Error("Module already defined");
  }
  localModules[name] = module;
}

export function registerLocalModuleList(
  localModulesList: LocalModules,
  verbose: boolean = false
) {
  if (verbose) {
    console.log("imported module :", localModulesList);
  }
  Object.assign(localModules, localModulesList);
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
    console.log("local module installed:", localModules);
    throw new Error("unknown module - please register it - " + moduleName);
  }
  return module;
}
