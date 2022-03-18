import { Vector3 } from "three";
export declare class NavMeshPathfinder {
    private pathfinder;
    private mesh;
    private zone;
    private navGroup;
    private navNode;
    isEnabled(): boolean;
    loadMesh(mesh: any, zone?: string): void;
    getClosestNode(pos: any): any;
    findPositionOnNavMesh(start: Vector3, end: Vector3, outPos: Vector3, shouldRecomputeGroupAndNode?: boolean): Vector3;
    removeNavMeshData(): void;
}
