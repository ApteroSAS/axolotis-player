import * as THREE from "three";
import Component from "@root/lib/modules/core/ecs/Component";
import { FrameLoop } from "@root/lib/modules/FrameLoop";
import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import {
  LazyServices,
  Service,
} from "@root/lib/modules/core/service/LazyServices";
import { WorldService } from "@root/lib/modules/core/WorldService";

declare let window: any;
export function getGlobalRenderer() {
  if (!window.axolotis?.renderer) {
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setPixelRatio(window.devicePixelRatio);

    document.body.appendChild(renderer.domElement);
    if (!window.axolotis) {
      window.axolotis = {};
    }
    window.axolotis.renderer = renderer;
  }
  return window.axolotis.renderer;
}

export class ThreeLib implements Component {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  preRenderPass: (() => void)[] = [];
  constructor(frameLoop: FrameLoop, worldService: WorldService) {
    this.scene = new THREE.Scene();

    this.renderer = getGlobalRenderer();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.001,
      100000
    );
    this.camera.position.z = 2;

    const render = () => {
      for (const prerender of this.preRenderPass) {
        prerender();
      }
      // FINAL PASS
      this.renderer.render(this.scene, this.camera);
      // set things back to normal
      this.renderer.autoClear = true;
    };

    const onWindowResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    };

    worldService.addOnWorldChangeCallback(() => {
      window.removeEventListener("resize", onWindowResize);
      frameLoop.removeLoop(ThreeLib.name);
      if (worldService.isActiveWorld()) {
        window.addEventListener("resize", onWindowResize, false);
        frameLoop.addLoop(ThreeLib.name, render);
      }
    }, true);
  }

  //TODO rename to getType
  getType(): string {
    return ThreeLib.name;
  }
}

export class Factory implements WebpackLazyModule, Service<ThreeLib> {
  constructor() {}

  async create(services: LazyServices): Promise<ThreeLib> {
    let frameLoop = await services.getService<FrameLoop>(
      "@root/lib/modules/FrameLoop"
    );
    let worldService = await services.getService<WorldService>(
      "@root/lib/modules/core/WorldService"
    );
    return new ThreeLib(frameLoop, worldService);
  }
}
