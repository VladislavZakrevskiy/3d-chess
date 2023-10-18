import * as THREE from "three";
import { InteractionManager } from "three.interactive";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { OrbitControls  } from "three/examples/jsm/controls/OrbitControls";

const FPS = 30;

export class Engine {
	renderer;
	scene;
	light;
	camera;
	controls;
	interactionManager;
	timer = 0;

	constructor() {
		this.renderer = this.createRenderer();
		this.scene = this.createScene();
		this.light = this.createLight();
		this.camera = this.createCamera();
		this.controls = this.createControl();

		this.interactionManager = new InteractionManager(this.renderer, this.camera, this.renderer.domElement);

		this.scene.add(this.light);
	}

	createControl() {
		const controls = new OrbitControls(this.camera, this.renderer.domElement);
		controls.dragToLook = true;
		controls.movementSpeed = 3;
		controls.rollSpeed = Math.PI / 2;
		controls.autoForward = false;
		return controls;
	}

	createRenderer() {
		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);
		return renderer;
	}

	createScene() {
		const scene = new THREE.Scene();
		scene.background = new THREE.Color(0xffffff);
		return scene;
	}

	createCamera() {
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.z = 5;
		return camera;
	}

	createLight() {
		const light = new THREE.SpotLight();
		light.position.set(20, 20, 20);
		return light;
	}

	addToScene(object: THREE.Object3D) {
		this.scene.add(object);
	}

	addToManager(object: THREE.Object3D) {
		this.interactionManager.add(object);
	}

	animate() {
		let lt = new Date();
		let lastTimestamp = 0;
		// Инициализация Chess

		const loop = (time: number) => {
			const now = new Date(),
				secs = (+now - +lt) / 1000;
			lt = now;

			requestAnimationFrame(loop);

			this.renderer.render(this.scene, this.camera);
			this.interactionManager.update();
			this.controls.update(secs);

			if (time - lastTimestamp < 1000 / FPS) return;

			// Вычисления

			lastTimestamp = time;
		};
		this.timer = requestAnimationFrame(loop);
	}
}
