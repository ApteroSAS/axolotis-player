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
