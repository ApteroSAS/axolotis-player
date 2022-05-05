import Component from "../../../lib/modules/core/ecs/Component";
import { ComponentFactory } from "../../../lib/modules/core/ecs/ComponentFactory";
import {Services, WorldEntity} from "../../../lib";
import {ServiceExample} from "./ServiceExample";
import {LazyServiceExample} from "./LazyServiceExample";

export class LazyComponentExample implements Component{
    constructor(service:LazyServiceExample,config:{text:string}) {
        console.log("ComponentExample created");
        service.addTextToElement(config.text);
    }

    getType(): string {
        return LazyComponentExample.name;
    }
}

export class Factory implements ComponentFactory<LazyComponentExample>{
    constructor() {}

    async createComponent(world:WorldEntity, config:any): Promise<LazyComponentExample> {
        let services = world.getFirstComponentByType<Services>(Services.name);
        let serviceExample = await services.getService<LazyServiceExample>("@local/LazyServiceExample");
        return new LazyComponentExample(serviceExample,config);
    }
}

