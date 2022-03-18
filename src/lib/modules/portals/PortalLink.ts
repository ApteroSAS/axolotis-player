import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
import Component from "@root/lib/modules/core/ecs/Component";
import { ServiceEntity } from "@root/lib/modules/core/service/ServiceEntity";
import { ThreeLib } from "@root/lib/modules/three/ThreeLib";
import * as THREE from "three";
import { FrameLoop } from "@root/lib/modules/FrameLoop";
import { PortalsService } from "@root/lib/modules/portals/PortalsService";
import { CodeLoaderComponent } from "@root/lib/modules/core/loader/CodeLoaderComponent";
import { PlayerService } from "@root/lib/modules/controller/PlayerService";
import { WorldService } from "@root/lib/modules/core/WorldService";

//https://barthaweb.com/2020/09/webgl-portal/
//https://github.com/stemkoski/AR-Examples/blob/master/portal-view.html
//https://stemkoski.github.io/AR-Examples/portal-view.html
//https://discourse.threejs.org/t/multiple-scenes-vs-layers/12503/10

export class Factory
  implements WebpackLazyModule, ComponentFactory<PortalLink>
{
  async create(
    world: WorldEntity,
    config: {
      url: string;
      in: { x: number; y: number; z: number };
      out: { x: number; y: number; z: number };
    }
  ): Promise<PortalLink> {
    let services = world.getFirstComponentByType<ServiceEntity>(
      ServiceEntity.name
    );
    let codeLoader = await services.getService<CodeLoaderComponent>(
      "@root/lib/modules/core/loader/CodeLoaderService"
    );
    let three = await services.getService<ThreeLib>(
      "@root/lib/modules/three/ThreeLib"
    );
    let service = await services.getService<PortalsService>(
      "@root/lib/modules/portals/PortalsService"
    );
    let playerService = await services.getService<PlayerService>(
      "@root/lib/modules/controller/PlayerService"
    );
    let worldService = await services.getService<WorldService>(
      "@root/lib/modules/core/WorldService"
    );
    let portalLink = new PortalLink(
      service,
      three,
      playerService,
      worldService,
      {
        position: new THREE.Vector3(config.in?.x, config.in?.y, config.in?.z),
      },
      {
        position: new THREE.Vector3(
          config.out?.x,
          config.out?.y,
          config.out?.z
        ),
      }
    );
    codeLoader.awaitInitialLoading().then(async (value) => {
      let world = await service.loadNewUrl(config.url);
      portalLink.setTargetWorld(world);
    });
    return portalLink;
  }
}

const invisibleLayer = 31;
const tmpVisibleLayer = 30;
const regularLayer = 0;

export class PortalLink implements Component {
  private otherCamera: THREE.PerspectiveCamera;
  private portalA: THREE.Mesh<THREE.CircleGeometry, THREE.MeshBasicMaterial>;
  private portalB: THREE.Mesh<THREE.CircleGeometry, THREE.MeshBasicMaterial>;
  private targetWorld: WorldEntity | null = null;
  private targetThreeLib: ThreeLib | null = null;
  private boundingBox: THREE.Box3;
  private targetLink: PortalLink | null = null;
  private portalPlane: THREE.Plane;
  private targetPlayerService: PlayerService | null = null;

  async setTargetWorld(world: WorldEntity) {
    this.targetWorld = world;
    let targetWorldService =
      await this.targetWorld.getFirstComponentByType<ServiceEntity>(
        ServiceEntity.name
      );
    this.targetThreeLib = await targetWorldService.getService<ThreeLib>(
      "@root/lib/modules/three/ThreeLib"
    );
    this.targetPlayerService =
      await targetWorldService.getService<PlayerService>(
        "@root/lib/modules/controller/PlayerService"
      );
    let otherPortals: PortalLink[] = await world.getComponentByType<PortalLink>(
      PortalLink.name
    );
    if (otherPortals.length === 0) {
      console.error("no destination portal present");
    }
    for (const op of otherPortals) {
      if (op.inPosition.position.equals(this.outPosition.position)) {
        // && op.key === this.key
        this.targetLink = op;
      }
    }
    if (this.targetLink) {
      this.portals.addPortalRenderLoop(() => {
        this.renderPortal();
      });
      this.portals.addPortalLoop((delta) => {
        this.computerPortalEnter();
      });
    } else {
      throw new Error("invalid portal init: target portal in wrong state");
    }
  }

