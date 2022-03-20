import Component from "@root/lib/modules/core/ecs/Component";
export interface Service<T> {
    createService(services: LazyServices): Promise<T>;
}
export declare class LazyServices {
    service: {
        [id: string]: Promise<Component> | undefined;
    };
    toId(path: any, classname: any): string;
    setService(path: string, service: Component, classname?: string): void;
    getService<T extends Component>(path: string, classname?: string): Promise<T>;
}
