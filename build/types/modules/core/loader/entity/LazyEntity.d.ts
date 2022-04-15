import Entity from "../../ecs/Entity";
import Component from "../../ecs/Component";
import { WorldEntity } from "../../../..";
export declare class LazyEntity extends Entity {
    private world;
    constructor(world: WorldEntity, name: string);
    addComponentAsync<T extends Component>(moduleName: string, config?: any): Promise<T>;
}
