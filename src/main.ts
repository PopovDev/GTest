import "./style.css";
import * as THREE from "three";
import MyScene from "./Scene";
import CameraControl from "./CameraControl";

const width = window.innerWidth;
const height = window.innerHeight;
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector<HTMLCanvasElement>("#app")!,
  antialias: true,
});
const mainCamera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const scene = new MyScene();
const startBtn = document.querySelector<HTMLButtonElement>("#start")!;
const overlay = document.querySelector<HTMLSpanElement>("#overlay")!;
const cameraControl = new CameraControl(
  mainCamera,
  renderer.domElement,
  (changed) => {
    if (changed) {
      overlay.style.display = "none";
    } else {
      overlay.style.display = "block";
    }
  }
);

startBtn.onclick = () => {
  cameraControl.lockCursor();
};

renderer.setSize(width, height);
scene.initialize();

const tick = () => {
  requestAnimationFrame(tick);
  renderer.render(scene, mainCamera);
  cameraControl.update();
};
tick();
