import Component from "../../ecs/Component";
import { WorldEntity } from "../../../..";
import { Iservices } from "./IServices";
export declare class LazyServices implements Iservices {
    private world;
    constructor(world: WorldEntity);
    service: {
        [id: string]: Promise<Component> | undefined;
    };
    getWorld(): WorldEntity;
    setService(moduleName: string, service: Component, classname?: string): void;
    getService<T extends Component>(moduleName: string): Promise<T>;
}
