import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { LazyServices, Service } from "@root/lib/modules/core/service/LazyServices";
import Component from "@root/lib/modules/core/ecs/Component";
import * as THREE from "three";
export declare class Factory implements WebpackLazyModule, Service<PlayerService> {
    create(services: LazyServices): Promise<PlayerService>;
}
export interface Player {
    declareNavMesh(navMesh: THREE.Mesh): any;
    askFlyMode(): any;
    teleportToLocation(x: number, y: number, z: number): any;
    getHeadPosition(targetCopy: THREE.Vector3): void;
}
/**
 * Should be loosly coupled since multiple implementation of player will be behind that.
 */
export declare class PlayerService implements Component {
    player: Player | null;
    getType(): string;
    declarePlayer(player: Player): void;
    getCurrentPlayer(): Player;
}
