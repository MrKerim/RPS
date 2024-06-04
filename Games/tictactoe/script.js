const decisionTreeAI = (arr, x, y, diff) => {
	// first check if the array is empty

	let check = true;
	for (let row = 0; row < arr.length; row++) {
		for (let col = 0; col < arr[row].length; col++) {
			if (arr[row][col] != null) {
				check = false;
				break;
			}
		}
	}

	if (diff != "easy")
		if (check)
			return [
				[null, null, null],
				[null, x, null],
				[null, null, null],
			];

	// let's check if there is a winning move for the AI
	// check rows

	for (let row = 0; row < arr.length; row++) {
		if (
			arr[row][0] === arr[row][1] &&
			arr[row][0] === x &&
			arr[row][2] === null
		) {
			arr[row][2] = x;
			return arr;
		}
		if (
			arr[row][1] === arr[row][2] &&
			arr[row][1] === x &&
			arr[row][0] === null
		) {
			arr[row][0] = x;
			return arr;
		}
		if (
			arr[row][0] === arr[row][2] &&
			arr[row][0] === x &&
			arr[row][1] === null
		) {
			arr[row][1] = x;
			return arr;
		}
	}

	// check columns
	for (let col = 0; col < arr.length; col++) {
		if (
			arr[0][col] === arr[1][col] &&
			arr[0][col] === x &&
			arr[2][col] === null
		) {
			arr[2][col] = x;
			return arr;
		}
		if (
			arr[1][col] === arr[2][col] &&
			arr[1][col] === x &&
			arr[0][col] === null
		) {
			arr[0][col] = x;
			return arr;
		}
		if (
			arr[0][col] === arr[2][col] &&
			arr[0][col] === x &&
			arr[1][col] === null
		) {
			arr[1][col] = x;
			return arr;
		}
	}

	// check diagonals
	if (arr[0][0] === arr[1][1] && arr[0][0] === x && arr[2][2] === null) {
		arr[2][2] = x;
		return arr;
	}
	if (arr[1][1] === arr[2][2] && arr[1][1] === x && arr[0][0] === null) {
		arr[0][0] = x;
		return arr;
	}
	if (arr[0][0] === arr[2][2] && arr[0][0] === x && arr[1][1] === null) {
		arr[1][1] = x;
		return arr;
	}

	if (arr[0][2] === arr[1][1] && arr[0][2] === x && arr[2][0] === null) {
		arr[2][0] = x;
		return arr;
	}
	if (arr[1][1] === arr[2][0] && arr[1][1] === x && arr[0][2] === null) {
		arr[0][2] = x;
		return arr;
	}
	if (arr[0][2] === arr[2][0] && arr[0][2] === x && arr[1][1] === null) {
		arr[1][1] = x;
		return arr;
	}

	// check if there is a winning move for the player

	for (let row = 0; row < arr.length; row++) {
		if (
			arr[row][0] === arr[row][1] &&
			arr[row][0] === y &&
			arr[row][2] === null
		) {
			arr[row][2] = x;
			return arr;
		}
		if (
			arr[row][1] === arr[row][2] &&
			arr[row][1] === y &&
			arr[row][0] === null
		) {
			arr[row][0] = x;
			return arr;
		}
		if (
			arr[row][0] === arr[row][2] &&
			arr[row][0] === y &&
			arr[row][1] === null
		) {
			arr[row][1] = x;
			return arr;
		}
	}

	// check columns
	for (let col = 0; col < arr.length; col++) {
		if (
			arr[0][col] === arr[1][col] &&
			arr[0][col] === y &&
			arr[2][col] === null
		) {
			arr[2][col] = x;
			return arr;
		}
		if (
			arr[1][col] === arr[2][col] &&
			arr[1][col] === y &&
			arr[0][col] === null
		) {
			arr[0][col] = x;
			return arr;
		}
		if (
			arr[0][col] === arr[2][col] &&
			arr[0][col] === y &&
			arr[1][col] === null
		) {
			arr[1][col] = x;
			return arr;
		}
	}

	// check diagonals
	if (arr[0][0] === arr[1][1] && arr[0][0] === y && arr[2][2] === null) {
		arr[2][2] = x;
		return arr;
	}
	if (arr[1][1] === arr[2][2] && arr[1][1] === y && arr[0][0] === null) {
		arr[0][0] = x;
		return arr;
	}
	if (arr[0][0] === arr[2][2] && arr[0][0] === y && arr[1][1] === null) {
		arr[1][1] = x;
		return arr;
	}

	if (arr[0][2] === arr[1][1] && arr[0][2] === y && arr[2][0] === null) {
		arr[2][0] = x;
		return arr;
	}
	if (arr[1][1] === arr[2][0] && arr[1][1] === y && arr[0][2] === null) {
		arr[0][2] = x;
		return arr;
	}
	if (arr[0][2] === arr[2][0] && arr[0][2] === y && arr[1][1] === null) {
		arr[1][1] = x;
		return arr;
	}

	// if there is no winning move check if the center is empty
	if (arr[1][1] === null) {
		arr[1][1] = x;
		return arr;
	}

	// then we will make the AI play a possible win:
	// meaning if there are one x and two nulls in a row, column or diagonal we will play there

	for (let row = 0; row < arr.length; row++) {
		if (
			arr[row][0] === arr[row][1] &&
			arr[row][0] === null &&
			arr[row][2] === x
		) {
			arr[row][0] = x;
			return arr;
		}
		if (
			arr[row][1] === arr[row][2] &&
			arr[row][1] === null &&
			arr[row][0] === x
		) {
			arr[row][1] = x;
			return arr;
		}
		if (
			arr[row][0] === arr[row][2] &&
			arr[row][0] === null &&
			arr[row][1] === x
		) {
			arr[row][0] = x;
			return arr;
		}
	}

	// check columns
	for (let col = 0; col < arr.length; col++) {
		if (
			arr[0][col] === arr[1][col] &&
			arr[0][col] === null &&
			arr[2][col] === x
		) {
			arr[0][col] = x;
			return arr;
		}
		if (
			arr[1][col] === arr[2][col] &&
			arr[1][col] === null &&
			arr[0][col] === x
		) {
			arr[1][col] = x;
			return arr;
		}
		if (
			arr[0][col] === arr[2][col] &&
			arr[0][col] === null &&
			arr[1][col] === x
		) {
			arr[0][col] = x;
			return arr;
		}
	}

	// check diagonals
	if (arr[0][0] === arr[1][1] && arr[0][0] === null && arr[2][2] === x) {
		arr[1][1] = x;
		return arr;
	}
	if (arr[1][1] === arr[2][2] && arr[1][1] === null && arr[0][0] === x) {
		arr[1][1] = x;
		return arr;
	}
	if (arr[0][0] === arr[2][2] && arr[0][0] === null && arr[1][1] === x) {
		arr[0][0] = x;
		return arr;
	}

	if (arr[0][2] === arr[1][1] && arr[0][2] === null && arr[2][0] === x) {
		arr[1][1] = x;
		return arr;
	}
	if (arr[1][1] === arr[2][0] && arr[1][1] === null && arr[0][2] === x) {
		arr[1][1] = x;
		return arr;
	}
	if (arr[0][2] === arr[2][0] && arr[0][2] === null && arr[1][1] === x) {
		arr[0][2] = x;
		return arr;
	}

	if (diff == "hard") {
		if (
			arr ==
			[
				[null, null, null],
				[null, y, null],
				[null, null, null],
			]
		)
			return [
				[x, null, null],
				[null, y, null],
				[null, null, null],
			];
	}

	// if there is no possible win we will play in a random empty cell

	for (let row = 0; row < arr.length; row++) {
		for (let col = 0; col < arr[row].length; col++) {
			if (arr[row][col] === null) {
				arr[row][col] = x;
				return arr;
			}
		}
	}
};

