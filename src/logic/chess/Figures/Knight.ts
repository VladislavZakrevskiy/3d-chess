import { Figure } from "./BasicFigure";
import { Colors } from "../../types/Colors";
import { Cell } from "../Cell";
import { FigureTypes } from "../../types/Figures";

export class Knight extends Figure {
    constructor(color: Colors, cell: Cell) {
        super (color, cell)
        this.figureType = FigureTypes.KNIGHT
    }

    canMove(target: Cell): boolean {
		if (!super.canMove(target)) {
            return false
        }

        const dx = Math.abs(this.cell.x - target.x)
        const dy = Math.abs(this.cell.y - target.y)

        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1)

        return true
	}
}