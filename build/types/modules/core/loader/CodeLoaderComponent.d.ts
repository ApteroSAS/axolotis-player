import Component from "@root/lib/modules/core/ecs/Component";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
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
    startLoading(world: WorldEntity, list: any[], localModules: {
        [id: string]: () => Promise<any>;
    }, loadedCallBack: (progress: number, total: number) => void): Promise<any[]>;
}