  constructor(
    private portals: PortalsService,
    private three: ThreeLib,
    private playerService: PlayerService,
    private worldService: WorldService,
    private inPosition: { position: THREE.Vector3; rotation?: THREE.Euler },
    private outPosition: { position: THREE.Vector3; rotation?: THREE.Euler }
  ) {
    this.otherCamera = new THREE.PerspectiveCamera(
      three.camera.fov,
      window.innerWidth / window.innerHeight,
      this.three.camera.near,
      this.three.camera.far
    );
    three.scene.add(this.otherCamera);

    // Portal A (Portal View) ================================
    let defaultMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
      transparent: true,
    });

    this.portalA = new THREE.Mesh(
      new THREE.CircleGeometry(1, 64),
      //new THREE.BoxGeometry( 1, 1, 1 ),
      defaultMaterial.clone()
    );
    this.portalA.material.opacity = 0;
    this.portalA.position.copy(inPosition.position);
    if (inPosition.rotation) {
      this.portalA.setRotationFromEuler(inPosition.rotation);
    }
    this.portalA.layers.set(invisibleLayer); //invisible layer storage
    three.scene.add(this.portalA);
    this.portalA.geometry.computeBoundingBox();
    this.portalPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1)); //TODO remember to move and oriente the plan to follow the portal
    //const helper = new THREE.PlaneHelper( this.portalPlane, 1, 0xffff00 );
    //this.three.scene.add( helper );
    this.boundingBox = new THREE.Box3();
    this.boundingBox.copy(
      this.portalA.geometry.boundingBox || new THREE.Box3()
    );
    let minBox = new THREE.Box3(
      new THREE.Vector3(-0.2, -0.2, -0.2),
      new THREE.Vector3(0.2, 0.2, 0.2)
    );
    this.boundingBox = this.boundingBox.union(minBox);
    //const helper = new THREE.Box3Helper( this.boundingBox,0xffff00 as any );
    //this.three.scene.add( helper );
    // Portal B (Point of View position and rotation) ================================
    // material for portals and blockers
    let defaultMaterial2 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
    });

    this.portalB = new THREE.Mesh(
      new THREE.CircleGeometry(1, 64),
      defaultMaterial2.clone()
    );
    this.portalB.material.opacity = 0;
    this.portalB.position.copy(outPosition.position);
    if (outPosition.rotation) {
      this.portalB.setRotationFromEuler(outPosition.rotation);
    }
    three.scene.add(this.portalB);
  }

  tmpPos: THREE.Vector3 = new THREE.Vector3();
  tmpDir: THREE.Vector3 = new THREE.Vector3();
  tmpBox: THREE.Box3 = new THREE.Box3();
  tmpPlane: THREE.Plane = new THREE.Plane();
  collidingLastFrame: boolean = false;
  lastDistance: number = 0;
  gracePeriode = 0; //in FPS

  computerPortalEnter() {
    if (!this.worldService.isActiveWorld()) {
      return;
    }
    if (this.gracePeriode > 0) {
      this.gracePeriode--;
    }
    //compute collision
    this.tmpBox.copy(this.boundingBox);
    this.tmpPlane.copy(this.portalPlane);
    this.tmpBox.applyMatrix4(this.portalA.matrixWorld);
    this.tmpPlane.applyMatrix4(this.portalA.matrixWorld);
    this.playerService.getCurrentPlayer().getHeadPosition(this.tmpPos);
    this.three.camera.getWorldDirection(this.tmpDir);
    //this.tmpPos.add(this.tmpDir.multiplyScalar(0.30));
    const isColliding = this.tmpBox.containsPoint(this.tmpPos);
    if (isColliding) {
      if (this.lastDistance !== 0) {
        // - * + => - / + * - => - => this means we traversed the plan
        if (
          this.tmpPlane.distanceToPoint(this.tmpPos) * this.lastDistance <
          0
        ) {
          //enter
          console.log("enter");
          if (
            this.targetWorld &&
            this.targetLink &&
            this.targetPlayerService &&
            this.gracePeriode == 0
          ) {
            this.targetLink.gracePeriode = 5;
            this.targetLink.collidingLastFrame = true; //sync colliding flag
            this.targetLink.lastDistance = this.lastDistance;
            this.playerService.getCurrentPlayer().getHeadPosition(this.tmpPos); //right head position before teleport
            this.targetPlayerService
              .getCurrentPlayer()
              .teleportToLocation(this.tmpPos.x, this.tmpPos.y, this.tmpPos.z);
            console.log("teleport");
            this.worldService.setActiveWorld(this.targetWorld);
            this.targetPlayerService
              .getCurrentPlayer()
              .teleportToLocation(this.tmpPos.x, this.tmpPos.y, this.tmpPos.z);
          }
        }
      }
      this.lastDistance = this.tmpPlane.distanceToPoint(this.tmpPos);
    } else if (!isColliding && this.lastDistance !== 0) {
      //leave
      this.lastDistance = 0;
      console.log("leave");
    }
    this.collidingLastFrame = isColliding;
  }

  renderPortal() {
    if (!this.targetThreeLib) {
      return;
    }
    this.portalA.layers.set(tmpVisibleLayer); //Portal to render to layer 1

    // relatively align other camera with main camera

    let relativePosition = this.portalA.worldToLocal(
      this.three.camera.position.clone()
    );
    this.otherCamera.position.copy(this.portalB.localToWorld(relativePosition));

    let relativeRotation = this.three.camera.quaternion
      .clone()
      .multiply(this.portalA.quaternion.clone().invert());
    this.otherCamera.quaternion.copy(
      relativeRotation.multiply(this.portalB.quaternion)
    );

    // keep camera tilt in sync
    this.otherCamera.rotation.x = this.three.camera.rotation.x;

    let gl = this.three.renderer.getContext();

    // FIRST PASS
    // goal: using the stencil buffer, place 1's in position of first portal

    // enable the stencil buffer
    gl.enable(gl.STENCIL_TEST);

    // layer 1 contains only the first portal
    this.three.camera.layers.set(tmpVisibleLayer);

    gl.stencilFunc(gl.ALWAYS, 1, 0xff);
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
    gl.stencilMask(0xff);

    // only write to stencil buffer (not color or depth)
    gl.colorMask(false, false, false, false);
    gl.depthMask(false);

    this.three.renderer.render(this.three.scene, this.three.camera);
    //this.three.renderer.render( this.targetThreeLib.scene, this.targetThreeLib.camera );

    // SECOND PASS
    // goal: draw from the portal camera perspective (which is aligned relative to the second portal)
    //   in the first portal region (set by the stencil in the previous pass)

    // set up a clipping plane, so that portal camera does not see anything between
    //   the portal camera and the second portal

    // default normal of a plane is 0,0,1. apply mesh rotation to it.

    // determine which side of the plane camera is on, for clipping plane orientation.
    let portalToCamera = new THREE.Vector3().subVectors(
      this.three.camera.position.clone(),
      this.portalA.position.clone()
    ); //  applyQuaternion( mainMover.quaternion );
    let normalPortal = new THREE.Vector3(0, 0, 1).applyQuaternion(
      this.portalA.quaternion
    );
    let clipSide = -Math.sign(portalToCamera.dot(normalPortal));

    let clipNormal = new THREE.Vector3(0, 0, clipSide).applyQuaternion(
      this.portalB.quaternion
    );
    let clipPoint = this.portalB.position;
    let clipPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(
      clipNormal,
      clipPoint
    );
    this.three.renderer.clippingPlanes = [clipPlane];

    gl.colorMask(true, true, true, true);
    gl.depthMask(true);

    gl.stencilFunc(gl.EQUAL, 1, 0xff);
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);

    this.otherCamera.layers.set(regularLayer);
    //this.three.renderer.render( this.three.scene, this.otherCamera );//TODO maybe here scene 2
    this.three.renderer.render(this.targetThreeLib.scene, this.otherCamera);

    // disable clipping planes
    this.three.renderer.clippingPlanes = [];

    // THIRD PASS
    // goal: set the depth buffer data for the first portal,
    //   so that it can be occluded by other objects

    // finished with stencil
    gl.disable(gl.STENCIL_TEST);

    gl.colorMask(false, false, false, false);
    gl.depthMask(true);
    // need to clear the depth buffer, in case of occlusion
    this.three.renderer.render(this.three.scene, this.three.camera);

    this.three.camera.layers.set(regularLayer); // layer 0 contains everything but portals
    this.portalA.layers.set(invisibleLayer); //Portal to render to layer 1
  }

  getType(): string {
    return PortalLink.name;
  }
}
