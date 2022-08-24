import { ComponentName, getGlobalStorageValue, GLOBAL_WORLDS_ENTITY, IService, Services, WorldEntity } from "@root/lib";

export function getGlobalWorld() {
  let worlds = getGlobalStorageValue<WorldEntity[]>(GLOBAL_WORLDS_ENTITY, false);
  if (worlds && worlds.length > 0) {
    return worlds[0];
  } else {
    throw new Error("No Axolotis world initialized");
  }
}

export function getServiceSync<T extends IService>(serviceName: string, world: WorldEntity = null): T {
  if (!world) {
    world = getGlobalWorld();
  }
  return world.getFirstComponentByType<Services>(ComponentName).getServiceSync<T>(serviceName);
}

export async function getService<T extends IService>(serviceName: string, world: WorldEntity = null): Promise<T> {
  if (!world) {
    world = getGlobalWorld();
  }
  return world.getFirstComponentByType<Services>(ComponentName).getService<T>(serviceName);
}
