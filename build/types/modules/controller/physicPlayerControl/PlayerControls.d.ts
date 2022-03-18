import { ThreeLib } from "@root/lib/modules/three/ThreeLib";
import { Input } from "@root/lib/modules/controller/physicPlayerControl/Input";
import Component from "@root/lib/modules/core/ecs/Component";
import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
export declare class Factory implements WebpackLazyModule, ComponentFactory<PlayerControls> {
    create(world: WorldEntity, config: any): Promise<PlayerControls>;
}
export default class PlayerControls implements Component {
    private input;
    private camera;
    private timeZeroToMax;
    private decceleration;
    private speed;
    private maxSpeed;
    private physicsComponent;
    private mouseSpeed;
    private acceleration;
    private isLocked;
    private angles;
    private pitch;
    private jumpVelocity;
    private yaw;
    private tempVec;
    private moveDir;
    private yOffset;
    private xAxis;
    private yAxis;
    private physicsBody;
    private transform;
    private zeroVec;
    private position;
    private rotation;
    getType(): string;
    constructor(physicsComponent: any, position: any, rotation: any, three: ThreeLib, input: Input);
    Initialize(): void;
    OnPointerlockChange: () => void;
    OnMouseMove: (event: any) => void;
    UpdateRotation(): void;
    Accelarate: (direction: any, t: any) => void;
    Deccelerate: (t: any) => void;
    Update(t: any): void;
}
