import Component from "@root/lib/modules/core/ecs/Component";
import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
import {Services, WorldEntity} from "../../lib";
import {ServiceExample} from "./ServiceExample";

export class ComponentExample implements Component{
    constructor(service:ServiceExample,config:{text:string}) {
        console.log("ComponentExample created");
        service.addTextToElement(config.text);
    }

    getType(): string {
        return ComponentExample.name;
    }
}

export class Factory implements ComponentFactory<ComponentExample>{
    constructor() {}

    async createComponent(world:WorldEntity, config:any): Promise<ComponentExample> {
        let services = world.getFirstComponentByType<Services>(Services.name);
        let serviceExample = await services.getService<ServiceExample>("@local/ServiceExample");
        return new ComponentExample(serviceExample,config);
    }
}

