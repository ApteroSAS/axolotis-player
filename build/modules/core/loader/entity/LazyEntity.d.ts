import Entity from "../../ecs/Entity";
import Component from "../../ecs/Component";
import { WorldEntity } from "../../../..";
export declare class LazyEntity extends Entity {
    private world;
    constructor(world: WorldEntity);
    addComponentAsync<T extends Component>(moduleName: string, config?: any): Promise<T>;
    getType(): string;
}
