import Component from "@root/lib/modules/core/ecs/Component";
import { AmmoPhysics } from "@root/lib/modules/ammo/AmmoPhysics";
import { ThreeLib } from "@root/lib/modules/three/ThreeLib";
import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
export declare class Factory implements WebpackLazyModule, ComponentFactory<LevelSetup> {
    create(world: WorldEntity, config: any): Promise<LevelSetup>;
}
export default class LevelSetup implements Component {
    private scene;
    private physicsWorld;
    private mesh;
    constructor();
    getType(): string;
    loadScene(ammoPhysics: AmmoPhysics, threeLib: ThreeLib): Promise<void>;
    setStaticCollider(mesh: any): void;
}
