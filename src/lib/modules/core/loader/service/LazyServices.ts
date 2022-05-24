import Component from "@root/lib/modules/core/ecs/Component";
import { instantiateAsyncModule } from "@root/lib/modules/core/loader/JsLoader";
import { WorldEntity } from "@root/lib";
import { InitialComponentLoader, CODE_LOADER_MODULE_NAME } from "@root/lib/modules/core/loader/InitialComponentLoader";
import { IService } from "@root/lib/modules/core/loader/service/IService";

export class LazyServices {
  constructor(private world: WorldEntity) {}

  serviceAsync: { [id: string]: Promise<IService> | undefined } = {};
  service: { [id: string]: IService } = {};

  getWorld(): WorldEntity {
    return this.world;
  }

  setService(moduleName: string, service: IService) {
    this.serviceAsync[moduleName] = Promise.resolve(service);
    this.service[moduleName] = service;
  }

  async getService<T extends IService>(moduleName: string): Promise<T> {
    if (this.serviceAsync[moduleName]) {
      const module = await this.serviceAsync[moduleName];
      if (!module) {
        throw new Error("error");
      }
      this.service[moduleName] = module; //module resolved
      return module as T;
    }
    if (!this.serviceAsync[moduleName]) {
      let modulesList = ((await this.serviceAsync[CODE_LOADER_MODULE_NAME]) as InitialComponentLoader).getModuleStorage();
      let modulePromise = instantiateAsyncModule<T>(moduleName, modulesList, this.world);
      this.serviceAsync[moduleName] = new Promise(async (resolve) => {
        let module: any = await modulePromise;
        let t: Component = module.getType ? module : await module.createService(this);
        this.service[moduleName] = module; //module resolved
        resolve(t);
      });
    }
    return (await this.serviceAsync[moduleName]) as T;
  }
}
