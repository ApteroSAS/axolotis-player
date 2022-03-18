import { AmmoPhysics } from "@root/lib/modules/ammo/AmmoPhysics";
export default class PlayerPhysics {
    private world;
    private body;
    private canJump;
    private up;
    private tempVec;
    constructor(ammoPhysics: AmmoPhysics);
    Initialize(x: number, y: number, z: number): void;
    QueryJump(): void;
    PhysicsUpdate(): void;
}
