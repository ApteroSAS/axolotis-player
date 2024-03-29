import { ModulePromise } from "../../..";
/**
 * An Item (or SmartItem) is a set of Module (Services and/or Component)
 */
export interface Item {
    /**
     * Register Asynchronous/Dynamic Component or Service
     */
    modules(): {
        [id: string]: ModulePromise;
    };
}
export declare function registerItem(item: Item): void;
