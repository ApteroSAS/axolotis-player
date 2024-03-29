import Component from "@root/lib/modules/core/ecs/Component";
import { LazyServices } from "@root/lib/modules/core/loader/service/LazyServices";
import { IService, IServices } from "@root/lib";

export const ComponentName = "Services";
export class Services extends LazyServices implements Component, IServices {
  getType(): string {
    return ComponentName;
  }

  getServiceSync<T extends IService>(moduleName: string): T {
    if (this.service[moduleName]) {
      return this.service[moduleName] as T;
    } else {
      throw new Error("service not found : " + moduleName);
    }
  }
}
