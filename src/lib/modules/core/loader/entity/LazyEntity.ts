import Entity from "@root/lib/modules/core/ecs/Entity";
import { instantiateAsyncModule } from "@root/lib/modules/core/loader/JsLoader";
import Component from "@root/lib/modules/core/ecs/Component";
import { CODE_LOADER_MODULE_NAME, InitialComponentLoader, Services, WorldEntity } from "@root/lib";

export class LazyEntity extends Entity {
  constructor(private world: WorldEntity) {
    super();
  }

  async addComponentAsync<T extends Component>(moduleName: string, config: any = {}): Promise<T> {
    let services = this.world.getFirstComponentByType<Services>(Services.name);
    let codeLoader = await services.getService<InitialComponentLoader>(CODE_LOADER_MODULE_NAME);
    let modulePromise = instantiateAsyncModule<T>(moduleName, codeLoader.getModuleStorage(), this.world, config || {});

    let module: any = await await modulePromise;
    let component = module.getType ? module : ((await module.createComponent(this.world, config || {})) as Component);
    return component as T;
  }

  public getType(): string {
    return LazyEntity.name;
  }
}
