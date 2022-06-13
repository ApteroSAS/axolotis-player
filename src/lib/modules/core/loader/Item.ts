import { Module, registerLocalModule } from "@root/lib";

/**
 * An Item (or SmartItem) is a set of Module (Services and/or Component)
 */
export interface Item {
  /**
   * Register Asynchronous/Dynamic Component or Service
   */
  modules(): { [id: string]: Module };
}

export function registerItem(item: Item) {
  let modules = item.modules();
  for (const key in modules) {
    registerLocalModule(key, modules[key]);
  }
}
