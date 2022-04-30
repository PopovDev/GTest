import "./style.css";
import * as THREE from 'three';
import MyScene from "./Scene";

const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector<HTMLCanvasElement>('#app')!,
    antialias: true
})
renderer.setSize(width, height);


const mainCamera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
mainCamera.position.setY(1)
const scene = new MyScene(mainCamera);
scene.initialize();


renderer.render(scene, mainCamera);

const tick = () => {
    requestAnimationFrame(tick);
    scene.update();
    renderer.render(scene, mainCamera);
}
tick();