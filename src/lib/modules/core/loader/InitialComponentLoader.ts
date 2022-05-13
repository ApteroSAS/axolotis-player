import Component from "@root/lib/modules/core/ecs/Component";
import { load } from "@root/lib/modules/core/loader/CodeLoader";
import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
import { instantiateAsyncModule } from "@root/lib/modules/core/loader/JsLoader";
import { WorldDefinition } from "@root/lib/modules/core/loader/WorldDefinition";
import { LocalModules } from "@root/lib/modules/core/loader/LocalLoader";

export const CODE_LOADER_MODULE_NAME =
  "@aptero/axolotis-player/core/loader/InitialComponentLoader";
  
export class InitialComponentLoader implements Component {
  private initialLoading: Promise<any>;
  private initialLoadingResolver: ((value: any) => void) | undefined;
  private moduleStorage: LocalModules;

  constructor() {
    this.initialLoading = new Promise<any>((resolve) => {
      this.initialLoadingResolver = resolve;
    });
  }

  getType(): string {
    return InitialComponentLoader.name;
  }

  getModuleStorage() {
    return this.moduleStorage;
  }

  async awaitInitialLoading() {
    await this.initialLoading;
  }

  async startLoading(
    world: WorldEntity,
    scene: WorldDefinition,
    loadedCallBack: (progress: number, total: number) => void,
    moduleStorage: LocalModules
  ) {
    this.moduleStorage = moduleStorage;
    if (scene.version !== "2.0") {
      throw new Error("unsupported");
    }
    let promises: (() => Promise<any>)[] = [];
    for (const entity of scene.entities) {
      for (const componentDef of entity.components) {
        let config = componentDef.config;
        promises.push(
          () =>
            new Promise(async (resolve, reject) => {
              const module = await instantiateAsyncModule<
                ComponentFactory<Component>
              >(componentDef.module, moduleStorage);
              let component = await module.createComponent(world, config || {});
              if (!component.getType) {
                throw new Error(
                  "Not a component : " +
                    componentDef.module +
                    " " +
                    component.constructor.name
                );
              }
              world.addComponent(component); //TODO world default but should ad to an entity
              resolve(module);
            })
        );
      }
    }

    let promise = load(promises, loadedCallBack);
    promise.then((value) => {
      if (this.initialLoadingResolver !== undefined) {
        this.initialLoadingResolver(value);
      }
    });
    promise.catch((reason) => {
      console.error(reason);
    });
    return promise;
  }
}
