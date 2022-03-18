import Component from "@root/lib/modules/core/ecs/Component";
import { ThreeLib } from "@root/lib/modules/three/ThreeLib";
import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
export declare class Factory implements WebpackLazyModule, ComponentFactory<Sky> {
    create(world: WorldEntity, config: any): Promise<Sky>;
}
export default class Sky implements Component {
    private scene;
    private texture;
    constructor();
    getType(): string;
    initialize(three: ThreeLib, skymap: string): Promise<void>;
}
