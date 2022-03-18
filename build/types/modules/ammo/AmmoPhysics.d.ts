import Component from "@root/lib/modules/core/ecs/Component";
import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { LazyServices, Service } from "@root/lib/modules/core/service/LazyServices";
export declare class AmmoPhysics implements Component {
    physicsUpdate: (world: any, timeStep: any) => void;
    physicsWorld: any;
    setupPhysics(): Promise<unknown>;
    step(elapsedTime: any): void;
    getAmmo(): any;
    getType(): string;
}
export declare class Factory implements WebpackLazyModule, Service<AmmoPhysics> {
    create(services: LazyServices): Promise<AmmoPhysics>;
}
