import { FC, useEffect, useRef, useState } from "react";
import { Player } from "../logic/chess/Player";
import { Colors } from "../logic/types/Colors";
import { Text3D } from "@react-three/drei";
import { Vector3, Euler } from "three";
import * as THREE from "three";

interface TimerProps {
	currentPlayer: Player | null;
	restart: () => void;
}

export const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
	const [blackTime, setBlackTime] = useState(300);
	const [whiteTime, setWhiteTime] = useState(300);
	const timer = useRef<null | ReturnType<typeof setInterval>>(null);

	useEffect(() => {
		startTimer();
	}, [currentPlayer]);

	function startTimer() {
		if (timer.current) {
			clearInterval(timer.current);
		}
		const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
		timer.current = setInterval(callback, 1000);
	}

	function decrementBlackTimer() {
		setBlackTime((prev) => prev - 1);
	}
	function decrementWhiteTimer() {
		setWhiteTime((prev) => prev - 1);
	}

	const handleRestart = () => {
		setWhiteTime(300);
		setBlackTime(300);
		restart();
	};

	return (
		<>
			<Text3D
				args={[undefined, new THREE.MeshPhysicalMaterial({ color: 0x000000 })]}
				position={new Vector3(10, 3, -12)}
				font={`./Roboto.json`}
				rotation={new Euler(0, 4.7, 0)}
			>
				{blackTime}
			</Text3D>
			<Text3D
				args={[undefined, new THREE.MeshPhysicalMaterial({ color: 0x000000 })]}
				position={new Vector3(10, 3, 8)}
				font={`./Roboto.json`}
				rotation={new Euler(0, 4.7, 0)}
			>
				{whiteTime}
			</Text3D>
		</>
	);
};
