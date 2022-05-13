import Component from "../../ecs/Component";
export interface Iservices {
    getService<T extends Component>(moduleName: string): Promise<T>;
}
