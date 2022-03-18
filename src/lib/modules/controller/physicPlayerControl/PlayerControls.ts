import * as THREE from "three";
import { Euler, Quaternion, Vector3 } from "three";
import { ThreeLib } from "@root/lib/modules/three/ThreeLib";
import { AmmoPhysics } from "@root/lib/modules/ammo/AmmoPhysics";
import { Input } from "@root/lib/modules/controller/physicPlayerControl/Input";
import PlayerPhysics from "@root/lib/modules/controller/physicPlayerControl/PlayerPhysics";
import { FrameLoop } from "@root/lib/modules/FrameLoop";
import Component from "@root/lib/modules/core/ecs/Component";
import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
import { ServiceEntity } from "@root/lib/modules/core/service/ServiceEntity";

export class Factory
  implements WebpackLazyModule, ComponentFactory<PlayerControls>
{
  async create(world: WorldEntity, config: any): Promise<PlayerControls> {
    let services = world.getFirstComponentByType<ServiceEntity>(
      ServiceEntity.name
    );
    let three = await services.getService<ThreeLib>(
      "@root/lib/modules/three/ThreeLib"
    );
    let ammo = await services.getService<AmmoPhysics>(
      "@root/lib/modules/core/ammo/AmmoPhysics"
    );
    let input = await services.getService<Input>(
      "@root/lib/modules/controller/Input"
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
    let playerPhysics = new PlayerPhysics(await ammo);
    playerPhysics.Initialize(position.x, position.y, position.z);
    let playerControls = new PlayerControls(
      playerPhysics,
      position,
      rotation,
      await three,
      await input
    );
    playerControls.Initialize();
    (await frameLoop).addLoop(PlayerControls.name, (delta) => {
      playerControls.Update(delta);
      playerPhysics.PhysicsUpdate();
    });
    return playerControls;
  }
}

export default class PlayerControls implements Component {
  private camera: any;
  private timeZeroToMax: number;
  private decceleration: number;
  private speed: Vector3;
  private maxSpeed: number;
  private physicsComponent: any;
  private mouseSpeed: number;
  private acceleration: number;
  private isLocked: boolean;
  private angles: Euler;
  private pitch: Quaternion;
  private jumpVelocity: number;
  private yaw: Quaternion;
  private tempVec: Vector3;
  private moveDir: Vector3;
  private yOffset: number;
  private xAxis: Vector3;
  private yAxis: Vector3;
  private physicsBody: any;
  private transform: Ammo.btTransform | any;
  private zeroVec: Ammo.btVector3 | any;
  private position: Vector3;
  private rotation: Quaternion;

  getType(): string {
    return PlayerControls.name;
  }

  constructor(
    physicsComponent,
    position,
    rotation,
    three: ThreeLib,
    private input: Input
  ) {
    this.physicsComponent = physicsComponent;
    this.position = position;
    this.rotation = rotation;

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
    this.yOffset = 0.5;
    this.tempVec = new THREE.Vector3();
    this.moveDir = new THREE.Vector3();
    this.xAxis = new THREE.Vector3(1.0, 0.0, 0.0);
    this.yAxis = new THREE.Vector3(0.0, 1.0, 0.0);
  }

  Initialize() {
    this.physicsBody = this.physicsComponent.body;
    this.transform = new Ammo.btTransform();
    this.zeroVec = new Ammo.btVector3(0.0, 0.0, 0.0);
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

    const velocity = this.physicsBody.getLinearVelocity();

    if (this.input.GetKeyDown("Space") && this.physicsComponent.canJump) {
      velocity.setY(this.jumpVelocity);
      this.physicsComponent.canJump = false;
    }

    this.Deccelerate(t);
    this.Accelarate(direction, t);

    const moveVector = this.tempVec.copy(this.speed);
    moveVector.applyQuaternion(this.yaw);

    velocity.setX(moveVector.x);
    velocity.setZ(moveVector.z);

    this.physicsBody.setLinearVelocity(velocity);
    this.physicsBody.setAngularVelocity(this.zeroVec);

    const ms = this.physicsBody.getMotionState();
    if (ms) {
      ms.getWorldTransform(this.transform);
      const p = this.transform.getOrigin();
      this.camera.position.set(p.x(), p.y() + this.yOffset, p.z());
      this.position.copy(this.camera.position);
    }
  }
}
