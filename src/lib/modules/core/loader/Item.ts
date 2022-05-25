import {
  getGlobalStorageValue,
  GLOBAL_STATIC_SERVICES,
  GLOBAL_WORLDS_ENTITY,
  IService,
  Module,
  registerLocalModule,
  Services,
  setGlobalStorageValue,
  WorldEntity,
} from "@root/lib";
import { ServiceExample } from "@root/demo/page/basic/ServiceExample";

/**
 * An Item (or SmartItem) is a set of Module (Services and/or Component)
 */
export interface Item {
  /**
   * Register a set of static services
   */
  staticService(): { [id: string]: IService };

  /**
   * Register Asynchronous/Dynamic Component or Service
   */
  modules(): { [id: string]: Module };
}

export function registerItem(item: Item) {
  let worlds = getGlobalStorageValue<WorldEntity[]>(GLOBAL_WORLDS_ENTITY, false);
  let services = item.staticService(); //instanciates all the services

  let staticServices = getGlobalStorageValue<{ [id: string]: IService }>(GLOBAL_STATIC_SERVICES);
  for (const key in services) {
    if (staticServices[key]) {
      throw new Error("service already exist");
    }
    staticServices[key] = services[key];
  }
  setGlobalStorageValue(GLOBAL_STATIC_SERVICES, { ...services, ...getGlobalStorageValue<{ [id: string]: IService }>(GLOBAL_STATIC_SERVICES) });
  if (worlds) {
    for (const world of worlds) {
      if (!world) {
        throw new Error("undefined world");
      }
      for (const key in services) {
        world.getFirstComponentByType<Services>(Services.name).setService(key, services[key]);
      }
    }
  }

  let modules = item.modules();
  for (const key in modules) {
    registerLocalModule(key, modules[key]);
  }
}
