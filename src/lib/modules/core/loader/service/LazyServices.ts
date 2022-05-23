import Component from "@root/lib/modules/core/ecs/Component";
import { instantiateAsyncModule } from "@root/lib/modules/core/loader/JsLoader";
import { Service } from "@root/lib/modules/core/loader/service/Service";
import { WorldEntity } from "@root/lib";
import {
  InitialComponentLoader,
  CODE_LOADER_MODULE_NAME,
} from "@root/lib/modules/core/loader/InitialComponentLoader";
import { IServices } from "./IServices";

export class LazyServices implements IServices {
  constructor(private world: WorldEntity) {}

  service: { [id: string]: Promise<Component> | undefined } = {};

  getWorld(): WorldEntity {
    return this.world;
  }

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
      let modulePromise = instantiateAsyncModule<T>(
        moduleName,
        modulesList, 
        this.world
      );
      this.service[moduleName] = new Promise(async (resolve) => {
        let module : any = await modulePromise;
        let t: Component = (module.getType)? module : await module.createService(this);
        resolve(t);
      });
    }
    return (await this.service[moduleName]) as T;
  }
}
