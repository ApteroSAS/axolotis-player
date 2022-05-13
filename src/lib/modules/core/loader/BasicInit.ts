import { Services } from "@root/lib/modules/core/loader/service/Services";
import { WorldEntity } from "@root/lib";
import {
  InitialComponentLoader,
  CODE_LOADER_MODULE_NAME,
} from "@root/lib/modules/core/loader/InitialComponentLoader";
import { getGlobalStorage } from "@root/lib/modules/core/loader/Global";
import { LocalModules } from "@root/lib/modules/core/loader/LocalLoader";
import { WorldDefinition } from "@root/lib/modules/core/loader/WorldDefinition";

export async function createWorld(
  initialScene: WorldDefinition = {
    version: "2.0",
    entities: [],
  },
  loadedCallBack: (progress: number, total: number) => void = () => {},
  moduleStorage?: LocalModules,
  world?: WorldEntity
) {
  if (!world) {
    world = new WorldEntity();
  }
  if (!moduleStorage) {
    moduleStorage = getGlobalStorage<LocalModules>("localModules");
  }
  let serviceEntity = new Services(world);
  world.addComponent(serviceEntity);
  let codeLoaderComponent = new InitialComponentLoader();
  serviceEntity.setService(CODE_LOADER_MODULE_NAME, codeLoaderComponent);
  await codeLoaderComponent.startLoading(
    world,
    initialScene,
    loadedCallBack,
    moduleStorage
  );
  return world;
}
