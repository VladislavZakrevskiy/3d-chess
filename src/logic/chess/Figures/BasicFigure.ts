import { v4 } from "uuid";
import { Colors } from "../../types/Colors";
import { FigureTypes } from "../../types/Figures";
import { Cell } from "../Cell";

export class Figure {
	color: Colors;
	figureType: FigureTypes | null;
	cell: Cell;
	id: string;

	constructor(color: Colors, cell: Cell) {
		this.color = color;
		this.cell = cell;
		this.cell.figure = this;
		this.figureType = null;
		this.id = v4();
	}

	canMove(target: Cell): boolean {
		if (target.figure?.color === this.color) {
			return false
		}
		if (target.figure?.figureType === FigureTypes.KING) {
			return false
		}
		return true
	}

	moveFigure(target: Cell) {}
}
