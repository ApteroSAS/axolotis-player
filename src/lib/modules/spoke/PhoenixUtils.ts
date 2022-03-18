import { Socket } from "phoenix";

let configs = {
  RETICULUM_SOCKET_SERVER_PORT: "443",
  RETICULUM_SOCKET_SERVER: "alphahub.aptero.co", //TODO
  RETICULUM_SOCKET_PROTOCOL: "wss:",
};

export function createHubChannelParams(
  authToken: string | null = null,
  permsToken: string | null = null
) {
  /*{
        "profile": {
        "avatarId": "https://hub.aptero.co/data/avatar/A031/base.glb",
            "displayName": "Pierre"
    },
        "push_subscription_endpoint": null,
        "auth_token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJyZXQiLCJleHAiOjE2MjM2Nzc4NzUsImlhdCI6MTYxNjQyMDI3NSwiaXNzIjoicmV0IiwianRpIjoiMTBkMWFkZmYtYjBlMi00N2RkLWFiMTgtMjY3MGY0ZDVhMTFkIiwibmJmIjoxNjE2NDIwMjc0LCJzdWIiOiI2NDA0MDcwNTA5NjYyNjk5NjEiLCJ0eXAiOiJhY2Nlc3MifQ.qp29Ip4AKkpRPtVVOUikytL1u-lGPJidUglsWlW8H9izgdRsoH_c0yZuA04Miwi6K2iN-GsoCr8Kd1fTH0yp2g",
        "perms_token": null,
        "context": {
        "mobile": false,
            "embed": true
    },
        "hub_invite_id": null
    }*/
  const params = {
    profile: {
      avatarId: "",
      displayName: "",
    },
    push_subscription_endpoint: null,
    auth_token: null,
    perms_token: null,
    bot_access_key: null,
    context: {
      mobile: false,
      embed: true,
    },
    hub_invite_id: null,
  };

  return params;
}

export async function load(
  hubid
): Promise<{ data: any; hubPhxChannel: any; vapiddata: any }> {
  const socket = await connectToReticulum();
  socket.onClose((e) => {
    console.error(e);
  });

  const { data, hubPhxChannel, vapiddata } = await new Promise(
    (resolve, reject) => {
      // Reticulum global channel
      let retChannel = socket.channel(`ret`, { hub_id: hubid });
      retChannel
        .join()
        .receive("ok", (vapiddata) => {
          const hubPhxChannel = socket.channel(
            `hub:` + hubid,
            createHubChannelParams()
          );
          hubPhxChannel
            .join()
            .receive("ok", async (data) => {
              resolve({ data, hubPhxChannel, vapiddata });
            })
            .receive("error", (res) => {
              reject(res);
            });
        })
        .receive("error", (res) => {
          reject(res);
        });
    }
  );
  return { data, hubPhxChannel, vapiddata };
}

let reticulumMeta: any = null;
let invalidatedReticulumMetaThisSession = false;

let directReticulumHostAndPort;

async function refreshDirectReticulumHostAndPort() {
  const qs = new URLSearchParams(location.search);
  let host = qs.get("phx_host");
  host = host || configs.RETICULUM_SOCKET_SERVER;
  const port = configs.RETICULUM_SOCKET_SERVER_PORT;
  directReticulumHostAndPort = { host, port };
}

export async function invalidateReticulumMeta() {
  invalidatedReticulumMetaThisSession = true;
  reticulumMeta = null;
}

//TODO important function
export async function connectToReticulum(
  debug = false,
  params = null,
  socketClass = Socket
) {
  const qs = new URLSearchParams(location.search);

  const getNewSocketUrl = async () => {
    await refreshDirectReticulumHostAndPort();
    const { host, port } = directReticulumHostAndPort;
    const protocol =
      qs.get("phx_protocol") ||
      configs.RETICULUM_SOCKET_PROTOCOL ||
      (document.location.protocol === "https:" ? "wss:" : "ws:");

    return `${protocol}//${host}${port ? `:${port}` : ""}`;
  };

  const socketUrl = await getNewSocketUrl();
  console.log(`Phoenix Socket URL: ${socketUrl}`);

  const socketSettings: any = {};

  if (debug) {
    socketSettings.logger = (kind, msg, data) => {
      console.log(`${kind}: ${msg}`, data);
    };
  }

  if (params) {
    socketSettings.params = params;
  }

  const socket = new socketClass(`${socketUrl}/socket`, socketSettings);
  socket.connect();
  socket.onError(async () => {
    // On error, underlying reticulum node may have died, so rebalance by
    // fetching a new healthy node to connect to.
    invalidateReticulumMeta();

    const endPointPath = new URL(socket.endPoint).pathname;
    const newSocketUrl = await getNewSocketUrl();
    const newEndPoint = `${newSocketUrl}${endPointPath}`;
    console.log(`Socket error, changed endpoint to ${newEndPoint}`);
    socket.endPoint = newEndPoint;
  });

  return socket;
}

