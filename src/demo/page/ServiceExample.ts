import Component from "@root/lib/modules/core/ecs/Component";
import { FrameLoop } from "@root/lib/modules/FrameLoop";
import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { LazyServices, Service } from "@root/lib/modules/core/service/LazyServices";
import { WorldService } from "@root/lib/modules/core/WorldService";

export class ServiceExample implements Component{
    constructor(frameLoop:FrameLoop,worldService:WorldService) {
        console.log("ServiceExample created");
    }

    getType(): string {
        return ServiceExample.name;
    }
}

export class Factory implements WebpackLazyModule, Service<ServiceExample>{
    constructor() {}

    async createService(services:LazyServices): Promise<ServiceExample> {
        let frameLoop = await services.getService<FrameLoop>("@aptero/axolotis-player/modules/FrameLoop");
        let worldService = await services.getService<WorldService>("@aptero/axolotis-player/modules/core/WorldService");
        return new ServiceExample(frameLoop,worldService);
    }
}

