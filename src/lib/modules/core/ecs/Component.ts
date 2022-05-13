export interface Component {
  getType(): string;
  destroy?(): void;
  init?(): void;
}

export default Component;
