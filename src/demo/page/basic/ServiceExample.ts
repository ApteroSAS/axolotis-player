import Component from "../../../lib/modules/core/ecs/Component";
import { LazyServices } from "../../../lib/modules/core/loader/service/LazyServices";
import {Service} from "../../../lib/modules/core/loader/service/Service";

export class ServiceExample implements Component{
    constructor() {
        console.log("ServiceExample created");
    }

    addTextToElement(text:string){
        console.log("ServiceExample serviceFunction : "+text);
        if (typeof window !== "undefined") {
            let tag = document.createElement("p");
            let textNode = document.createTextNode(text);
            tag.appendChild(textNode);
            document.body.appendChild(tag);
        }
    }

    getType(): string {
        return ServiceExample.name;
    }
}