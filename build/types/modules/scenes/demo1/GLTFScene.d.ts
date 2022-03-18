import { ThreeLib } from "@root/lib/modules/three/ThreeLib";
import Component from "@root/lib/modules/core/ecs/Component";
import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { LazyServices, Service } from "@root/lib/modules/core/service/LazyServices";
export declare class Factory implements WebpackLazyModule, Service<GLTFScene> {
    create(services: LazyServices): Promise<GLTFScene>;
}
export declare class GLTFScene implements Component {
    constructor(three: ThreeLib);
    getType(): string;
}
