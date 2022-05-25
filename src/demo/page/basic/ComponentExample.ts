import Component from "../../../lib/modules/core/ecs/Component";
import {ServiceExample} from "./ServiceExample";

export class ComponentExample implements Component{
    public static dependencies : string[] = ["@local/ServiceExample"];
    constructor(service:ServiceExample,config:{text:string}) {
        console.log("ComponentExample created");
        service.addTextToElement(config.text);
    }

    getType(): string {
        return ComponentExample.name;
    }
}