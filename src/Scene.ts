import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

export default class MyScene extends THREE.Scene {
  private readonly mtlLoader = new MTLLoader();
  private readonly objLoader = new OBJLoader();
  private readonly models = new Map<string, THREE.Object3D>();
  async loadModels(mtl: Array<string>, obj: Array<string>) {
    for (const m of mtl) {
      const ml = await this.mtlLoader.loadAsync(m);
      ml.preload();
      this.objLoader.setMaterials(ml);
    }
    for (const o of obj) {
      const ol: THREE.Group = await this.objLoader.loadAsync(o);
      console.log(ol);
      this.models.set(o, ol);
    }
  }
  async initialize() {
    await this.loadModels(
      ["assets/cottage_obj.mtl"],
      ["assets/cottage_obj.obj"]
    );

    const cottageObj = this.models.get("assets/cottage_obj.obj")!.clone();
    
    cottageObj.position.set(0, 0, -10);
    cottageObj.scale.set(0.1, 0.1, 0.1);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    light.position.set(10, 10, 10);

    this.add(cottageObj);
    this.add(light);
    this.add(ambientLight);
  }
}
