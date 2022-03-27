import { Component } from "./Component";
export interface DestroyableComponent extends Component {
    destroy(): void;
}
