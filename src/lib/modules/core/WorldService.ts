import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import {
  LazyServices,
  Service,
} from "@root/lib/modules/core/service/LazyServices";
import Component from "@root/lib/modules/core/ecs/Component";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
import { ServiceEntity } from "@root/lib/modules/core/service/ServiceEntity";
import { CodeLoaderComponent } from "@root/lib/modules/core/loader/CodeLoaderComponent";

export class Factory implements WebpackLazyModule, Service<WorldService> {
  constructor() {}

  async createService(services: LazyServices): Promise<WorldService> {
    return new WorldService(services);
  }
}

//(await axolotis.worlds[1].components[0].service["@root/lib/modules/core/WorldService:Factory"]).setActiveWorld(1)

declare let window: any;

let activeWorld = -1;
let worlds: WorldEntity[] = [];
let addOnWorldChangeCallback: (() => void)[] = []; //do not use events emitter here to avoid surcharing dependencies in the code modules
let addOnWorldAddedCallback: (() => void)[] = []; //do not use events emitter here to avoid surcharing dependencies in the code modules

export function registerNewWorld(worldEntity: WorldEntity) {
  worlds.push(worldEntity);
  if (activeWorld < 0) {
    activeWorld = 0;
    window.axolotis.world = worlds[activeWorld];
    window.axolotis.activeWorld = activeWorld;
  }
}

if (window) {
  if (!window.axolotis) {
    window.axolotis = {};
  }
  window.axolotis.worlds = worlds;
  window.axolotis.activeWorld = activeWorld;
}

export class WorldService implements Component {
  private world: WorldEntity;

  constructor(services: LazyServices) {
    console.log("info");
    let worldtmp: any = null;
    for (const world of this.getWorlds()) {
      let serviceEntity = world.getFirstComponentByType<ServiceEntity>(
        ServiceEntity.name
      );
      if (serviceEntity == services) {
        worldtmp = world;
      }
    }
    if (!worldtmp) {
      throw new Error();
    }
    this.world = worldtmp;

    //new world service is new world event
    services
      .getService<CodeLoaderComponent>(
        "@aptero/axolotis-player/modules/core/loader/CodeLoaderService"
      )
      .then(async (codeLoader) => {
        codeLoader.awaitInitialLoading();
        for (const callback of addOnWorldAddedCallback) {
          callback();
        }
      });

    if (activeWorld >= 0) {
      this.setActiveWorldByNumber(activeWorld);
    }
  }

  getType(): string {
    return WorldService.name;
  }

  getWorlds() {
    return worlds;
  }

  getActiveWorld() {
    return worlds[activeWorld];
  }

  isActiveWorld() {
    return this.world == this.getActiveWorld();
  }

  addOnWorldChangeCallback(callback: () => void, init: boolean = false) {
    addOnWorldChangeCallback.push(callback);
    if (init) {
      callback();
    }
  }

  addOnWorldAdded(callback: () => void, init: boolean = false) {
    addOnWorldAddedCallback.push(callback);
    if (init) {
      callback();
    }
  }

  setActiveWorld(world: WorldEntity) {
    for (let i = 0; i < this.getWorlds().length; i++) {
      if (world == this.getWorlds()[i]) {
        this.setActiveWorldByNumber(i);
        return;
      }
    }
    throw new Error();
  }

  setActiveWorldByNumber(number: number) {
    if (activeWorld != number) {
      activeWorld = number;
      if (window && window.axolotis) {
        window.axolotis.activeWorld = activeWorld;
        window.axolotis.world = worlds[activeWorld];
      }
      for (const callback of addOnWorldChangeCallback) {
        callback();
      }
    }
  }
}
