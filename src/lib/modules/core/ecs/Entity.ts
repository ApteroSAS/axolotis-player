import { DestroyableComponent } from "./DestroyableComponent";
import { Component } from "./Component";

export class Entity implements Component {
  private components: Component[] = [];

  constructor(private name: string) {}

  public addComponent<T extends Component>(component: T): T {
    this.components.push(component);
    return component;
  }

  public removeAllComponents() {
    this.components.forEach((comp) => {
      this.removeComponent(comp);
    });
  }

  public removeComponent<T extends Component>(component: T): T {
    if ("destroy" in component) {
      (component as any as DestroyableComponent).destroy();
    }
    this.components = this.components.filter((comp) => {
      return comp != component;
    });
    return component;
  }

  public addComponents(components: Component[]) {
    components.forEach((comp) => {
      this.addComponent(comp);
    });
  }

  public getComponents(): Component[] {
    return this.components;
  }

  public getComponentByType<T extends Component>(type: string): T[] {
    let ret: T[] = [];
    this.components.forEach((comp) => {
      if (comp.getType() === type) {
        ret.push(comp as T);
      }
    });
    return ret;
  }

  public getComponentByTypeStartsWith(type: string): Component[] {
    let ret: Component[] = [];
    this.components.forEach((comp) => {
      if (comp.getType().startsWith(type)) {
        ret.push(comp);
      }
    });
    return ret;
  }

  public getFirstComponentByTypeStartsWith<T extends Component>(
    type: string
  ): T {
    return this.getComponentByTypeStartsWith(type)[0] as T;
  }

  public getFirstComponentByType<T extends Component>(type: string): T {
    return this.getComponentByType(type)[0] as T;
  }

  public getType(): string {
    return this.name;
  }
}

export default Entity;
