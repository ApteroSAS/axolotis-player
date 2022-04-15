import Component from "../ecs/Component";
import { WorldEntity } from "../ecs/WorldEntity";
import { WorldDefinition } from "./BasicInit";
import { LocalModules } from "./LocalLoader";
export declare class InitialComponentLoader implements Component {
    private initialLoading;
    private initialLoadingResolver;
    private moduleStorage;
    constructor();
    getType(): string;
    getModuleStorage(): LocalModules;
    awaitInitialLoading(): Promise<void>;
    startLoading(world: WorldEntity, scene: WorldDefinition, loadedCallBack: (progress: number, total: number) => void, moduleStorage: LocalModules): Promise<any[]>;
}
