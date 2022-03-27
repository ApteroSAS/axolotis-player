import Component from "../ecs/Component";
import { WorldEntity } from "../ecs/WorldEntity";
export declare class CodeLoaderComponent implements Component {
    private initialLoading;
    private initialLoadingResolver;
    roomUrl: string;
    constructor();
    cleanUpRoomUrl(roomUrl: string): string;
    loadRoomDefinitionFile(roomUrl: string): Promise<any>;
    searchRoomDefinitionFile(): Promise<any>;
    getType(): string;
    awaitInitialLoading(): Promise<void>;
    startLoadingJson(world: WorldEntity, scene: {
        version: string;
        entities: {
            components: {
                module: string;
                config: any;
                classname: string | undefined;
            }[];
        }[];
        services: {
            module: string;
        }[];
    }, loadedCallBack: (progress: number, total: number) => void): Promise<any[]>;
}
