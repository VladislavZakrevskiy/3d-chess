import { Colors } from "../../types/Colors";
import { FigureTypes } from "../../types/Figures";
import { Cell } from "../Cell";
import { Figure } from "./BasicFigure";

export class Bishop extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.figureType = FigureTypes.BISHOP;
	}

	canMove(target: Cell): boolean {
		if (!super.canMove(target)) {
            return false
        }
        if (this.cell.isEmptyDiagonal(target)) {
            return true
        }
        
        return false
	}
}
