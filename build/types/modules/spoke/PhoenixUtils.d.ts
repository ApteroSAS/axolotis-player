export declare function createHubChannelParams(authToken?: string | null, permsToken?: string | null): {
    profile: {
        avatarId: string;
        displayName: string;
    };
    push_subscription_endpoint: any;
    auth_token: any;
    perms_token: any;
    bot_access_key: any;
    context: {
        mobile: boolean;
        embed: boolean;
    };
    hub_invite_id: any;
};
export declare function load(hubid: any): Promise<{
    data: any;
    hubPhxChannel: any;
    vapiddata: any;
}>;
export declare function invalidateReticulumMeta(): Promise<void>;
export declare function connectToReticulum(debug?: boolean, params?: any, socketClass?: any): Promise<any>;
export declare function getPresenceEntryForSession(presences: any, sessionId: any): any;
export declare function getPresenceContextForSession(presences: any, sessionId: any): any;
export declare function getPresenceProfileForSession(presences: any, sessionId: any): any;
export declare function migrateChannelToSocket(oldChannel: any, socket: any, params: any): Promise<unknown>;
export declare function migrateToChannel(oldChannel: any, newChannel: any): Promise<unknown>;
export declare function discordBridgesForPresences(presences: any[]): any[];
export declare function hasEmbedPresences(presences: any[]): boolean;
export declare function denoisePresence({ onJoin, onLeave, onChange }: {
    onJoin: any;
    onLeave: any;
    onChange: any;
}): {
    rawOnJoin: (key: any, beforeJoin: any, afterJoin: any) => void;
    rawOnLeave: (key: any, remaining: any, removed: any) => void;
};
export declare function presenceEventsForHub(events: any): {
    onJoin: (key: any, meta: any) => void;
    onLeave: (key: any, meta: any) => void;
    onChange: (key: any, previous: any, current: any) => void;
};
