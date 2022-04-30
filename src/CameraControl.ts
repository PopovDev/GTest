import * as THREE from "three";

//class for camera control
export default class CameraControl {
    private camera: THREE.Camera;
    private canvas: HTMLCanvasElement;
    private locked: boolean = false;
    private keySet: Set<string> = new Set();
    private speed: number = 0.1;
    constructor(
        camera: THREE.Camera,
        canvas: HTMLCanvasElement,
        lockChanged: (state: boolean) => void
    ) {
        this.camera = camera;
        this.canvas = canvas;
        document.onpointerlockchange = () => this.lockChaged(lockChanged);
        document.onmousemove = (event) => this.onMouseMove(event);
        document.onkeydown = (event) => this.onKeyDown(event);
        document.onkeyup = (event) => this.onKeyUp(event);
        this.camera.rotation.order = "YXZ";
    }
    private lockChaged(lockChanged: (state: boolean) => void) {
        this.locked = document.pointerLockElement === this.canvas;
        lockChanged(this.locked);
        if (!this.locked) { this.keySet.clear(); }
    }
    public lockCursor() {
        this.canvas.requestPointerLock();
    }

    public onMouseMove(event: MouseEvent) {
        if (this.locked) {
            const movementX = event.movementX || 0;
            const movementY = event.movementY || 0;

            this.camera.rotateY(-movementX * 0.002);
            this.camera.rotateX(-movementY * 0.002);
            this.camera.rotation.z = 0;
        }
    }
    public onKeyDown(event: KeyboardEvent) {
        this.keySet.add(event.key);
    }
    public onKeyUp(event: KeyboardEvent) {
        this.keySet.delete(event.key);
    }
    public update() {
        if (!this.locked) return;
        if (this.keySet.has("w")) {
            this.camera.position.z -= Math.cos(this.camera.rotation.y) * this.speed;
            this.camera.position.x -= Math.sin(this.camera.rotation.y) * this.speed;
        }
        if (this.keySet.has("s")) {
            this.camera.position.z += Math.cos(this.camera.rotation.y) * this.speed;
            this.camera.position.x += Math.sin(this.camera.rotation.y) * this.speed;
        }
        if (this.keySet.has("d")) {
            this.camera.position.z +=
                Math.cos(this.camera.rotation.y + Math.PI / 2) * this.speed;
            this.camera.position.x +=
                Math.sin(this.camera.rotation.y + Math.PI / 2) * this.speed;
        }
        if (this.keySet.has("a")) {
            this.camera.position.z +=
                Math.cos(this.camera.rotation.y - Math.PI / 2) * this.speed;
            this.camera.position.x +=
                Math.sin(this.camera.rotation.y - Math.PI / 2) * this.speed;
        }
        //spase
        if (this.keySet.has(" ")) {
            this.camera.position.y += this.speed;
        }
        if (this.keySet.has("Shift")) {
            this.camera.position.y -= this.speed;
        }
    }
}
