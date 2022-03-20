import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { LazyServices, Service } from "@root/lib/modules/core/service/LazyServices";
import Component from "@root/lib/modules/core/ecs/Component";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
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
