import {Service} from "../../../lib/modules/core/loader/service/Service";
import {IService, IServices} from "../../../lib";

export class ServiceExample implements IService{
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

export class Factory implements Service<ServiceExample>{
    async createService(services:IServices): Promise<ServiceExample> {
        return new ServiceExample();
    }
}

