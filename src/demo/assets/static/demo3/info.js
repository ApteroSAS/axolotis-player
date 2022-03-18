let tmp = {
    "room": [
    {
        "type": "ecs-component-loader",
        "module": "@root/lib/modules/scenes/demo2/Sky2"
    },
    /*{
      "type": "ecs-component-loader",
      "module": "@root/lib/modules/scenes/demo3/SpokeRoomLoader",
      "config": {
        "room": "yUXD7A2"/tm5Dxeo
      }
    },*/
        {
            "type": "ecs-component-loader",
            "module": "@root/lib/modules/portals/PortalLink",
            "config": {
                "url": "assets/static/demo3/room2.json",
                "in": {"x": 1, "y": 2, "z": 2},
                "out": {"x": 1, "y": 2, "z": 2}
            }
        },
    {
        "type": "ecs-component-loader",
        "module": "@root/lib/modules/PortalLink",
        "config": {
            "room": "yUXD7A2"
        }
    },
    {
        "type": "ecs-component-loader",
        "module": "@root/lib/modules/controller/pathFindingPlayer/NavMeshPlayer",
        "config": {
            "position": {
                "x": 0,
                "y": 1,
                "z": 0
            }
        }
    }
]
}
