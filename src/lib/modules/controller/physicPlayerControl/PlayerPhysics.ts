import { Ammo } from "@root/lib/modules/ammo/AmmoLib";
import { AmmoPhysics } from "@root/lib/modules/ammo/AmmoPhysics";

const CF_KINEMATIC_OBJECT = 2;
const DISABLE_DEACTIVATION = 4;

export default class PlayerPhysics {
  private world: any;
  private body: any;
  private canJump: boolean;
  private up: Ammo.btVector3;
  private tempVec: Ammo.btVector3;
  constructor(ammoPhysics: AmmoPhysics) {
    this.world = ammoPhysics.physicsWorld;
    this.body = null;
    this.canJump = false;
    this.up = new Ammo.btVector3(0, 1, 0);
    this.tempVec = new Ammo.btVector3();
  }

  Initialize(x: number, y: number, z: number) {
    const height = 1.3,
      radius = 0.3,
      mass = 5;

    const transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(x, y, z));
    const motionState = new Ammo.btDefaultMotionState(transform);

    const shape = new Ammo.btCapsuleShape(radius, height);
    const localInertia = new Ammo.btVector3(0, 0, 0);
    const bodyInfo = new Ammo.btRigidBodyConstructionInfo(
      mass,
      motionState,
      shape,
      localInertia
    );
    this.body = new Ammo.btRigidBody(bodyInfo);
    this.body.setFriction(0);

    //this.body.setCollisionFlags(this.body.getCollisionFlags() | CF_KINEMATIC_OBJECT);
    this.body.setActivationState(DISABLE_DEACTIVATION);

    this.world.addRigidBody(this.body);
  }

  QueryJump() {
    const dispatcher = this.world.getDispatcher();
    const numManifolds = dispatcher.getNumManifolds();

    for (let i = 0; i < numManifolds; i++) {
      const contactManifold = dispatcher.getManifoldByIndexInternal(i);
      const rb0 = Ammo.castObject(contactManifold.getBody0(), Ammo.btRigidBody);
      const rb1 = Ammo.castObject(contactManifold.getBody1(), Ammo.btRigidBody);

      if (rb0 != this.body && rb1 != this.body) {
        continue;
      }

      const numContacts = contactManifold.getNumContacts();

      for (let j = 0; j < numContacts; j++) {
        const contactPoint = contactManifold.getContactPoint(j);

        const normal = contactPoint.get_m_normalWorldOnB();
        this.tempVec.setValue(normal.x(), normal.y(), normal.z());

        if (rb1 == this.body) {
          this.tempVec.setValue(
            -this.tempVec.x(),
            -this.tempVec.y(),
            -this.tempVec.z()
          );
        }

        const angle = this.tempVec.dot(this.up);
        this.canJump = angle > 0.5;

        if (this.canJump) {
          return;
        }
      }
    }
  }

  PhysicsUpdate() {
    this.QueryJump();
  }
}
