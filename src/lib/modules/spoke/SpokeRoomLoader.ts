import { load } from "@root/lib/modules/spoke/PhoenixUtils";
import Component from "@root/lib/modules/core/ecs/Component";
import SceneLoader from "@root/lib/modules/spoke/SceneLoader";
import { ThreeLib } from "@root/lib/modules/three/ThreeLib";
import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import { ComponentFactory } from "@root/lib/modules/core/ecs/ComponentFactory";
import { WorldEntity } from "@root/lib/modules/core/ecs/WorldEntity";
import { ServiceEntity } from "@root/lib/modules/core/service/ServiceEntity";
import { PlayerService } from "@root/lib/modules/controller/PlayerService";

export class SpokeRoomLoader implements Component {
  public sceneLoader: SceneLoader | null = null;

  constructor(private threeLib: ThreeLib) {}

  async loadRoom(hubid) {
    const { data, hubPhxChannel, vapiddata } = await load(hubid);
    const sceneURL = data.hubs[0].scene.model_url.replace(".bin", ".glb");
    this.sceneLoader = new SceneLoader();
    await this.sceneLoader.loadScene(sceneURL, this.threeLib);
  }

  getType(): string {
    return SpokeRoomLoader.name;
  }
}

export class Factory
  implements WebpackLazyModule, ComponentFactory<SpokeRoomLoader>
{
  async create(world: WorldEntity, config: any): Promise<SpokeRoomLoader> {
    let services = world.getFirstComponentByType<ServiceEntity>(
      ServiceEntity.name
    );
    let three = await services.getService<ThreeLib>(
      "@root/lib/modules/three/ThreeLib"
    );
    let playerService = await services.getService<PlayerService>(
      "@root/lib/modules/controller/PlayerService"
    );
    let spokeRoomLoader = new SpokeRoomLoader(three);
    await spokeRoomLoader.loadRoom(config.room);
    if (spokeRoomLoader.sceneLoader) {
      playerService
        .getCurrentPlayer()
        .declareNavMesh(spokeRoomLoader.sceneLoader.navMesh);
    }
    return spokeRoomLoader;
  }
}

