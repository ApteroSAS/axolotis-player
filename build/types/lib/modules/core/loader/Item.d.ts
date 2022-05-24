import { IService, Module } from "../../..";
/**
 * An Item (or SmartItem) is a set of Module (Services and/or Component)
 */
export interface Item {
    /**
     * Register a set of static services
     */
    staticService(): {
        [id: string]: IService;
    };
    /**
     * Register Asynchronous/Dynamic Component or Service
     */
    modules(): {
        [id: string]: Module;
    };
}
export declare function registerItem(item: Item): void;
