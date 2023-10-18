import { Figure } from "./BasicFigure";
import { Colors } from "../../types/Colors";
import { Cell } from "../Cell";
import { FigureTypes } from "../../types/Figures";

export class Rook extends Figure {
    constructor(color: Colors, cell: Cell) {
        super (color, cell)
        this.figureType = FigureTypes.ROOK
    }

    canMove(target: Cell): boolean {
		if (!super.canMove(target)) {
            return false
        }
        if(this.cell.isEmptyVertical(target)) {
            return true
        }
        if (this.cell.isEmptyGorizontal(target)) {
            return true
        }

        return false
	}
}