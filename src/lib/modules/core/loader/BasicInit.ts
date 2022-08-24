import { ComponentName, Services } from "@root/lib/modules/core/loader/service/Services";
import { InitialComponentLoader, CODE_LOADER_MODULE_NAME } from "@root/lib/modules/core/loader/InitialComponentLoader";
import { getGlobalStorageValue, GLOBAL_LOCAL_MODULE, GLOBAL_WORLDS_ENTITY, setGlobalStorageValue } from "@root/lib/modules/core/loader/Global";
import { LocalModules } from "@root/lib/modules/core/loader/LocalLoader";
import { WorldDefinition } from "@root/lib/modules/core/loader/WorldDefinition";
import { WorldEntity } from "@root/lib";

export function createWorldSync(
  initialScene: WorldDefinition = {
    version: "2.0",
    entities: [],
  },
  loadedCallBack: (progress: number, total: number) => void = () => {},
  finished: (world: WorldEntity) => void = () => {},
  moduleStorage?: LocalModules,
  world?: WorldEntity
) {
  if (!world) {
    world = new WorldEntity();
  }
  if (!getGlobalStorageValue(GLOBAL_WORLDS_ENTITY, false)) {
    setGlobalStorageValue(GLOBAL_WORLDS_ENTITY, [world]);
  } else {
    getGlobalStorageValue<WorldEntity[]>(GLOBAL_WORLDS_ENTITY).push(world);
  }
  if (!moduleStorage) {
    moduleStorage = getGlobalStorageValue<LocalModules>(GLOBAL_LOCAL_MODULE);
  }
  let serviceEntity = new Services(world);
  world.addComponent(serviceEntity);

  let staticServices = {};
  if (!staticServices[CODE_LOADER_MODULE_NAME]) {
    staticServices[CODE_LOADER_MODULE_NAME] = new InitialComponentLoader();
  }
  for (const key in staticServices) {
    world.getFirstComponentByType<Services>(ComponentName).setService(key, staticServices[key]);
  }

  (staticServices[CODE_LOADER_MODULE_NAME] as InitialComponentLoader).startLoading(world, initialScene, loadedCallBack, moduleStorage).then(() => {
    finished(world);
  });
  return world;
}

export async function createWorld(
  initialScene: WorldDefinition = {
    version: "2.0",
    entities: [],
  },
  loadedCallBack: (progress: number, total: number) => void = () => {},
  moduleStorage?: LocalModules,
  world?: WorldEntity
) {
  return new Promise<WorldEntity>((resolve) => {
    createWorldSync(initialScene, loadedCallBack, resolve, moduleStorage, world);
  });
}