let gameStatus = 1;

let game = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

const checkWinner = (game) => {
	for (let row = 0; row < game.length; row++) {
		if (
			game[row][0] == game[row][1] &&
			game[row][1] == game[row][2] &&
			game[row][0] != null
		) {
			return game[row][0];
		}
	}
	for (let column = 0; column < game[0].length; column++) {
		if (
			game[0][column] == game[1][column] &&
			game[1][column] == game[2][column] &&
			game[0][column] != null
		) {
			return game[0][column];
		}
	}
	if (
		game[0][0] == game[1][1] &&
		game[1][1] == game[2][2] &&
		game[0][0] != null
	) {
		return game[0][0];
	}
	if (
		game[0][2] == game[1][1] &&
		game[1][1] == game[2][0] &&
		game[0][2] != null
	) {
		return game[0][2];
	}

	let draw = true;
	for (let row = 0; row < game.length; row++) {
		for (let col = 0; col < game[row].length; col++) {
			if (game[row][col] == null) {
				draw = false;
				break;
			}
		}
	}

	if (draw) return "draw";
	return null;
};

let player = "X";

const resetGame = () => {
	game = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];
	document.querySelectorAll(".gameContainer div").forEach((cell) => {
		cell.innerHTML = "";
		cell.style.color = "#000000";
	});
	gameStatus = 1;
};

document.querySelectorAll(".gameContainer div").forEach((cell) => {
	cell.addEventListener("click", () => {
		id = cell.id - 1;
		row = Math.floor(id / 3);
		col = id % 3;
		if (game[row][col] == null && gameStatus == 1) {
			game[row][col] = player;

			let winCheck = checkWinner(game);
			if (winCheck != null && gameStatus == 1) {
				gameStatus = 0;
				setTimeout(() => {
					if (winCheck == "draw") alert("It's a draw!");
					else alert(winCheck + " wins!");

					setTimeout(() => {
						resetGame();
					}, 3000);
				}, 1000);
			}

			game = decisionTreeAI(game, "O", "X", "hard");
			document.querySelectorAll(".gameContainer div").forEach((cell) => {
				id = cell.id - 1;
				row = Math.floor(id / 3);
				col = id % 3;

				console.log(game);

				if (game[row][col] == "X") {
					cell.style.color = "#ff0000";
					cell.innerHTML = "X";
					console.log("X");
				}
				if (game[row][col] == "O") {
					cell.style.color = "#0000ff";
					cell.innerHTML = "O";
				}
			});
		}

		let winCheck = checkWinner(game);
		if (winCheck != null && gameStatus == 1) {
			gameStatus = 0;
			setTimeout(() => {
				if (winCheck == "draw") alert("It's a draw!");
				else alert(winCheck + " wins!");
			}, 1000);

			setTimeout(() => {
				resetGame();
			}, 3000);
		}
	});
});
