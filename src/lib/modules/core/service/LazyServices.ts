import Component from "@root/lib/modules/core/ecs/Component";
import { instanciateJsAsyncModule } from "@root/lib/modules/core/loader/JsLoader";

export interface Service<T> {
  createService(services: LazyServices): Promise<T>;
}

export class LazyServices {
  service: { [id: string]: Promise<Component> | undefined } = {};

  setService(path: string, service: Component, classname: string = "Factory") {
    this.service[path] = Promise.resolve(service);
  }

  async getService<T extends Component>(path: string): Promise<T> {
    if (this.service[path]) {
      const module = await this.service[path];
      if (!module) {
        throw new Error("error");
      }
      return module as T;
    }
    if (!this.service[path]) {
      let modulePromise = instanciateJsAsyncModule<Service<T>>(path);
      this.service[path] = new Promise(async (resolve) => {
        let t: Component = await (await modulePromise).createService(this);
        resolve(t);
      });
    }
    return (await this.service[path]) as T;
  }
}
