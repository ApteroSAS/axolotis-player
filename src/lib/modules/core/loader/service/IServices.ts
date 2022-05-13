import Component from "@root/lib/modules/core/ecs/Component";

export interface Iservices {
  getService<T extends Component>(moduleName: string): Promise<T> 
}
