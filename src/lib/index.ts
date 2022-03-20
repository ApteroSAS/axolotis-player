import { BUILD_VERSION, initHtml } from "@root/lib/modules/core/loader/CoreInit";
import Entity from "@root/lib/modules/core/ecs/Entity";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
import { AssetsLoader } from "@root/lib/modules/core/loader/AssetsLoader";
import { CodeLoaderComponent } from "@root/lib/modules/core/loader/CodeLoaderComponent";
import { LazyServices } from "@root/lib/modules/core/service/LazyServices";
import { ServiceEntity } from "@root/lib/modules/core/service/ServiceEntity";
import { WorldService } from "@root/lib/modules/core/WorldService";
import { FrameLoop } from "@root/lib/modules/FrameLoop";
import { registerLocalModule } from "@root/lib/modules/core/loader/JsLoader";
/*
 * Defines what is exported
 * */
export {
  registerLocalModule,
  initHtml,
  Entity,
  WorldEntity,
  AssetsLoader,
  CodeLoaderComponent,
  LazyServices,
  ServiceEntity,
  WorldService,
  FrameLoop,
};
