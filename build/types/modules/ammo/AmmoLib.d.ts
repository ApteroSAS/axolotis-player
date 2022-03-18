declare let Ammo: any;
declare const CollisionFlags: {
    CF_NO_CONTACT_RESPONSE: number;
};
declare const CollisionFilterGroups: {
    DefaultFilter: number;
    StaticFilter: number;
    KinematicFilter: number;
    DebrisFilter: number;
    SensorTrigger: number;
    CharacterFilter: number;
    AllFilter: number;
};
declare function createConvexHullShape(object: any): any;
declare class AmmoHelper {
    static init(callback?: () => void): void;
    static CreateTrigger(shape: any, position: any, rotation: any): any;
    static IsTriggerOverlapping(ghostObj: any, rigidBody: any): boolean;
    static CastRay(world: any, origin: any, dest: any, result?: any, collisionFilterMask?: number): boolean;
}
export { AmmoHelper, Ammo, createConvexHullShape, CollisionFlags, CollisionFilterGroups, };
