let gameStatus = 1;
let gameScores = { win: 0, draw: 0, lose: 0 };
const realPlayer = "x";
const computerPlayer = "o";
let board = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
];

const resetButton = document.querySelector(".resetButton");
const scoreBoard = document.querySelector(".stats");

function getEmptyCellsFromBoard(inpBoard = board) {
	const emptyCells = [];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (inpBoard[i][j] == "") {
				emptyCells.push({ row: i, col: j });
			}
		}
	}
	return emptyCells;
}

function updateScoreBoard(inputPlayer) {
	if (inputPlayer == realPlayer) gameScores.win++;
	else if (inputPlayer == "draw") gameScores.draw++;
	else gameScores.lose++;

	setTimeout(() => {
		const resultDiv = document.createElement("div");
		resultDiv.classList.add("result");
		resultDiv.innerHTML = inputPlayer;
		document.querySelector(".gameContainer").appendChild(resultDiv);

		scoreBoard.querySelector(".winCount span").innerHTML = gameScores.win;
		scoreBoard.querySelector(".drawCount span").innerHTML = gameScores.draw;
		scoreBoard.querySelector(".loseCount span").innerHTML = gameScores.lose;
	}, 500);
}

function drawX(cell) {
	if (!cell.querySelector(".x-marker")) {
		const xMarker = document.createElement("div");
		xMarker.classList.add("x-marker");
		cell.appendChild(xMarker);

		const id = cell.id - 0;
		const row = Math.floor(id / 3);
		const col = id % 3;
		board[row][col] = realPlayer;
	}
}

function drawO(cell) {
	if (!cell.querySelector(".o-marker")) {
		const oMarker = document.createElement("div");
		oMarker.classList.add("o-marker");
		cell.appendChild(oMarker);

		const id = cell.id - 0;
		const row = Math.floor(id / 3);
		const col = id % 3;
		board[row][col] = computerPlayer;
	}
}

function deleteO(cell) {
	const id = cell.id - 0;
	const row = Math.floor(id / 3);
	const col = id % 3;
	board[row][col] = "";

	const oMarker = cell.querySelector(".o-marker");
	if (oMarker) {
		oMarker.remove();
	}
}

function deleteX(cell) {
	const id = cell.id - 0;
	const row = Math.floor(id / 3);
	const col = id % 3;
	board[row][col] = "";

	const xMarker = cell.querySelector(".x-marker");
	if (xMarker) {
		xMarker.remove();
	}
}

function checkWinByDOM() {
	// let's check the rows and columns
	const rowColumn = ["row", "col"];
	for (let j = 0; j < 2; j++) {
		for (let i = 0; i < 3; i++) {
			const rowColumnI = document.querySelectorAll("." + rowColumn[j] + i);
			if (
				rowColumnI[0].innerHTML == rowColumnI[1].innerHTML &&
				rowColumnI[1].innerHTML == rowColumnI[2].innerHTML &&
				rowColumnI[1].innerHTML != ""
			)
				return {
					direction: rowColumn[j],
					cell: rowColumnI[1],
					player: rowColumnI[1].innerHTML[12],
				};
		}
	}

	// let's check the dioganals
	let leftDiogonal = [];
	for (let i = 0; i < 3; i++) {
		leftDiogonal.push(document.querySelector(".row" + i + ".col" + i));
	}

	let rightDiogonal = [];
	for (let i = 0; i < 3; i++) {
		rightDiogonal.push(document.querySelector(".row" + i + ".col" + (2 - i)));
	}

	const diogonalI = [
		{ direction: "leftDiogonal", arr: leftDiogonal },
		{ direction: "rightDiogonal", arr: rightDiogonal },
	];

	for (let i = 0; i < 2; i++) {
		if (
			diogonalI[i].arr[0].innerHTML == diogonalI[i].arr[1].innerHTML &&
			diogonalI[i].arr[1].innerHTML == diogonalI[i].arr[2].innerHTML &&
			diogonalI[i].arr[1].innerHTML != ""
		) {
			return {
				direction: diogonalI[i].direction,
				cell: diogonalI[i].arr[1],
				player: diogonalI[i].arr[1].innerHTML[12],
			};
		}
	}

	// let's check if it's a draw
	let draw = 1;
	document.querySelectorAll(".box").forEach((cell) => {
		if (!cell.classList.contains("x") && !cell.classList.contains("o")) {
			draw = 0;
		}
	});
	if (draw) return "draw";

	return "no win";
}

function handleWin(inputObject) {
	if (inputObject == "no win") return;
	if (inputObject == "draw") {
		updateScoreBoard("draw");
		gameStatus = 0;

		setTimeout(resetGameContainerByDOM, 5000);
	}

	const winLineDiv = document.createElement("div");
	winLineDiv.classList.add("winLine" + inputObject.direction);
	inputObject.cell.appendChild(winLineDiv);
	updateScoreBoard(inputObject.player);
	gameStatus = 0;

	setTimeout(resetGameContainerByDOM, 3000);
}

