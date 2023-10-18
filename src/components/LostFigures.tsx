import { FC } from "react";
import { Figure } from "../logic/3d/components/Figure";
import { Figure as FigureClass } from "../logic/chess/Figures/BasicFigure";

interface LostFiguresProps {
	x: number;
	figures: FigureClass[];
}

export const LostFigures: FC<LostFiguresProps> = ({ x, figures }) => {
	return figures.map((figure, z) => (
		<Figure color={figure.color} figureType={figure.figureType} x={z - 6} y={0} z={x} />
	));
};