export function getPresenceEntryForSession(presences, sessionId) {
  const entry =
    Object.entries(presences || {}).find(([k]) => k === sessionId) || [];
  const presence: any = entry[1];
  return (presence && presence.metas && presence.metas[0]) || {};
}

export function getPresenceContextForSession(presences, sessionId) {
  return (getPresenceEntryForSession(presences, sessionId) || {}).context || {};
}

export function getPresenceProfileForSession(presences, sessionId) {
  return (getPresenceEntryForSession(presences, sessionId) || {}).profile || {};
}

function migrateBindings(oldChannel, newChannel) {
  const doNotDuplicate = [
    "phx_close",
    "phx_error",
    "phx_reply",
    "presence_state",
    "presence_diff",
  ];
  const shouldDuplicate = (event) => {
    return !event.startsWith("chan_reply_") && !doNotDuplicate.includes(event);
  };
  for (let i = 0, l = oldChannel.bindings.length; i < l; i++) {
    const item = oldChannel.bindings[i];
    if (shouldDuplicate(item.event)) {
      newChannel.bindings.push(item);
    }
  }
  newChannel.bindingRef = oldChannel.bindingRef;
}

// Takes the given channel, and creates a new channel with the same bindings
// with the given socket, joins it, and leaves the old channel after joining.
//
// NOTE: This function relies upon phoenix channel object internals, so this
// function will need to be reviewed if/when we ever update phoenix.js
export function migrateChannelToSocket(oldChannel, socket, params) {
  const channel = socket.channel(oldChannel.topic, params || oldChannel.params);

  migrateBindings(oldChannel, channel);

  for (let i = 0, l = oldChannel.pushBuffer.length; i < l; i++) {
    const item = oldChannel.pushBuffer[i];
    channel.push(item.event, item.payload, item.timeout);
  }

  const oldJoinPush = oldChannel.joinPush;
  const joinPush = channel.join();

  for (let i = 0, l = oldJoinPush.recHooks.length; i < l; i++) {
    const item = oldJoinPush.recHooks[i];
    joinPush.receive(item.status, item.callback);
  }

  return new Promise((resolve) => {
    joinPush.receive("ok", () => {
      // Clear all event handlers first so no duplicate messages come in.
      oldChannel.bindings = [];
      resolve(channel);
    });
  });
}

export function migrateToChannel(oldChannel, newChannel) {
  migrateBindings(oldChannel, newChannel);

  return new Promise((resolve, reject) => {
    newChannel
      .join()
      .receive("ok", (data) => {
        oldChannel.leave();
        oldChannel.bindings = [];
        resolve(data);
      })
      .receive("error", (data) => {
        newChannel.leave();
        reject(data);
      });
  });
}

export function discordBridgesForPresences(presences: any[]) {
  const channels = [];
  for (const p of Object.values(presences)) {
    for (const m of p.metas) {
      if (m.profile && m.profile.discordBridges) {
        Array.prototype.push.apply(
          channels,
          m.profile.discordBridges.map((b) => b.channel.name)
        );
      }
    }
  }
  return channels;
}

export function hasEmbedPresences(presences: any[]) {
  for (const p of Object.values(presences)) {
    for (const m of p.metas) {
      if (m.context && m.context.embed) {
        return true;
      }
    }
  }

  return false;
}

export function denoisePresence({ onJoin, onLeave, onChange }) {
  return {
    rawOnJoin: (key, beforeJoin, afterJoin) => {
      if (beforeJoin === undefined) {
        onJoin(key, afterJoin.metas[0]);
      }
    },
    rawOnLeave: (key, remaining, removed) => {
      if (remaining.metas.length === 0) {
        onLeave(key, removed.metas[0]);
      } else {
        onChange(
          key,
          removed.metas[removed.metas.length - 1],
          remaining.metas[remaining.metas.length - 1]
        );
      }
    },
  };
}

export function presenceEventsForHub(events) {
  const onJoin = (key, meta) => {
    events.trigger(`hub:join`, { key, meta });
  };
  const onLeave = (key, meta) => {
    events.trigger(`hub:leave`, { key, meta });
  };
  const onChange = (key, previous, current) => {
    events.trigger(`hub:change`, { key, previous, current });
  };
  return {
    onJoin,
    onLeave,
    onChange,
  };
}
