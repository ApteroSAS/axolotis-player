import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import {
  LazyServices,
  Service,
} from "@root/lib/modules/core/service/LazyServices";
import Component from "@root/lib/modules/core/ecs/Component";
import * as EventEmitter from "eventemitter3";
import * as THREE from "three";

export class Factory implements WebpackLazyModule, Service<PlayerService> {
  async create(services: LazyServices): Promise<PlayerService> {
    return new PlayerService();
  }
}

export interface Player {
  declareNavMesh(navMesh: THREE.Mesh);
  askFlyMode();
  teleportToLocation(x: number, y: number, z: number);
  getHeadPosition(targetCopy: THREE.Vector3): void;
}

/**
 * Should be loosly coupled since multiple implementation of player will be behind that.
 */
export class PlayerService implements Component {
  player: Player | null = null;

  getType(): string {
    return PlayerService.name;
  }

  declarePlayer(player: Player) {
    if (this.player) {
      throw new Error();
    }
    this.player = player;
  }

  getCurrentPlayer(): Player {
    if (!this.player) {
      throw new Error();
    }
    return this.player;
  }
}
