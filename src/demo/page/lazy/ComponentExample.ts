import Component from "../../../lib/modules/core/ecs/Component";
import { ComponentFactory } from "../../../lib/modules/core/ecs/ComponentFactory";
import {Services, WorldEntity} from "../../../lib";
import {ServiceExample} from "./ServiceExample";

export class ComponentExample implements Component{
    public static dependencies : string[] = ["@local/ServiceExample"];
    constructor(service:ServiceExample,config:{text:string}) {
        console.log("ComponentExample created", config);
        service.addTextToElement(config.text);
    }

    getType(): string {
        return ComponentExample.name;
    }
}

export class Factory implements ComponentFactory<ComponentExample>{
    constructor() {}

    async createComponent(world:WorldEntity, config:any): Promise<ComponentExample> {
        //@ts-ignore
        let services = world.getFirstComponentByType<Services>(Services.name);
        let serviceExample = await services.getService<ServiceExample>("@local/ServiceExample");
        return new ComponentExample(serviceExample,config);
    }
}

