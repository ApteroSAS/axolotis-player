import { Component } from "./Component";
export declare class Entity implements Component {
    private components;
    constructor();
    addComponent<T extends Component>(component: T): T;
    removeAllComponents(): void;
    removeComponent<T extends Component>(component: T): T;
    addComponents(components: Component[]): void;
    getComponents(): Component[];
    getComponentByType<T extends Component>(type: string): T[];
    getComponentByTypeStartsWith(type: string): Component[];
    getFirstComponentByTypeStartsWith<T extends Component>(type: string): T;
    getFirstComponentByType<T extends Component>(type: string): T;
    getType(): string;
}
export default Entity;
