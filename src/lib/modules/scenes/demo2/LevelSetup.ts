import Component from "@root/lib/modules/core/ecs/Component";
import { Ammo, createConvexHullShape } from "@root/lib/modules/ammo/AmmoLib";
import { AmmoPhysics } from "@root/lib/modules/ammo/AmmoPhysics";
import { loadAssets } from "@root/lib/modules/core/loader/AssetsLoader";
import { ThreeLib } from "@root/lib/modules/three/ThreeLib";
import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
import { ServiceEntity } from "@root/lib/modules/core/service/ServiceEntity";

export class Factory
  implements WebpackLazyModule, ComponentFactory<LevelSetup>
{
  async create(world: WorldEntity, config: any): Promise<LevelSetup> {
    let services = world.getFirstComponentByType<ServiceEntity>(
      ServiceEntity.name
    );
    let three = await services.getService<ThreeLib>(
      "@root/lib/modules/three/ThreeLib"
    );
    let ammo = await services.getService<AmmoPhysics>(
      "@root/lib/modules/core/ammo/AmmoPhysics"
    );
    let module = new LevelSetup();
    await module.loadScene(ammo, three);
    return module;
  }
}

export default class LevelSetup implements Component {
  private scene: any;
  private physicsWorld: any;
  private mesh: any;
  constructor() {}

  getType(): string {
    return "LevelSetup";
  }

  async loadScene(ammoPhysics: AmmoPhysics, threeLib: ThreeLib) {
    this.scene = threeLib.scene;
    this.physicsWorld = ammoPhysics.physicsWorld;
    this.mesh = await loadAssets("assets/static/demo2/level.glb");
    this.mesh = this.mesh.scene;

    this.mesh.traverse((node) => {
      if (node.isMesh || node.isLight) {
        node.castShadow = true;
      }
      if (node.isMesh) {
        node.receiveShadow = true;
        //node.material.wireframe = true;
        this.setStaticCollider(node);
      }

      if (node.isLight) {
        node.intensity = 3;
        const shadow = node.shadow;
        const lightCam = shadow.camera;

        shadow.mapSize.width = 1024 * 3;
        shadow.mapSize.height = 1024 * 3;
        shadow.bias = -0.00007;

        const dH = 35,
          dV = 35;
        lightCam.left = -dH;
        lightCam.right = dH;
        lightCam.top = dV;
        lightCam.bottom = -dV;

        //const cameraHelper = new THREE.CameraHelper(lightCam);
        //this.scene.add(cameraHelper);
      }
    });

    this.scene.add(this.mesh);
  }

  setStaticCollider(mesh) {
    const shape = createConvexHullShape(mesh);
    const mass = 0;
    const transform = new Ammo.btTransform();
    transform.setIdentity();
    const motionState = new Ammo.btDefaultMotionState(transform);

    const localInertia = new Ammo.btVector3(0, 0, 0);
    const rbInfo = new Ammo.btRigidBodyConstructionInfo(
      mass,
      motionState,
      shape,
      localInertia
    );
    const object = new Ammo.btRigidBody(rbInfo);
    object.mesh = mesh;

    this.physicsWorld.addRigidBody(object);
  }
}
