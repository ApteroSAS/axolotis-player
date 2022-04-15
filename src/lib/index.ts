/*
 * Defines what is exported
 * */

//ecs
//export { Component } from "@root/lib/modules/core/ecs/Component";
//export { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
//export { DestroyableComponent } from "@root/lib/modules/core/ecs/DestroyableComponent";
//export { Entity } from "@root/lib/modules/core/ecs/Entity";
//export { Service } from "@root/lib/modules/core/ecs/Service";
export { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";

//loader
export {getGlobalStorage} from "@root/lib/modules/core/loader/Global";
export {CODE_LOADER_MODULE_NAME} from "@root/lib/modules/core/loader/BasicInit";
export {
  initHtml,
  initHtmlFromUrl,
} from "@root/lib/modules/core/loader/DomInit";
export { createWorld } from "@root/lib/modules/core/loader/BasicInit";
export { InitialComponentLoader } from "@root/lib/modules/core/loader/InitialComponentLoader";
export { LazyServices } from "@root/lib/modules/core/loader/service/LazyServices";
export { Services } from "@root/lib/modules/core/loader/service/Services";
export {
  registerLocalModule,
  registerLocalModuleList,
} from "@root/lib/modules/core/loader/LocalLoader";
