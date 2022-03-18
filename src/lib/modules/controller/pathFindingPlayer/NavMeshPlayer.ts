import * as THREE from "three";
import { Euler, Quaternion, Vector3 } from "three";
import { ThreeLib } from "@root/lib/modules/three/ThreeLib";
import { Input } from "@root/lib/modules/controller/physicPlayerControl/Input";
import { FrameLoop } from "@root/lib/modules/FrameLoop";
import Component from "@root/lib/modules/core/ecs/Component";
import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
import { ServiceEntity } from "@root/lib/modules/core/service/ServiceEntity";
import { NavMeshPathfinder } from "@root/lib/modules/controller/pathFindingPlayer/NavMeshPathfinder";
import {
  Player,
  PlayerService,
} from "@root/lib/modules/controller/PlayerService";

export class Factory
  implements WebpackLazyModule, ComponentFactory<NavMeshPlayer>
{
  async create(world: WorldEntity, config: any): Promise<NavMeshPlayer> {
    let services = world.getFirstComponentByType<ServiceEntity>(
      ServiceEntity.name
    );
    let three = await services.getService<ThreeLib>(
      "@root/lib/modules/three/ThreeLib"
    );
    let input = await services.getService<Input>(
      "@root/lib/modules/controller/pathFindingPlayer/Input"
    );
    let playerService = await services.getService<PlayerService>(
      "@root/lib/modules/controller/PlayerService"
    );
    let frameLoop = await services.getService<FrameLoop>(
      "@root/lib/modules/FrameLoop"
    );
    //let position = new THREE.Vector3(2.14, 1.48, -1.36);
    //let position = new THREE.Vector3(0,5,0);
    let position = new THREE.Vector3(
      (config.position && config.position.x) || 0,
      (config.position && config.position.y) || 0,
      (config.position && config.position.z) || 0
    );
    let rotation = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      -Math.PI * 0.5
    );
    let playerControls = new NavMeshPlayer(
      position,
      rotation,
      await three,
      await input,
      playerService
    );
    playerService.declarePlayer(playerControls);
    playerControls.Initialize();
    (await frameLoop).addLoop(NavMeshPlayer.name, (delta) => {
      playerControls.Update(delta);
    });
    return playerControls;
  }
}

const NAV_ZONE = "character";

export default class NavMeshPlayer implements Component, Player {
  private camera: any;
  private timeZeroToMax: number;
  private decceleration: number;
  private speed: Vector3;
  private maxSpeed: number;
  private mouseSpeed: number;
  private acceleration: number;
  private isLocked: boolean;
  private angles: Euler;
  private pitch: Quaternion;
  private jumpVelocity: number;
  private yaw: Quaternion;
  private tempVec: Vector3;
  private moveDir: Vector3;
  private yOffset: number; //playerHeight
  private xAxis: Vector3;
  private yAxis: Vector3;
  private position: Vector3;
  private positionOutTmp: Vector3 = new Vector3();
  private positionOutTmp2: Vector3 = new Vector3();
  private rotation: Quaternion;
  private velocity: Vector3;
  private navMesh: NavMeshPathfinder;

  getType(): string {
    return NavMeshPlayer.name;
  }

  askFlyMode() {}

  declareNavMesh(
    navMesh: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
  ) {
    this.navMesh.loadMesh(navMesh, NAV_ZONE);
  }

  teleportToLocation(x: number, y: number, z: number) {
    this.position.copy(new THREE.Vector3(x, y, z));
  }

  getHeadPosition(targetCopy: THREE.Vector3): void {
    targetCopy.copy(this.position);
  }

