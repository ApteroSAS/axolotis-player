import { initHtml } from "@root/lib/modules/core/loader/CoreInit";
import Entity from "@root/lib/modules/core/ecs/Entity";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
import { CodeLoaderComponent } from "@root/lib/modules/core/loader/CodeLoaderComponent";
import { LazyServices } from "@root/lib/modules/core/service/LazyServices";
import { ServiceEntity } from "@root/lib/modules/core/service/ServiceEntity";
import { WorldService } from "@root/lib/modules/core/WorldService";
import { FrameLoop } from "@root/lib/modules/FrameLoop";
import { registerLocalModule } from "@root/lib/modules/core/loader/JsLoader";
//import Component from "@root/lib/modules/core/ecs/Component";
//import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
//import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
/*
 * Defines what is exported
 * */
export {
  registerLocalModule,
  //Component,
  //WebpackLazyModule,
  //ComponentFactory,
  initHtml,
  Entity,
  WorldEntity,
  CodeLoaderComponent,
  LazyServices,
  ServiceEntity,
  WorldService,
  FrameLoop,
};
