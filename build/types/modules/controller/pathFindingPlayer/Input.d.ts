import Component from "@root/lib/modules/core/ecs/Component";
import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { LazyServices, Service } from "@root/lib/modules/core/service/LazyServices";
export declare class Input implements Component {
    private _keyMap;
    private events;
    constructor();
    getType(): string;
    _addEventListner(element: any, type: any, callback: any): void;
    AddKeyDownListner(callback: any): void;
    AddKeyUpListner(callback: any): void;
    AddMouseMoveListner(callback: any): void;
    AddClickListner(callback: any): void;
    AddMouseDownListner(callback: any): void;
    AddMouseUpListner(callback: any): void;
    _onKeyDown: (event: any) => void;
    _onKeyUp: (event: any) => void;
    GetKeyDown(code: any): any;
    ClearEventListners(): void;
}
export declare class Factory implements WebpackLazyModule, Service<Input> {
    create(services: LazyServices): Promise<Input>;
}
