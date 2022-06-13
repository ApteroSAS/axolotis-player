import Component from "../../../lib/modules/core/ecs/Component";

export default class LazyServiceExample implements Component{
    public static dependencies : string[] = [];
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
        return LazyServiceExample.name;
    }
}