/*
Have to connect to the phoenix websocket
and get scene url from message from
["2", "2", "hub:yUXD7A2", "phx_reply", {
    "response": {
        "hub_requires_oauth": false,
        "hubs": [{
            "allow_promotion": true,
            "description": null,
            "embed_token": "c223b27b9e6f48c5591b4b140fe7de6f",
            "entry_code": 180429,
            "entry_mode": "allow",
            "host": "dedicatedwebrtc3.aptero.co",
            "hub_id": "yUXD7A2",
            "lobby_count": 0,
            "member_count": 0,
            "member_permissions": {
                "fly": true,
                "pin_objects": true,
                "spawn_and_move_media": true,
                "spawn_camera": true,
                "spawn_drawing": true,
                "spawn_emoji": true
            },
            "name": "Lightweight Empty Room",
            "port": "443",
            "room_size": 50,
            "scene": {
                "account_id": null,
                "allow_promotion": false,
                "allow_remixing": false,
                "attribution": null,
                "attributions": { "content": [], "creator": "" },
                "description": null,
                "model_url": "https://alphahub.aptero.co/files/598eeed3-0768-408a-a75b-b0fcb8e907af.bin",
                "name": "Museum",
                "parent_scene_id": null,
                "project_id": "wwDyQ8t",
                "scene_id": "br4pVT2",
                "screenshot_url": "https://alphahub.aptero.co/files/38473f11-615f-487d-b20b-f3b6558abea6.jpg",
                "type": "scene",
                "url": "https://alphahub.aptero.co/scenes/br4pVT2/museum"
            },
            "slug": "lightweight-empty-room",
            "turn": {
                "credential": "CWBiIUroBx9x7OITbxMrm54HiJw=",
                "enabled": true,
                "transports": [{ "port": 5349 }],
                "username": "1636140736:coturn"
            },
            "user_data": null
        }],
        "perms_token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNjQwNDA3MDUwOTY2MjY5OTYxIiwiYW1wbGlmeV9hdWRpbyI6dHJ1ZSwiYXVkIjoicmV0X3Blcm1zIiwiY2xvc2VfaHViIjp0cnVlLCJjcmVhdGVfaHViIjp0cnVlLCJlbWJlZF9odWIiOnRydWUsImV4cCI6MTYzNjE0MDkxNiwiZmx5Ijp0cnVlLCJodWJfaWQiOiJ5VVhEN0EyIiwiaWF0IjoxNjM2MTQwNjE2LCJpc3MiOiIiLCJqb2luX2h1YiI6dHJ1ZSwianRpIjoiZjhkNGU2MDMtMWE0NC00MWRmLTg5NWMtNjE3ZGVhYzc5ZDI4Iiwia2lja191c2VycyI6dHJ1ZSwibXV0ZV91c2VycyI6dHJ1ZSwibmJmIjoxNjM2MTQwNjE1LCJwaW5fb2JqZWN0cyI6dHJ1ZSwicG9zdGdyZXN0X3JvbGUiOiJyZXRfYWRtaW4iLCJzcGF3bl9hbmRfbW92ZV9tZWRpYSI6dHJ1ZSwic3Bhd25fY2FtZXJhIjp0cnVlLCJzcGF3bl9kcmF3aW5nIjp0cnVlLCJzcGF3bl9lbW9qaSI6dHJ1ZSwic3ViIjoiNjQwNDA3MDUwOTY2MjY5OTYxX3lVWEQ3QTIiLCJ0d2VldCI6ZmFsc2UsInR5cCI6ImFjY2VzcyIsInVwZGF0ZV9odWIiOnRydWUsInVwZGF0ZV9odWJfcHJvbW90aW9uIjp0cnVlLCJ1cGRhdGVfcm9sZXMiOnRydWV9.qlNJloKYDmc2wSTaKF1eVYKKV_lCuuwzfdRnq3Jc-OP9P5uhKiFzo1i9N6rHBCIfITEwp8fJouD7TNOrBvpwFgxR1JHTgOpgWTdD6ltxRGspbtJRMJQ7qa66WTrVxKup4fI1ah70dFIsHu26GNdUaaNp8503VYuo41Dzs0XnTT1bLjbNM0ugJ_ZaF_d24b1m_7dLKdAn0-aZkoTQSCl3wzNDKLE90B2FJT6Mc7hqeo8d0mhr3yNQSRyJ4xLS0TBG4fvFZQL5H_bRD4Fk-q17jeMAgIAvtquElbs1cYRnQFE3g-PcsRYYRsejWaz4PEJUlZ5MM5tbohM5XoVHdRT8ZA",
        "session_id": "a3c750b8-6446-4a1e-a638-c516073d8861",
        "session_token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJyZXRfc2Vzc2lvbiIsImV4cCI6MTYzNjIyNzAxNiwiaWF0IjoxNjM2MTQwNjE2LCJpc3MiOiIiLCJqdGkiOiIzNDk4Yjg4OC01NjA0LTQxYzctYWFmZC0xMjI5NmU4YmNlYTIiLCJuYmYiOjE2MzYxNDA2MTUsInNlc3Npb25faWQiOiJhM2M3NTBiOC02NDQ2LTRhMWUtYTYzOC1jNTE2MDczZDg4NjEiLCJzdWIiOiJhM2M3NTBiOC02NDQ2LTRhMWUtYTYzOC1jNTE2MDczZDg4NjEiLCJ0eXAiOiJhY2Nlc3MifQ.EbEzkgwNJ8_H4g8vxFI-ch9HprbzNh12xkfj-OrUOkUqTF-j-qEpsF-XFIZozSlCU2cwJVD7RLuxNOuqDVF76g",
        "subscriptions": { "favorites": true, "web_push": null }
    }, "status": "ok"
}];

 */
