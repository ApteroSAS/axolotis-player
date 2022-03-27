import { WebpackLazyModule } from "./loader/WebpackLoader";
import { LazyServices, Service } from "./service/LazyServices";
import Component from "./ecs/Component";
import { WorldEntity } from "./ecs/WorldEntity";
export declare class Factory implements WebpackLazyModule, Service<WorldService> {
    constructor();
    createService(services: LazyServices): Promise<WorldService>;
}
export declare function registerNewWorld(worldEntity: WorldEntity): void;
export declare class WorldService implements Component {
    private world;
    constructor(services: LazyServices);
    getType(): string;
    getWorlds(): WorldEntity[];
    getActiveWorld(): WorldEntity;
    isActiveWorld(): boolean;
    addOnWorldChangeCallback(callback: () => void, init?: boolean): void;
    addOnWorldAdded(callback: () => void, init?: boolean): void;
    setActiveWorld(world: WorldEntity): void;
    setActiveWorldByNumber(number: number): void;
}
