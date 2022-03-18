import { CodeLoaderComponent } from "@root/lib/modules/core/loader/CodeLoaderComponent";
import { ServiceEntity } from "@root/lib/modules/core/service/ServiceEntity";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";

export const BUILD_VERSION = require("../../../../../package.json").version;
console.log(BUILD_VERSION);

export function init() {
  let serviceEntity = new ServiceEntity();
  let world = new WorldEntity();
  world.addComponent(serviceEntity);
  let codeLoaderComponent = new CodeLoaderComponent();
  serviceEntity.setService(
    "@root/lib/modules/core/loader/CodeLoaderService",
    codeLoaderComponent
  );
  codeLoaderComponent.searchRoomDefinitionFile().then((json) => {
    codeLoaderComponent
      .startLoading(world, json.entities, (progress, total) => {
        console.log("[" + progress + "/" + total + "]");
        const progressbar: any = document.getElementById("progress");
        progressbar.style.width = `${(progress / total) * 100}%`;
      })
      .then(() => {
        console.log("loading complete");
        (document.getElementById("progresscontainer") as any).className +=
          "load";
      });
  });
}
