import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { RoughnessMipmapper } from "three/examples/jsm/utils/RoughnessMipmapper.js";
import { ThreeLib } from "@root/lib/modules/three/ThreeLib";
import Component from "@root/lib/modules/core/ecs/Component";
import { WebpackLazyModule } from "@root/lib/modules/core/loader/WebpackLoader";
import {
  LazyServices,
  Service,
} from "@root/lib/modules/core/service/LazyServices";

export class Factory implements WebpackLazyModule, Service<GLTFScene> {
  async create(services: LazyServices): Promise<GLTFScene> {
    let three = await services.getService<ThreeLib>(
      "@root/lib/modules/three/ThreeLib"
    );
    let module = new GLTFScene(three);
    return module;
  }
}

export class GLTFScene implements Component {
  constructor(three: ThreeLib) {
    new RGBELoader()
      .setPath("assets/static/demo/")
      .load("royal_esplanade_1k.hdr", function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        three.scene.background = texture;
        three.scene.environment = texture;
        // model
        // use of RoughnessMipmapper is optional
        const roughnessMipmapper = new RoughnessMipmapper(three.renderer);
        const loader = new GLTFLoader().setPath("assets/static/demo/");
        loader.load("DamagedHelmet.gltf", function (gltf) {
          gltf.scene.traverse(function (child: any) {
            if (child.isMesh) {
              roughnessMipmapper.generateMipmaps(child.material);
            }
          });
          three.scene.add(gltf.scene);
          roughnessMipmapper.dispose();
        });
      });
  }

  getType(): string {
    return GLTFScene.name;
  }
}
