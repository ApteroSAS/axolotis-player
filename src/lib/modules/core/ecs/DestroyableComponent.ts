import { Component } from "@root/lib/modules/core/ecs/Component";

export interface DestroyableComponent extends Component{
    destroy():void;
}
