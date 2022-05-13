import Component from "../../ecs/Component";
export interface IServices {
    getService<T extends Component>(moduleName: string): Promise<T>;
}
