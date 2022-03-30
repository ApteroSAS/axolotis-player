import Component from "../ecs/Component";
export interface Service<T> {
    createService(services: LazyServices): Promise<T>;
}
export declare class LazyServices {
    service: {
        [id: string]: Promise<Component> | undefined;
    };
    setService(path: string, service: Component, classname?: string): void;
    getService<T extends Component>(path: string): Promise<T>;
}
