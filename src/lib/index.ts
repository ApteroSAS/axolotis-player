/*
 * Defines what is exported
 * */
export {
  initHtml,
  initHtmlFromUrl,
} from "@root/lib/modules/core/loader/CoreInit";
export { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
export { CodeLoaderComponent } from "@root/lib/modules/core/loader/CodeLoaderComponent";
export { LazyServices } from "@root/lib/modules/core/service/LazyServices";
export { ServiceEntity } from "@root/lib/modules/core/service/ServiceEntity";
export { WorldService } from "@root/lib/modules/core/WorldService";
export { FrameLoop } from "@root/lib/modules/FrameLoop";
export {
  registerLocalModule,
  registerLocalModuleList,
} from "@root/lib/modules/core/loader/JsLoader";
//export Entity from "@root/lib/modules/core/ecs/Entity";
//import Component from "@root/lib/modules/core/ecs/Component";
//import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
//import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
