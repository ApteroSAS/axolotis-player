import * as THREE from "three";
import Component from "@root/lib/modules/core/ecs/Component";
import { FrameLoop } from "@root/lib/modules/FrameLoop";
import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { LazyServices, Service } from "@root/lib/modules/core/service/LazyServices";
import { WorldService } from "@root/lib/modules/core/WorldService";
export declare function getGlobalRenderer(): any;
export declare class ThreeLib implements Component {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    preRenderPass: (() => void)[];
    constructor(frameLoop: FrameLoop, worldService: WorldService);
    getType(): string;
}
export declare class Factory implements WebpackLazyModule, Service<ThreeLib> {
    constructor();
    create(services: LazyServices): Promise<ThreeLib>;
}
