import { WorldEntity } from "../ecs/WorldEntity";
export declare const BUILD_VERSION: any;
export declare function initHtmlFromUrl(url: string, config?: {
    onProgress?: (progress: number, total: number) => void;
    onLoaded?: () => void;
}): Promise<WorldEntity>;
export declare function initHtml(config?: {
    onProgress?: (progress: number, total: number) => void;
    onLoaded?: () => void;
}): void;
