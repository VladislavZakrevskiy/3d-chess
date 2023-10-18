import { FC } from "react";
import { Cell } from "../../chess/Cell";
import { Colors } from "../../types/Colors";
import { Figure } from "./Figure";
import { Vector3 } from "three";

interface CellProps {
	cell: Cell;
	selected: boolean;
	click: (cell: Cell) => void;
	x: number;
	z: number;
}

const BlackMaterial = ({ cell, selected }: { cell: Cell; selected: boolean }) => {
	return <meshToonMaterial color={cell.available ? 0x22a222 : selected ? 0x227722 : 0x444444} />;
};

const WhiteMaterial = ({ cell, selected }: { cell: Cell; selected: boolean }) => {
	return <meshToonMaterial color={cell.available ? 0x6fee6f : selected ? 0x6fc46f : 0xdddddd} />;
};

export const CellComponent: FC<CellProps> = ({ cell, selected, click, x, z }) => {
	const isBlack = cell.color === Colors.BLACK;

	return (
		<>
			{cell.figure && <Figure figureType={cell.figure.figureType} color={cell.figure.color} x={x} z={z} y={0} />}
			<mesh
				castShadow
				receiveShadow
				name={cell.id}
				onClick={() => {
					click(cell);
				}}
				position={new Vector3(x, 0, z)}
			>
				<boxGeometry args={[1, 0.3, 1]} />
				{isBlack ? (
					<BlackMaterial cell={cell} selected={selected} />
				) : (
					<WhiteMaterial cell={cell} selected={selected} />
				)}
			</mesh>
		</>
	);
};
