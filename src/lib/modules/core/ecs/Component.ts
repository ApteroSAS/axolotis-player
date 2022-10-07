/**
 * A static dependencies : string[] field can be specified to request Axolotis dependencies -string correspond to Axolotis dependencies.
 * They will be injected in the same order in the constructor of the component otherwise the constructor takes no parameters.
 */
export interface Component {
  getType(): string;

  /**
   * Service will be initialized each time they are added to a WorldEntity Service manager
   * Component will be initialized each time they are added to an Entity
   */
  init?(): void;

  /**
   * Service will never be destroyed
   * Component will be initialized each time they are removed from an entity
   */
  destroy?(): void;
}

export default Component;
