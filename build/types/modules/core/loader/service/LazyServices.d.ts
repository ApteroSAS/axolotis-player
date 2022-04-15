import Component from "../../ecs/Component";
import { WorldEntity } from "../../../..";
export declare class LazyServices {
    private world;
    constructor(world: WorldEntity);
    service: {
        [id: string]: Promise<Component> | undefined;
    };
    getWorld(): WorldEntity;
    setService(moduleName: string, service: Component, classname?: string): void;
    getService<T extends Component>(moduleName: string): Promise<T>;
}
