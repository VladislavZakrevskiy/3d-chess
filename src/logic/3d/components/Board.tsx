import React, { FC, useEffect, useState } from "react";
import { Board } from "../../chess/ChessBoard";
import { Player } from "../../chess/Player";
import { Cell } from "../../chess/Cell";
import { CellComponent } from "./Cell";

interface BoardProps {
	board: Board;
	setBoard: (board: Board) => void;
	currentPlayer: Player | null;
	swapPlayer: () => void;
}

export const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {
	const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

	function click(cell: Cell) {
		console.log(board);
		if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
			selectedCell.moveFigure(cell);
			swapPlayer();
			setSelectedCell(null);
			updateBoard();
		} else {
			if (cell.figure?.color === currentPlayer?.color) {
				setSelectedCell(cell);
			}
		}
	}

	useEffect(() => {
		highlightCells();
	}, [selectedCell]);

	function highlightCells() {
		board.highlightCells(selectedCell);
		updateBoard();
	}

	function updateBoard() {
		const newBoard = board.getCopyBoard();
		setBoard(newBoard);
	}

	return board.cells.map((row, z) => (
		<React.Fragment key={z}>
			{row.map((cell, x) => (
				<CellComponent
					x={x - 4}
					z={z - 4}
					click={click}
					cell={cell}
					key={cell.id}
					selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
				/>
			))}
		</React.Fragment>
	));
};
