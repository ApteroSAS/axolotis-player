import Component from "../../../lib/modules/core/ecs/Component";
import {LazyServiceExample} from "./LazyServiceExample";

export class LazyComponentExample implements Component{
    public static dependencies : string[] = ["@local/LazyServiceExample"];
    constructor(service:LazyServiceExample,config:{text:string}) {
        console.log("ComponentExample created");
        service.addTextToElement(config.text);
    }

    getType(): string {
        return LazyComponentExample.name;
    }
}