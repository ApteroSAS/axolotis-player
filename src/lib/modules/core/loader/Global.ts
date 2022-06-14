var axolotis = null;

export const GLOBAL_WORLDS_ENTITY = "worlds";
export const GLOBAL_LOCAL_MODULE = "localModules";

export function getGlobalStorage(): any {
  //not axolotis in window => create it
  if (typeof window !== "undefined") {
    if (!(window as any).axolotis) {
      (window as any).axolotis = {};
    }
  }

  //axolotis var not initialized with window
  if (!axolotis && typeof window !== "undefined") {
    axolotis = (window as any).axolotis;
  }

  if (!axolotis) {
    axolotis = {};
  }

  return axolotis;
}

export function setGlobalStorageValue(key, value) {
  let globalStorage = getGlobalStorage();
  globalStorage[key] = value;
}

export function getGlobalStorageValue<T>(key, auto: boolean = true): T {
  let globalStorage = getGlobalStorage();
  if (!globalStorage[key] && auto) {
    globalStorage[key] = {};
  }
  return globalStorage[key] as T;
}
