import { instanciateWebpackAsyncModule } from "@root/lib/modules/core/loader/WebpackLoader";
import Component from "@root/lib/modules/core/ecs/Component";
import { instanciateJsAsyncModule } from "@root/lib/modules/core/loader/JsLoader";

export interface Service<T> {
  createService(services: LazyServices): Promise<T>;
}

export class LazyServices {
  service: { [id: string]: Promise<Component> | undefined } = {};

  toId(path, classname) {
    return path + ":" + classname;
  }

  /* async getServiceFromModue<T>(modulePromise:Promise<any>, classname:string = "Factory"):Promise<any>{

    }*/

  setService(path: string, service: Component, classname: string = "Factory") {
    this.service[this.toId(path, classname)] = Promise.resolve(service);
  }

  async getService<T extends Component>(
    path: string,
    classname: string = "Factory"
  ): Promise<T> {
    if (this.service[this.toId(path, classname)]) {
      const module = await this.service[this.toId(path, classname)];
      if (!module) {
        throw new Error("error");
      }
      return module as T;
    }
    if (!this.service[this.toId(path, classname)]) {
      let modulePromise = instanciateJsAsyncModule<Service<T>>(path, classname);
      this.service[this.toId(path, classname)] = new Promise(
        async (resolve) => {
          let t: Component = await (await modulePromise).createService(this);
          resolve(t);
        }
      );
    }
    return (await this.service[this.toId(path, classname)]) as T;
  }
}
