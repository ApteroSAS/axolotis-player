import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import {
  LazyServices,
  Service,
} from "@root/lib/modules/core/service/LazyServices";
import Component from "@root/lib/modules/core/ecs/Component";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
import { ServiceEntity } from "@root/lib/modules/core/service/ServiceEntity";
import { CodeLoaderComponent } from "@root/lib/modules/core/loader/CodeLoaderComponent";
import { getGlobalStorage } from "@root/lib/modules/core/loader/global";

export class Factory implements WebpackLazyModule, Service<WorldService> {
  constructor() {}

  async createService(services: LazyServices): Promise<WorldService> {
    return new WorldService(services);
  }
}

let addOnWorldChangeCallback: (() => void)[] = []; //do not use events emitter here to avoid surcharing dependencies in the code modules
let addOnWorldAddedCallback: (() => void)[] = []; //do not use events emitter here to avoid surcharing dependencies in the code modules
interface Worlds {
  world: WorldEntity;
  activeWorld: number;
  worlds: WorldEntity[];
}

if (!getGlobalStorage<Worlds>("worlds").activeWorld) {
  //initialize world service
  getGlobalStorage<Worlds>("worlds").worlds = [];
  getGlobalStorage<Worlds>("worlds").activeWorld = -1;
}

export function registerNewWorld(worldEntity: WorldEntity) {
  getGlobalStorage<Worlds>("worlds").worlds.push(worldEntity);
  if (getGlobalStorage<Worlds>("worlds").activeWorld < 0) {
    getGlobalStorage<Worlds>("worlds").activeWorld = 0;
    getGlobalStorage<Worlds>("worlds").world =
      getGlobalStorage<Worlds>("worlds").worlds[
        getGlobalStorage<Worlds>("worlds").activeWorld
      ];
  }
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

    if (getGlobalStorage<Worlds>("worlds").activeWorld >= 0) {
      this.setActiveWorldByNumber(
        getGlobalStorage<Worlds>("worlds").activeWorld
      );
    }
  }

  getType(): string {
    return WorldService.name;
  }

  getWorlds() {
    return getGlobalStorage<Worlds>("worlds").worlds;
  }

  getActiveWorld() {
    return this.getWorlds()[getGlobalStorage<Worlds>("worlds").activeWorld];
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
    if (getGlobalStorage<Worlds>("worlds").activeWorld != number) {
      getGlobalStorage<Worlds>("worlds").activeWorld = number;
      getGlobalStorage<Worlds>("worlds").world = this.getWorlds()[number];
      for (const callback of addOnWorldChangeCallback) {
        callback();
      }
    }
  }
}
