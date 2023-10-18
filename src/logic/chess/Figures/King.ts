import { Figure } from "./BasicFigure";
import { Colors } from "../../types/Colors";
import { Cell } from "../Cell";
import { FigureTypes } from "../../types/Figures";

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super (color, cell)
        this.figureType = FigureTypes.KING
    }

    canMove(target: Cell): boolean {
		if (!super.canMove(target)) {
            return false
        }

        const absX = Math.abs(this.cell.x - target.x)
        const absY = Math.abs(this.cell.y - target.y)

        return (absX === 1 && absY === 1)
	}
}