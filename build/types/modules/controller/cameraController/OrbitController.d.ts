import { ThreeLib } from "@root/lib/modules/three/ThreeLib";
import { FrameLoop } from "@root/lib/modules/FrameLoop";
import Component from "@root/lib/modules/core/ecs/Component";
import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { LazyServices, Service } from "@root/lib/modules/core/service/LazyServices";
export declare class Factory implements WebpackLazyModule, Service<OrbitController> {
    create(services: LazyServices): Promise<OrbitController>;
}
export declare class OrbitController implements Component {
    constructor(three: ThreeLib, frameLoop: FrameLoop);
    getType(): string;
}
