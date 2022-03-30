import Component from "@root/lib/modules/core/ecs/Component";
import { FrameLoop } from "@root/lib/modules/FrameLoop";
import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { WorldService } from "@root/lib/modules/core/WorldService";
import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
import {ServiceEntity, WorldEntity} from "../../lib";

export class ComponentExample implements Component{
    constructor(frameLoop:FrameLoop,worldService:WorldService) {
        console.log("ComponentExample created");
        console.log(worldService.isActiveWorld());
        frameLoop.addLoop("test",()=>{
            //console.log("hello world");
        });
    }

    getType(): string {
        return ComponentExample.name;
    }
}

export class Factory implements WebpackLazyModule, ComponentFactory<ComponentExample>{
    constructor() {}

    async createComponent(world:WorldEntity, config:any): Promise<ComponentExample> {
        let services = world.getFirstComponentByType<ServiceEntity>(ServiceEntity.name);
        let frameLoop = await services.getService<FrameLoop>("@aptero/axolotis-player/modules/FrameLoop");
        let worldService = await services.getService<WorldService>("@aptero/axolotis-player/modules/core/WorldService");
        return new ComponentExample(frameLoop,worldService);
    }
}

