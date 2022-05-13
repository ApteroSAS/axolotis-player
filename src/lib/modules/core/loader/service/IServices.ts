import Component from "@root/lib/modules/core/ecs/Component";

export interface IServices {
  getService<T extends Component>(moduleName: string): Promise<T>;
}
