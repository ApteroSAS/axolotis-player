import Component from "@root/lib/modules/core/ecs/Component";
import { load } from "@root/lib/modules/core/loader/CodeLoader";
import { loadAssets } from "@root/lib/modules/core/loader/AssetsLoader";
import { instanciateWebpackAsyncModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
import { ServiceEntity } from "@root/lib/modules/core/service/ServiceEntity";

export class CodeLoaderComponent implements Component {
  private initialLoading: Promise<any>;
  private initialLoadingResolver: ((value: any) => void) | undefined;
  public roomUrl: string = "";

  constructor() {
    this.initialLoading = new Promise<any>((resolve) => {
      this.initialLoadingResolver = resolve;
    });
  }

  cleanUpRoomUrl(roomUrl: string) {
    if (!roomUrl.endsWith(".json")) {
      roomUrl += "/room.json";
    }
    roomUrl.replace("./", "");
    if (!roomUrl.startsWith("http")) {
      roomUrl = window.location.origin + "/" + roomUrl;
    }
    return roomUrl;
  }

  async loadRoomDefinitionFile(roomUrl: string) {
    roomUrl = this.cleanUpRoomUrl(roomUrl);
    this.roomUrl = roomUrl;
    let response = await fetch(roomUrl);
    return await response.json();
  }

  async searchRoomDefinitionFile() {
    //how to find a room
    //1 - search in window.axolotis.room
    //2 - search in meta tag
    if ((window as any).axolotis && (window as any).axolotis.room) {
      return (window as any).axolotis.room;
    }
    // @ts-ignore
    for (const tag of window.document.head.children) {
      if (tag.tagName === "META" && (tag as any).name === "axolotis:room") {
        let roomUrl = (tag as any).content;
        return this.loadRoomDefinitionFile(roomUrl);
      }
    }
    throw new Error("No room definition found in meta axolotis:room");
  }

  getType(): string {
    return CodeLoaderComponent.name;
  }

  async awaitInitialLoading() {
    await this.initialLoading;
  }

  async startLoading(
    world: WorldEntity,
    list: any[],
    loadedCallBack: (progress: number, total: number) => void
  ) {
    let promises: (() => Promise<any>)[] = [];
    for (const key in list) {
      const entry = list[key];
      if (entry.type === "ecs-component-loader" && entry.module) {
        promises.push(
          () =>
            new Promise(async (resolve, reject) => {
              entry.name = entry.name || "Factory";
              let module = await instanciateWebpackAsyncModule<
                ComponentFactory<Component>
              >(entry.module, entry.name);
              let component = await module.create(world, entry.config || {});
              if (!component.getType) {
                throw new Error(
                  "Not a component : " +
                    entry.module +
                    " " +
                    component.constructor.name
                );
              }
              world.addComponent(component);
              resolve(module);
            })
        );
      }
      if (entry.type === "ecs-service-loader" && entry.module) {
        let service = await world.getFirstComponentByType<ServiceEntity>(
          ServiceEntity.name
        );
        await service.getService<any>(entry.module);
      }
      if (entry.type === "assets-loader" && entry.url) {
        promises.push(() => loadAssets(entry.url));
      }
    }

    let promise = load(promises, loadedCallBack);
    promise.then((value) => {
      if (this.initialLoadingResolver !== undefined) {
        this.initialLoadingResolver(value);
      }
    });
    promise.catch((reason) => {
      console.error(reason);
    });
    return promise;
  }
}
