import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
import Component from "@root/lib/modules/core/ecs/Component";
import { ThreeLib } from "@root/lib/modules/three/ThreeLib";
import * as THREE from "three";
import { PortalsService } from "@root/lib/modules/portals/PortalsService";
import { PlayerService } from "@root/lib/modules/controller/PlayerService";
import { WorldService } from "@root/lib/modules/core/WorldService";
export declare class Factory implements WebpackLazyModule, ComponentFactory<PortalLink> {
    create(world: WorldEntity, config: {
        url: string;
        in: {
            x: number;
            y: number;
            z: number;
        };
        out: {
            x: number;
            y: number;
            z: number;
        };
    }): Promise<PortalLink>;
}
export declare class PortalLink implements Component {
    private portals;
    private three;
    private playerService;
    private worldService;
    private inPosition;
    private outPosition;
    private otherCamera;
    private portalA;
    private portalB;
    private targetWorld;
    private targetThreeLib;
    private boundingBox;
    private targetLink;
    private portalPlane;
    private targetPlayerService;
    setTargetWorld(world: WorldEntity): Promise<void>;
    constructor(portals: PortalsService, three: ThreeLib, playerService: PlayerService, worldService: WorldService, inPosition: {
        position: THREE.Vector3;
        rotation?: THREE.Euler;
    }, outPosition: {
        position: THREE.Vector3;
        rotation?: THREE.Euler;
    });
    tmpPos: THREE.Vector3;
    tmpDir: THREE.Vector3;
    tmpBox: THREE.Box3;
    tmpPlane: THREE.Plane;
    collidingLastFrame: boolean;
    lastDistance: number;
    gracePeriode: number;
    computerPortalEnter(): void;
    renderPortal(): void;
    getType(): string;
}
