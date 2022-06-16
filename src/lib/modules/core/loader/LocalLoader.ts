import { getGlobalStorageValue } from "@root/lib/modules/core/loader/Global";
import Component from "../ecs/Component";
import { WorldEntity } from "../ecs/WorldEntity";
import { Services } from "./service/Services";
import { GLOBAL_LOCAL_MODULE } from "@root/lib";

export type ModulePromise = (() => Promise<LongModule>) | (() => Promise<ShortModule>);
export type LongModule = { module: any; classname: string }; //in case there is several export in the file
export type ShortModule = { default: { name: string } }; //In this case the js module must be the default export of the class
export interface LocalModules {
  [id: string]: ModulePromise;
}

export function registerLocalModule(name: string, module: ModulePromise, moduleStorage?: LocalModules) {
  if (!moduleStorage) {
    moduleStorage = getGlobalStorageValue<LocalModules>(GLOBAL_LOCAL_MODULE); //GG name
  }
  if (moduleStorage[name]) {
    throw new Error("Module already defined");
  }
  moduleStorage[name] = module;
}

function getClassName(module: any): string {
  if (module.classname) {
    //LongModule Case
    return module.classname;
  } else if (module.default && module.default.name) {
    //ShortModule case
    return module.default.name;
  } else {
    console.error(module);
    throw new Error("Malformed module");
  }
}

export async function instantiateLocalAsyncModule<T>(fqcn: string, localModules: LocalModules, world: WorldEntity, config?: any): Promise<T> {
  const localModule = await localModules[fqcn]();
  let module = (localModule as any).module;
  if (!module) {
    module = localModule; //SortModule case definition
  }
  for (const key in module) {
    const sub = module[key];
    if (sub.prototype && sub.prototype.constructor.name === getClassName(localModule)) {
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
  throw new Error("invalid submodule " + fqcn + " - " + getClassName(localModule));
}
