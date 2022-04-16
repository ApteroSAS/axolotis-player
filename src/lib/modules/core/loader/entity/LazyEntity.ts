import Entity from "@root/lib/modules/core/ecs/Entity";
import { instantiateAsyncModule } from "@root/lib/modules/core/loader/JsLoader";
import Component from "@root/lib/modules/core/ecs/Component";
import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
import { InitialComponentLoader, Services, WorldEntity } from "@root/lib";
import { CODE_LOADER_MODULE_NAME } from "@root/lib/modules/core/loader/BasicInit";

export class LazyEntity extends Entity {
  constructor(private world: WorldEntity) {
    super();
  }

  async addComponentAsync<T extends Component>(
    moduleName: string,
    config: any = {}
  ): Promise<T> {
    let services = this.world.getFirstComponentByType<Services>(Services.name);
    let codeLoader = await services.getService<InitialComponentLoader>(
      CODE_LOADER_MODULE_NAME
    );
    let modulePromise = instantiateAsyncModule<ComponentFactory<T>>(
      moduleName,
      codeLoader.getModuleStorage()
    );
    let comp: Component = await (
      await modulePromise
    ).createComponent(this.world, config);
    return comp as T;
  }

  public getType(): string {
    return LazyEntity.name;
  }
}
