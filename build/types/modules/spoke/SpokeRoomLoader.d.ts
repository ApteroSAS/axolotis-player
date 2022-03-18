import Component from "@root/lib/modules/core/ecs/Component";
import SceneLoader from "@root/lib/modules/spoke/SceneLoader";
import { ThreeLib } from "@root/lib/modules/three/ThreeLib";
import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
export declare class SpokeRoomLoader implements Component {
    private threeLib;
    sceneLoader: SceneLoader | null;
    constructor(threeLib: ThreeLib);
    loadRoom(hubid: any): Promise<void>;
    getType(): string;
}
export declare class Factory implements WebpackLazyModule, ComponentFactory<SpokeRoomLoader> {
    create(world: WorldEntity, config: any): Promise<SpokeRoomLoader>;
}
