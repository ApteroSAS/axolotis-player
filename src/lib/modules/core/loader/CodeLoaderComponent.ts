import Component from "@root/lib/modules/core/ecs/Component";
import { load } from "@root/lib/modules/core/loader/CodeLoader";
import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
import { ServiceEntity } from "@root/lib/modules/core/service/ServiceEntity";
import { instanciateJsAsyncModule } from "@root/lib/modules/core/loader/JsLoader";

export class CodeLoaderComponent implements Component {
  private initialLoading: Promise<any>;
  private initialLoadingResolver: ((value: any) => void) | undefined;

  constructor() {
    this.initialLoading = new Promise<any>((resolve) => {
      this.initialLoadingResolver = resolve;
    });
  }

  getType(): string {
    return CodeLoaderComponent.name;
  }

  async awaitInitialLoading() {
    await this.initialLoading;
  }

  async startLoadingJson(
    world: WorldEntity,
    scene: {
      version: string;
      entities: {
        components: {
          module: string;
          config: any;
          classname: string | undefined;
        }[];
      }[];
      services: { module: string }[];
    },
    loadedCallBack: (progress: number, total: number) => void
  ) {
    let promises: (() => Promise<any>)[] = [];
    for (const entity of scene.entities) {
      for (const componentDef of entity.components) {
        let config = componentDef.config;
        promises.push(
          () =>
            new Promise(async (resolve, reject) => {
              const module = await instanciateJsAsyncModule<
                ComponentFactory<Component>
              >(componentDef.module);
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

    for (const serviceDef of scene.services) {
      promises.push(
        () =>
          new Promise(async (resolve, reject) => {
            let service = await world.getFirstComponentByType<ServiceEntity>(
              ServiceEntity.name
            );
            await service.getService<any>(serviceDef.module);
            resolve(service);
          })
      );
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
