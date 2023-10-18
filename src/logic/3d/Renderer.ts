import { Engine } from "./Engine";
import * as THREE from "three";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Board } from "../chess/ChessBoard";
import { Colors } from "../types/Colors";
export class Renderer {
	engine: Engine;
	board: Board

	constructor() {
		this.engine = new Engine();
		this.board = new Board()
	}

	loadMeshes() {
		const material = new THREE.MeshPhongMaterial({
			color: 0x000000,
		});
		const loader = new STLLoader();
		loader.load(
			"./models/chessbishoptall.stl",
			(geometry: THREE.BoxGeometry) => {
				const mesh = new THREE.Mesh(geometry, material);
				this.engine.scene.add(mesh);
			},
			(xhr: {loaded: number, total: number}) => {
				console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
			},
			(error: string) => {
				console.log(error);
			},
		);
	}

	createBoard() {
		this.board.initCells()

		for (let y = 0; y < this.board.cells.length; y++) {
			const row = this.board.cells[y]

			for (let x = 0; x < row.length; x++) {
				const cell = row[x]

				const geometry = new THREE.BoxGeometry(1, 1, 1)
				const material = new THREE.MeshToonMaterial({
					color: cell.color === Colors.BLACK ? 0x000000 : 0xffffff
				})
				const mesh = new THREE.Mesh(geometry, material)
				mesh.position.set(x, y, 0)
				mesh.name = cell.id
				this.engine.addToScene(mesh)
			}
		}
	}

	animate() {
		// this.loadMeshes()
		this.createBoard()
		this.engine.animate();
	}
}