function resetGameContainerByDOM(hardReset = false) {
	console.log("resetGameContainerByDOM");

	if (hardReset) {
		/*
		gameScores = { win: 0, draw: 0, lose: 0 };
		scoreBoard.querySelector(".winCount span").innerHTML = gameScores.win;
		scoreBoard.querySelector(".drawCount span").innerHTML = gameScores.draw;
		scoreBoard.querySelector(".loseCount span").innerHTML = gameScores.lose;
		*/
		window.location.reload();
	}
	gameStatus = 1;
	board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];

	document.querySelector(
		".gameContainer"
	).innerHTML = `<div class="box row0 col0" id="0"></div>
	<div class="box row0 col1" id="1"></div>
	<div class="box row0 col2" id="2"></div>
	<div class="box row1 col0" id="3"></div>
	<div class="box row1 col1" id="4"></div>
	<div class="box row1 col2" id="5"></div>
	<div class="box row2 col0" id="6"></div>
	<div class="box row2 col1" id="7"></div>
	<div class="box row2 col2" id="8"></div>`;

	startGame();
}

function checkWinByBoard(inputBoard) {
	// let's check the rows and columns
	const rowColumn = ["row", "col"];
	for (let j = 0; j < 2; j++) {
		for (let i = 0; i < 3; i++) {
			if (
				inputBoard[i][0] == inputBoard[i][1] &&
				inputBoard[i][1] == inputBoard[i][2] &&
				inputBoard[i][1] != ""
			)
				return {
					player: inputBoard[i][1],
				};
		}
	}

	// let's check the dioganals
	const leftDiogonal = [inputBoard[0][0], inputBoard[1][1], inputBoard[2][2]];
	const rightDiogonal = [inputBoard[0][2], inputBoard[1][1], inputBoard[2][0]];

	const diogonalI = [{ arr: leftDiogonal }, { arr: rightDiogonal }];

	for (let i = 0; i < 2; i++) {
		if (
			diogonalI[i].arr[0] == diogonalI[i].arr[1] &&
			diogonalI[i].arr[1] == diogonalI[i].arr[2] &&
			diogonalI[i].arr[1] != ""
		) {
			return {
				player: diogonalI[i].arr[1],
			};
		}
	}

	// let's check if it's a draw
	let draw = 1;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (inputBoard[i][j] == "") {
				draw = 0;
			}
		}
	}
	if (draw) return "draw";

	return "no win";
}
function minimax(maximizing, inputBoard, depth, max_depth) {
	if (depth == max_depth) return 0;
	const result = checkWinByBoard(inputBoard);

	// Base Cases

	if (result != "no win") {
		if (result == "draw") return 0;
		if (result.player == computerPlayer) return 1;
		if (result.player == realPlayer) return -1;
	}

	if (maximizing) {
		let best = -Infinity;
		const emptyCells = getEmptyCellsFromBoard(inputBoard);

		emptyCells.forEach((cell) => {
			inputBoard[cell.row][cell.col] = computerPlayer;
			best = Math.max(best, minimax(false, inputBoard, depth + 1, max_depth));
			inputBoard[cell.row][cell.col] = "";
		});

		return best;
	} else {
		let best = Infinity;
		const emptyCells = getEmptyCellsFromBoard(inputBoard);

		emptyCells.forEach((cell) => {
			inputBoard[cell.row][cell.col] = realPlayer;
			best = Math.min(best, minimax(true, inputBoard, depth + 1, max_depth));

			console.log("best", best);
			for (let i = 0; i < 3; i++) {
				console.log(inputBoard[i]);
			}

			inputBoard[cell.row][cell.col] = "";
		});

		return best;
	}
}

function startGame() {
	document.querySelectorAll(".box").forEach((cell) => {
		cell.addEventListener("click", () => {
			if (
				!gameStatus ||
				cell.classList.contains("x") ||
				cell.classList.contains("o")
			) {
				return;
			}

			// player's turn
			drawX(cell);
			cell.classList.add("x");

			handleWin(checkWinByDOM());

			if (!gameStatus) return;

			// computer's turn
			let best = { score: -Infinity, move: { row: null, col: null } };
			const emptyCells = getEmptyCellsFromBoard();

			emptyCells.forEach((cell) => {
				board[cell.row][cell.col] = computerPlayer;
				const score = minimax(false, board, 0, 1);
				board[cell.row][cell.col] = "";
				console.log(cell, score, best.score);
				if (score > best.score) {
					best.score = score;
					best.move = cell;
				}
			});

			const selectedComputerCell = document.getElementById(
				best.move.row * 3 + best.move.col
			);
			gameStatus = 0;
			setTimeout(() => {
				drawO(selectedComputerCell);
				selectedComputerCell.classList.add("o");

				handleWin(checkWinByDOM());
				gameStatus = 1;
			}, 500);
		});
	});
}

window.addEventListener("DOMContentLoaded", startGame);

resetButton.addEventListener("click", () => {
	resetGameContainerByDOM(true);
});
