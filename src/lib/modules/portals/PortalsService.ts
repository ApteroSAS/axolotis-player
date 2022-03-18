import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import {
  LazyServices,
  Service,
} from "@root/lib/modules/core/service/LazyServices";
import Component from "@root/lib/modules/core/ecs/Component";
import { ServiceEntity } from "@root/lib/modules/core/service/ServiceEntity";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
import { CodeLoaderComponent } from "@root/lib/modules/core/loader/CodeLoaderComponent";
import { WorldService } from "@root/lib/modules/core/WorldService";
import { FrameLoop } from "@root/lib/modules/FrameLoop";
import { ThreeLib } from "@root/lib/modules/three/ThreeLib";

export class Factory implements WebpackLazyModule, Service<PortalsService> {
  constructor() {}

  async create(services: LazyServices): Promise<PortalsService> {
    let worldService = await services.getService<WorldService>(
      "@root/lib/modules/core/WorldService"
    );
    let actualWorldService = await worldService
      .getActiveWorld()
      .getFirstComponentByType<ServiceEntity>(ServiceEntity.name);
    let codeLoader = await actualWorldService.getService<CodeLoaderComponent>(
      "@root/lib/modules/core/loader/CodeLoaderService"
    );
    let frameLoop = await services.getService<FrameLoop>(
      "@root/lib/modules/FrameLoop"
    );
    let three = await services.getService<ThreeLib>(
      "@root/lib/modules/three/ThreeLib"
    );
    return new PortalsService(
      worldService,
      frameLoop,
      three,
      codeLoader.roomUrl
    );
  }
}

let worlds = {};

export class PortalsService implements Component {
  constructor(
    private services: WorldService,
    frameLoop: FrameLoop,
    private three: ThreeLib,
    roomUrl: string
  ) {
    this.notifyInitialWorld(roomUrl, services.getActiveWorld());
    frameLoop.addLoop(PortalsService.name, (delta) => {
      for (const loop of this.portalsLoops) {
        loop(delta);
      }
    });
    this.three.preRenderPass.push(() => {
      this.render();
    });
  }
  i = 0;
  render() {
    let gl = this.three.renderer.getContext();
    // clear buffers now: color, depth, stencil
    this.three.renderer.clear(true, true, true);
    // do not clear buffers before each render pass
    this.three.renderer.autoClear = false;

    for (const loop of this.portalsRenderLoops) {
      loop();
    }

    gl.colorMask(true, true, true, true);
    gl.depthMask(true);
  }

  getType(): string {
    return PortalsService.name;
  }

  notifyInitialWorld(url: string, world: WorldEntity) {
    if (!worlds[url]) {
      worlds[url] = world;
    }
  }

  async loadNewUrl(url: string): Promise<WorldEntity> {
    //"assets/static/demo3/room2.json"
    let codeLoaderComponent = new CodeLoaderComponent();
    url = codeLoaderComponent.cleanUpRoomUrl(url);
    if (worlds[url]) {
      return worlds[url];
    }
    let world = new WorldEntity();
    worlds[url] = world; //wait url cleaning

    let serviceEntity = new ServiceEntity();
    world.addComponent(serviceEntity);
    serviceEntity.setService(
      "@root/lib/modules/core/loader/CodeLoaderService",
      codeLoaderComponent
    );
    let json = await codeLoaderComponent.loadRoomDefinitionFile(url);
    return await new Promise((resolve, reject) => {
      codeLoaderComponent
        .startLoading(world, json.entities, (progress, total) => {
          console.log("[" + url + "] : [" + progress + "/" + total + "]");
        })
        .then(() => {
          console.log("[" + url + "] : ok");
          resolve(world);
        })
        .catch(reject);
    });
  }

  portalsLoops: ((delta) => void)[] = [];
  portalsRenderLoops: (() => void)[] = [];

  addPortalLoop(callback: (delta) => void) {
    this.portalsLoops.push(callback);
  }

  addPortalRenderLoop(callback: () => void) {
    this.portalsRenderLoops.push(callback);
  }
}
