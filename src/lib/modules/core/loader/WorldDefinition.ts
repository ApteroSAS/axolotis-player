export interface WorldDefinitionV2 {
  version: "2.0";
  entities: {
    components: {
      module: string;
      config: any;
    }[];
  }[];
}

export interface WorldDefinitionV1 {
  version?: "1.0";
}

export type WorldDefinition = WorldDefinitionV1 | WorldDefinitionV2;