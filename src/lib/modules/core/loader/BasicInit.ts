import { Services } from "@root/lib/modules/core/loader/service/Services";
import { WorldEntity } from "@root/lib";
import { InitialComponentLoader } from "@root/lib/modules/core/loader/InitialComponentLoader";
import { getGlobalStorage } from "@root/lib/modules/core/loader/Global";
import { LocalModules } from "@root/lib/modules/core/loader/LocalLoader";

export interface WorldDefinitionV2 {
  version: "2.0";
  entities: {
    components: {
      module: string;
      config: any;
    }[];
  }[];
}

export interface WorldDefinitionV1 {
  version?: "1.0";
}

export type WorldDefinition = WorldDefinitionV1 | WorldDefinitionV2;

export const CODE_LOADER_MODULE_NAME =
  "@aptero/axolotis-player/core/loader/InitialComponentLoader";

export async function createWorld(
  initialScene: WorldDefinition = {
    version: "2.0",
    entities: [],
  },
  loadedCallBack: (progress: number, total: number) => void = () => {},
  moduleStorage?: LocalModules
) {
  if (!moduleStorage) {
    moduleStorage = getGlobalStorage<LocalModules>("localModules");
  }
  let world = new WorldEntity();
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
