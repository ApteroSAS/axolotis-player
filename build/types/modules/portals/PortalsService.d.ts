import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { LazyServices, Service } from "@root/lib/modules/core/service/LazyServices";
import Component from "@root/lib/modules/core/ecs/Component";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
import { WorldService } from "@root/lib/modules/core/WorldService";
import { FrameLoop } from "@root/lib/modules/FrameLoop";
import { ThreeLib } from "@root/lib/modules/three/ThreeLib";
export declare class Factory implements WebpackLazyModule, Service<PortalsService> {
    constructor();
    create(services: LazyServices): Promise<PortalsService>;
}
export declare class PortalsService implements Component {
    private services;
    private three;
    constructor(services: WorldService, frameLoop: FrameLoop, three: ThreeLib, roomUrl: string);
    i: number;
    render(): void;
    getType(): string;
    notifyInitialWorld(url: string, world: WorldEntity): void;
    loadNewUrl(url: string): Promise<WorldEntity>;
    portalsLoops: ((delta: any) => void)[];
    portalsRenderLoops: (() => void)[];
    addPortalLoop(callback: (delta: any) => void): void;
    addPortalRenderLoop(callback: () => void): void;
}
