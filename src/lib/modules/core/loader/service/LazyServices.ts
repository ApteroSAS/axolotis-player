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

  setService(moduleName: string, service: IService, replace = false) {
    if (!moduleName) throw new Error();
    if (!replace && (this.serviceAsync[moduleName] || this.service[moduleName])) {
      throw new Error("Service already exist (use replace to force)");
    }
    this.serviceAsync[moduleName] = Promise.resolve(service);
    this.service[moduleName] = service;
    if (service.init) {
      service.init(); //service init
    }
  }

  async getService<T extends IService>(moduleName: string): Promise<T> {
    if (!moduleName) throw new Error();
    if (!this.serviceAsync[moduleName]) {
      // it is important to assign value as soon as possible to avoid multiple service creation from rapid getService call.
      this.serviceAsync[moduleName] = (async () => {
        let modulesList = ((await this.serviceAsync[CODE_LOADER_MODULE_NAME]) as InitialComponentLoader).getModuleStorage();
        let modulePromise = instantiateAsyncModule<T>(moduleName, modulesList, this.world);
        let module: any = await modulePromise;
        let service: Component = module.getType ? module : await module.createService(this);
        this.service[moduleName] = service; //module resolved
        if (service.init) {
          service.init(); //service init
        }
        return service;
      })();
    }
    //service already downloading add this request to queue;
    const service = await this.serviceAsync[moduleName];
    if (!service) {
      throw new Error("Internal engine error");
    }
    return service as T;
  }
}
