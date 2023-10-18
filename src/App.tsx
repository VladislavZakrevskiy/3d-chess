import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import { BoardComponent } from "./logic/3d/components/Board";
import { useState, useEffect, useCallback } from "react";
import { Board } from "./logic/chess/ChessBoard";
import { Player } from "./logic/chess/Player";
import { Colors } from "./logic/types/Colors";
import { Timer } from "./components/Timer";
import { LostFigures } from "./components/LostFigures";
import { Text3D } from "@react-three/drei";
import { Vector3, Euler } from "three";
import * as THREE from "three";
import { StarsBG } from "./logic/3d/components/Stars";

export function App() {
	const [board, setBoard] = useState(new Board());
	const whitePlayer = new Player(Colors.WHITE);
	const blackPlayer = new Player(Colors.BLACK);
	const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

	useEffect(() => {
		restart();
		setCurrentPlayer(whitePlayer);
	}, []);

	const restart = useCallback(() => {
		const newBoard = new Board();
		newBoard.initCells();
		newBoard.addFigures();
		setBoard(newBoard);
	}, []);

	function swapPlayer() {
		setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
	}

	return (
		<Canvas shadows camera={{ fov: 45, position: new Vector3(-20, 15, 0) }}>
			<OrbitControls position={new Vector3(10, 10, 10)} />
			<StarsBG />
			<Sky distance={450000} sunPosition={[2, 1, 10]} inclination={0} azimuth={0.25} />
			<Timer restart={restart} currentPlayer={currentPlayer} />
			<Text3D
				args={[undefined, new THREE.MeshPhysicalMaterial({ color: 0x000000 })]}
				position={new Vector3(10, 3, -7)}
				font={`./Roboto.json`}
				rotation={new Euler(0, 4.7, 0)}
			>
				Current player: {currentPlayer?.color}
			</Text3D>
			<BoardComponent board={board} currentPlayer={currentPlayer} setBoard={setBoard} swapPlayer={swapPlayer} />
			<directionalLight castShadow position={new Vector3(5, 10, 5)} />
			<LostFigures figures={board.lostBlackFigures} x={5} />
			<LostFigures figures={board.lostWhiteFigures} x={-6} />
		</Canvas>
	);
}
