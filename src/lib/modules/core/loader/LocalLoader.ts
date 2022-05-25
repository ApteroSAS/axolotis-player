import { getGlobalStorageValue } from "@root/lib/modules/core/loader/Global";
import Component from "../ecs/Component";
import { WorldEntity } from "../ecs/WorldEntity";
import { Services } from "./service/Services";
import { GLOBAL_LOCAL_MODULE } from "@root/lib";

export type Module = () => Promise<{ module: any; classname: string }>;
export interface LocalModules {
  [id: string]: Module;
}

export function registerLocalModule(name: string, module: Module, moduleStorage?: LocalModules) {
  if (!moduleStorage) {
    moduleStorage = getGlobalStorageValue<LocalModules>(GLOBAL_LOCAL_MODULE);
  }
  if (moduleStorage[name]) {
    throw new Error("Module already defined");
  }
  moduleStorage[name] = module;
}

export function registerLocalModuleList(localModulesList: LocalModules, verbose: boolean = false, moduleStorage?: LocalModules) {
  if (!moduleStorage) {
    moduleStorage = getGlobalStorageValue<LocalModules>(GLOBAL_LOCAL_MODULE);
  }
  if (verbose) {
    console.log("imported module :", localModulesList);
  }
  Object.assign(moduleStorage, localModulesList);
}

export async function instantiateLocalAsyncModule<T>(fqcn: string, localModules: LocalModules, world: WorldEntity, config?: any): Promise<T> {
  const localModule = await localModules[fqcn]();
  const module = localModule.module;
  for (const key in module) {
    const sub = module[key];
    if (sub.prototype && sub.prototype.constructor.name === localModule.classname) {
      let DependencyComponentList: Component[] = [];
      if (sub.dependencies) {
        for (let i = 0; i < sub.dependencies.length; i++) {
          const dep = sub.dependencies[i];
          let services = world.getFirstComponentByType<Services>(Services.name);
          let service = await services.getService<Component>(dep);
          DependencyComponentList.push(service);
        }
      }
      if (config != undefined) {
        return new sub(...DependencyComponentList, config);
      } else {
        return new sub(...DependencyComponentList);
      }
    }
  }
  throw new Error("invalid submodule " + fqcn + " - " + localModule.classname);
}
