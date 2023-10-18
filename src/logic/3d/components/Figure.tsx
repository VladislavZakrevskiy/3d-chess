import { FigureTypes } from "../../types/Figures";
import { FC } from "react";
import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { Colors } from "../../types/Colors";
import { BufferGeometry, Euler, Vector3 } from "three";

interface FigureProps {
	figureType: FigureTypes | null;
	color: Colors;
	x: number;
	y: number;
	z: number;
}

interface FigureData {
	type: BufferGeometry;
	x: number;
	z: number;
}

export const Figure: FC<FigureProps> = ({ figureType, color, x, y, z }) => {
	const BishopGeometry: BufferGeometry = useLoader(STLLoader, "./models/chessbishoptall.stl");
	const RookGeometry: BufferGeometry = useLoader(STLLoader, "./models/chessrooktall.stl");
	const KingGeometry: BufferGeometry = useLoader(STLLoader, "./models/chesskingtall.stl");
	const QueenGeometry: BufferGeometry = useLoader(STLLoader, "./models/chessqueentall.stl");
	const PawnGeometry: BufferGeometry = useLoader(STLLoader, "./models/chesspawntall.stl");
	const KnightGeometry: BufferGeometry = useLoader(STLLoader, "./models/chessknighttall.stl");

	const figureMap: Record<FigureTypes, FigureData> = {
		bishop: {
			type: BishopGeometry,
			x: -1.8,
			z: -1,
		},
		king: {
			type: KingGeometry,
			x: -1.8,
			z: -0.4,
		},
		queen: {
			type: QueenGeometry,
			x: -1.1,
			z: -0.4,
		},
		pawn: {
			type: PawnGeometry,
			x: -0.4,
			z: -2.4,
		},
		knight: {
			type: KnightGeometry,
			x: -1.8,
			z: -1.8,
		},
		rook: {
			type: RookGeometry,
			x: -1.79,
			z: -2.35,
		},
	};

	if (!figureType) {
		return null;
	}

	return (
		<mesh
			scale={new Vector3(0.025, 0.025, 0.025)}
			rotation={new Euler(23.5, 0, 0)}
			castShadow
			receiveShadow
			position={new Vector3(x + figureMap[figureType].x, y, z + figureMap[figureType].z)}
			args={[figureMap[figureType].type]}
		>
			<meshPhysicalMaterial color={color === Colors.BLACK ? 0x444444 : 0xffffff} />
		</mesh>
	);
};
