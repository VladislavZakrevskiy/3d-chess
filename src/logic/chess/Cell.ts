import { Board } from "./ChessBoard";
import { Colors } from "../types/Colors";
import { Figure } from "./Figures/BasicFigure";
import { v4 } from "uuid";

export class Cell {
	readonly x: number;
	readonly y: number;
	readonly color: Colors;
	figure: Figure | null;
	board: Board;
	available: boolean;
	id: string;

	constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
		this.board = board;
		this.x = x;
		this.y = y;
		this.color = color;
		this.figure = figure;
		this.available = false;
		this.id = v4();
	}

	setFigure(figure: Figure) {
		this.figure = figure;
		this.figure.cell = this;
	}

	addLostFigure(figure: Figure) {
		if (figure.color === Colors.BLACK) {
			this.board.lostBlackFigures.push(figure);
		} else {
			this.board.lostWhiteFigures.push(figure);
		}
	}

	moveFigure(target: Cell) {
		if (this.figure && this.figure?.canMove(target)) {
			this.figure.moveFigure(target);
			if (target.figure) {
				console.log(target.figure);
				this.addLostFigure(target.figure);
			}
			target.setFigure(this.figure);
			this.figure = null;
		}
	}

	isEmpty() {
		return this.figure === null;
	}

	isEnemy(target: Cell) {
		if (target.figure) {
			return this.figure?.color !== target.figure.color;
		}
	}

	isEmptyVertical(target: Cell) {
		if (this.x !== target.x) {
			return false;
		}
		const min = Math.min(this.y, target.y);
		const max = Math.max(this.y, target.y);

		for (let i = min + 1; i < max; i++) {
			if (!this.board.getCell(this.x, i).isEmpty()) {
				return false;
			}
		}

		return true;
	}

	isEmptyGorizontal(target: Cell) {
		if (this.y !== target.y) {
			return false;
		}
		const min = Math.min(this.x, target.x);
		const max = Math.max(this.x, target.x);

		for (let i = min + 1; i < max; i++) {
			if (!this.board.getCell(i, this.y).isEmpty()) {
				return false;
			}
		}

		return true;
	}

	isEmptyDiagonal(target: Cell) {
		const absX = Math.abs(target.x - this.x);
		const absY = Math.abs(target.y - this.y);

		if (absY !== absX) {
			return false;
		}

		const dy = this.y < target.y ? 1 : -1;
		const dx = this.x < target.x ? 1 : -1;

		for (let i = 1; i < absY; i++) {
			if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
				return false;
			}
		}

		return true;
	}
}
