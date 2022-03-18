import { ThreeLib } from "@root/lib/modules/three/ThreeLib";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FrameLoop } from "@root/lib/modules/FrameLoop";
import Component from "@root/lib/modules/core/ecs/Component";
import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import {
  LazyServices,
  Service,
} from "@root/lib/modules/core/service/LazyServices";

export class Factory implements WebpackLazyModule, Service<OrbitController> {
  async create(services: LazyServices): Promise<OrbitController> {
    let frameLoop = await services.getService<FrameLoop>(
      "@root/lib/modules/FrameLoop"
    );
    let three = await services.getService<ThreeLib>(
      "@root/lib/modules/three/ThreeLib"
    );
    let module = new OrbitController(three, frameLoop);
    return module;
  }
}

export class OrbitController implements Component {
  constructor(three: ThreeLib, frameLoop: FrameLoop) {
    const controls = new OrbitControls(three.camera, three.renderer.domElement);
    frameLoop.addLoop(OrbitController.name, () => {
      controls.update();
    });
  }

  getType(): string {
    return OrbitController.name;
  }
}