  constructor(
    position,
    rotation,
    three: ThreeLib,
    private input: Input,
    private playerService: PlayerService
  ) {
    this.position = position;
    this.rotation = rotation;
    this.navMesh = new NavMeshPathfinder();

    this.camera = three.camera;

    this.timeZeroToMax = 0.08;

    this.maxSpeed = 7.0;
    this.speed = new THREE.Vector3();
    this.acceleration = this.maxSpeed / this.timeZeroToMax;
    this.decceleration = -7.0;

    this.mouseSpeed = 0.002;
    this.isLocked = false;

    this.angles = new THREE.Euler();
    this.pitch = new THREE.Quaternion();
    this.yaw = new THREE.Quaternion();

    this.jumpVelocity = 5;
    this.yOffset = 2;
    this.tempVec = new THREE.Vector3();
    this.moveDir = new THREE.Vector3();
    this.xAxis = new THREE.Vector3(1.0, 0.0, 0.0);
    this.yAxis = new THREE.Vector3(0.0, 1.0, 0.0);
    this.velocity = new THREE.Vector3();
  }

  Initialize() {
    this.angles.setFromQuaternion(this.rotation);
    this.UpdateRotation();

    this.input.AddMouseMoveListner(this.OnMouseMove);

    document.addEventListener("pointerlockchange", this.OnPointerlockChange);

    this.input.AddClickListner(() => {
      if (!this.isLocked) {
        document.body.requestPointerLock();
      }
    });
  }

  OnPointerlockChange = () => {
    if (document.pointerLockElement) {
      this.isLocked = true;
      return;
    }

    this.isLocked = false;
  };

  OnMouseMove = (event) => {
    if (!this.isLocked) {
      return;
    }

    const { movementX, movementY } = event;

    this.angles.y -= movementX * this.mouseSpeed;
    this.angles.x -= movementY * this.mouseSpeed;

    this.angles.x = Math.max(
      -Math.PI / 2,
      Math.min(Math.PI / 2, this.angles.x)
    );

    this.UpdateRotation();
  };

  UpdateRotation() {
    this.pitch.setFromAxisAngle(this.xAxis, this.angles.x);
    this.yaw.setFromAxisAngle(this.yAxis, this.angles.y);

    this.rotation.multiplyQuaternions(this.yaw, this.pitch).normalize();

    this.camera.quaternion.copy(this.rotation);
  }

  Accelarate = (direction, t) => {
    const accel = this.tempVec
      .copy(direction)
      .multiplyScalar(this.acceleration * t);
    this.speed.add(accel);
    this.speed.clampLength(0.0, this.maxSpeed);
  };

  Deccelerate = (t) => {
    const frameDeccel = this.tempVec
      .copy(this.speed)
      .multiplyScalar(this.decceleration * t);
    this.speed.add(frameDeccel);
  };

  Update(t) {
    t = t * 0.001;
    const forwardFactor =
      this.input.GetKeyDown("KeyS") - this.input.GetKeyDown("KeyW");
    const rightFactor =
      this.input.GetKeyDown("KeyD") - this.input.GetKeyDown("KeyA");
    const direction = this.moveDir
      .set(rightFactor, 0.0, forwardFactor)
      .normalize();

    this.Deccelerate(t);
    this.Accelarate(direction, t);

    const moveVector = this.tempVec.copy(this.speed);
    moveVector.applyQuaternion(this.yaw);

    this.velocity.setX(moveVector.x);
    this.velocity.setZ(moveVector.z);
    this.velocity.multiplyScalar(t);

    this.positionOutTmp.x = this.position.x + this.velocity.x;
    this.positionOutTmp.y = this.position.y + this.velocity.y;
    this.positionOutTmp.z = this.position.z + this.velocity.z;

    if (this.navMesh.isEnabled()) {
      this.navMesh.findPositionOnNavMesh(
        this.position,
        this.positionOutTmp,
        this.positionOutTmp2
      );
      this.positionOutTmp2.y = this.positionOutTmp2.y + this.yOffset; //player height
    } else {
      this.positionOutTmp2.copy(this.positionOutTmp);
    }

    this.camera.position.set(
      this.positionOutTmp2.x,
      this.positionOutTmp2.y,
      this.positionOutTmp2.z
    );
    this.position.copy(this.camera.position);
  }
}
