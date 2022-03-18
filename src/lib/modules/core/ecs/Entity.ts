import { DestroyableComponent } from "./DestroyableComponent";
import { Component } from "./Component";

export class Entity implements Component {
  private components: Component[] = [];
  private waitingForComponent: { [id: string]: any[] } = {};

  constructor(private name: string) {}

  public addComponent<T extends Component>(component: T): T {
    this.components.push(component);

    //part for async getComponent
    if (this.waitingForComponent[component.getType()]) {
      for (const elem of this.waitingForComponent[component.getType()]) {
        elem(component);
      }
      delete this.waitingForComponent[component.getType()];
    }

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

  public async getFirstComponentByTypeAsync<T extends Component>(
    type: string
  ): Promise<T> {
    if (this.getComponentByType(type)[0]) {
      return this.getComponentByType(type)[0] as T;
    } else {
      if (!this.waitingForComponent[type]) {
        this.waitingForComponent[type] = [];
      }
      let promise = new Promise<T>((resolve, reject) => {
        this.waitingForComponent[type].push(resolve); //will resolve later
      });
      return promise;
    }
  }

  public getType(): string {
    return this.name;
  }
}

export default Entity;
