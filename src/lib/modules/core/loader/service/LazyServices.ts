import Component from "@root/lib/modules/core/ecs/Component";
import { instantiateAsyncModule } from "@root/lib/modules/core/loader/JsLoader";
import { Service } from "@root/lib/modules/core/ecs/Service";
import { InitialComponentLoader, WorldEntity } from "@root/lib";
import { CODE_LOADER_MODULE_NAME } from "@root/lib/modules/core/loader/BasicInit";

export class LazyServices {
  constructor(private world: WorldEntity) {}

  service: { [id: string]: Promise<Component> | undefined } = {};

  setService(
    moduleName: string,
    service: Component,
    classname: string = "Factory"
  ) {
    this.service[moduleName] = Promise.resolve(service);
  }

  async getService<T extends Component>(moduleName: string): Promise<T> {
    if (this.service[moduleName]) {
      const module = await this.service[moduleName];
      if (!module) {
        throw new Error("error");
      }
      return module as T;
    }
    if (!this.service[moduleName]) {
      let modulesList = (
        (await this.service[CODE_LOADER_MODULE_NAME]) as InitialComponentLoader
      ).getModuleStorage();
      let modulePromise = instantiateAsyncModule<Service<T>>(
        moduleName,
        modulesList
      );
      this.service[moduleName] = new Promise(async (resolve) => {
        let t: Component = await (await modulePromise).createService(this);
        resolve(t);
      });
    }
    return (await this.service[moduleName]) as T;
  }
}
