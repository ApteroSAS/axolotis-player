import { getGlobalStorage } from "@root/lib/modules/core/loader/Global";

export type Module = () => Promise<{ module: any; classname: string }>;
export interface LocalModules {
  [id: string]: Module;
}

export function registerLocalModule(
  name: string,
  module: Module,
  moduleStorage?: LocalModules
) {
  if (!moduleStorage) {
    moduleStorage = getGlobalStorage<LocalModules>("localModules");
  }
  if (moduleStorage[name]) {
    throw new Error("Module already defined");
  }
  moduleStorage[name] = module;
}

export function registerLocalModuleList(
  localModulesList: LocalModules,
  verbose: boolean = false,
  moduleStorage?: LocalModules
) {
  if (!moduleStorage) {
    moduleStorage = getGlobalStorage<LocalModules>("localModules");
  }
  if (verbose) {
    console.log("imported module :", localModulesList);
  }
  Object.assign(moduleStorage, localModulesList);
}

export async function instantiateLocalAsyncModule<T>(
  fqcn: string,
  localModules: LocalModules
): Promise<T> {
  const localModule = await localModules[fqcn]();
  const module = localModule.module;
  for (const key in module) {
    const sub = module[key];
    if (
      sub.prototype &&
      sub.prototype.constructor.name === localModule.classname
    ) {
      //identifiying the module
      return new sub();
    }
  }
  throw new Error("invalid factory " + fqcn + " - " + localModule.classname);
}
