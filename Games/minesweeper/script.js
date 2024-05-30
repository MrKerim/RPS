let currentUser = "Başak Çakir";
let diff = "Easy";

const dropdown = document.getElementById("dropdown");

let gameOver = false;
let firstMove = true;
let flagNumber = 20;
const flagSpan = document.querySelector("#flags span");

let mineFind = 0;

let timer = 0;
const timerSpan = document.querySelector("#timer span");

const n = 10;
const m = 10;
let mineNumber = 12;
let minePlace = [];
let gridSize = 60;
let prevHighlight = [];

let flagRegion = [];
let notPermitted = [];

const maxMineFoundStat = document.querySelector("#maxMineFound span");
const maxTimerCount = document.querySelector("#timeTaken span");
const maxWinner = document.getElementById("topWinner");

//Audio
let digAudio = new Audio("source/dig_sound.mp3");
digAudio.preload = "auto";

let winCreditSound = new Audio("source/happy_nation_cut.mp3");
winCreditSound.preload = "auto";

let tntAudio = new Audio("source/tnt_sound.mp3");
digAudio.preload = "auto";

let flagAudio = new Audio("source/flag_sound.mp3");
digAudio.preload = "auto";

const countFinalMineNumber = () => {
	for (let i = 0; i < mineNumber; i++) {
		let current = minePlace[i];
		let check = false;
		for (let j = 0; j < flagRegion.length; j++) {
			if (
				flagRegion[j].x == current.x_n * gridSize &&
				flagRegion[j].y == current.y_n * gridSize
			) {
				check = true;
				break;
			}
		}
		if (check) {
			mineFind++;
		}
	}
};

const checkGameWin = () => {
	countFinalMineNumber();

	if (mineFind == mineNumber) {
		let cnt = notPermitted.length;
		if (flagRegion.length == mineNumber) winCredits();
	}
	mineFind = 0;
};

const winCredits = () => {
	gameOver = true;
	// Resetting
	setTimeout(() => {
		gameOver = false;
		firstMove = true;
		flagNumber = 20;
		mineFind = 0;

		timer = 0;

		minePlace = [];
		prevHighlight = [];
		flagRegion = [];
		notPermitted = [];
		startScreen();
	}, 53000);

	setTimeout(() => {
		winCreditSound.currentTime = 0;
		winCreditSound.play();

		if (mineNumber >= maxMineFoundStat.innerHTML) {
			maxMineFoundStat.innerHTML = mineNumber;

			maxTimerCount.innerHTML = timer;

			maxWinner.innerHTML = currentUser;
		}

		canvas.fillStyle = "#1e1e1e";
		canvas.fillRect(0, 0, 600, 600);
		canvas.fillStyle = "#ffffff";
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < m; j += 2) {
				canvas.fillRect(
					i * gridSize,
					(i % 2) * gridSize + j * gridSize,
					gridSize,
					gridSize
				);
			}
		}
	}, 1000);
};

const getRandomHexColor = () => {
	const r = Math.floor(Math.random() * 256)
		.toString(16)
		.padStart(2, "0");
	const g = Math.floor(Math.random() * 256)
		.toString(16)
		.padStart(2, "0");
	const b = Math.floor(Math.random() * 256)
		.toString(16)
		.padStart(2, "0");
	return `#${r}${g}${b}`;
};

const darkenColor = (hex, percent) => {
	const num = parseInt(hex.slice(1), 16);

	let r = (num >> 16) & 255; // Extract red
	let g = (num >> 8) & 255; // Extract green
	let b = num & 255; // Extract blue

	r = Math.floor(r * (1 - percent));
	g = Math.floor(g * (1 - percent));
	b = Math.floor(b * (1 - percent));

	r = r.toString(16).padStart(2, "0");
	g = g.toString(16).padStart(2, "0");
	b = b.toString(16).padStart(2, "0");
	return `#${r}${g}${b}`;
};

const numberColor = (x) => {
	if (x == 1) return "#1876d2";
	if (x == 2) return "#388e3c";
	if (x == 3) return "#d3302f";
	if (x == 4) return "#7b1ea2";
	if (x == 5) return "#ff8f00";
	if (x == 6) return "#c32fa3";
	if (x == 7) return "#ff9c01";
	if (x == 8) return "#10ba00";
};
let grid = [];

function drawCircle(x, y, radius, color) {
	canvas.beginPath();
	canvas.arc(x, y, radius, 0, 2 * Math.PI, false);
	canvas.fillStyle = color;
	canvas.fill();
	canvas.lineWidth = 0.5;
	canvas.strokeStyle = color;
	canvas.stroke();
}

const getCanvasXY = (x, y) => {
	const rect = document.getElementById("canvas").getBoundingClientRect();
	x = x - rect.left;
	y = y - rect.top;
	x = x - (x % gridSize);
	y = y - (y % gridSize);
	return { x: x, y: y };
};

const getNeighbours = (x, y) => {
	let neighbours = [];
	if (x > 0) neighbours.push({ x: x - 1, y: y });
	if (x < n - 1) neighbours.push({ x: x + 1, y: y });
	if (y > 0) neighbours.push({ x: x, y: y - 1 });
	if (y < m - 1) neighbours.push({ x: x, y: y + 1 });
	if (x > 0 && y > 0) neighbours.push({ x: x - 1, y: y - 1 });
	if (x < n - 1 && y < m - 1) neighbours.push({ x: x + 1, y: y + 1 });
	if (x > 0 && y < m - 1) neighbours.push({ x: x - 1, y: y + 1 });
	if (x < n - 1 && y > 0) neighbours.push({ x: x + 1, y: y - 1 });
	return neighbours;
};
const initilizeGrid = () => {
	grid = [];
	for (let i = 0; i < mineNumber; i++) {
		let check = true;
		let current;
		while (check) {
			check = false; // Reset check to false at the start of each iteration
			current = {
				x_n: Math.floor(Math.random() * n),
				y_n: Math.floor(Math.random() * m),
			};
			for (let j = 0; j < minePlace.length; j++) {
				if (
					minePlace[j].x_n == current.x_n &&
					minePlace[j].y_n == current.y_n
				) {
					check = true;
					break; // Exit the for loop if a duplicate is found
				}
			}
		}
		minePlace.push(current);
	}

	for (let i = 0; i < n; i++) {
		grid.push([]);
		for (let j = 0; j < m; j++) {
			grid[i].push(0);
		}
	}

	for (let i = 0; i < mineNumber; i++) {
		grid[minePlace[i].y_n][minePlace[i].x_n] = -1;
	}

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < m; j++) {
			if (grid[i][j] == -1) continue;
			let mineNumberInNeighbours = 0;
			let neighbours = getNeighbours(i, j);
			for (let k = 0; k < neighbours.length; k++) {
				if (grid[neighbours[k].x][neighbours[k].y] == -1)
					mineNumberInNeighbours++;
			}
			grid[i][j] = mineNumberInNeighbours;
		}
	}

	//
	// Debug prupose
	for (let i = 0; i < n; i++) {
		console.log(grid[i]);
	}
	//
	//
};

const canvas = document.getElementById("canvas").getContext("2d");

const startScreen = () => {
	timerSpan.innerHTML = 0;
	flagSpan.innerHTML = 20;
	initilizeGrid();

	canvas.fillStyle = "#a2d148";
	canvas.fillRect(0, 0, 600, 600);
	canvas.fillStyle = "#aad750";
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < m; j += 2) {
			canvas.fillRect(
				i * gridSize,
				(i % 2) * gridSize + j * gridSize,
				gridSize,
				gridSize
			);
		}
	}
};

const blackOrWhite = (x, y) => {
	if (x % (gridSize * 2) < gridSize) {
		if (y % (gridSize * 2) < gridSize) return 0;
		else return 1;
	} else {
		if (y % (gridSize * 2) < gridSize) return 1;
		else return 0;
	}
};

const higlightSquare = (x, y) => {
	canvas.fillStyle = "#b9dd76";
	canvas.fillRect(x, y, gridSize, gridSize);
};

const gameOverScreen = (x, y) => {
	// Resetting
	setTimeout(() => {
		timerSpan.innerHTML = 0;
		flagSpan.innerHTML = 20;
		gameOver = false;
		firstMove = true;
		flagNumber = 20;
		mineFind = 0;

		timer = 0;

		minePlace = [];
		prevHighlight = [];
		flagRegion = [];
		notPermitted = [];
		startScreen();
	}, mineNumber * 500 + 1000 + 5000);

	gameOver = true;
	countFinalMineNumber();
	if (mineFind >= maxMineFoundStat.innerHTML) {
		maxMineFoundStat.innerHTML = mineFind;
		maxTimerCount.innerHTML = timer;
		maxWinner.innerHTML = currentUser;
	}

	for (let i = 0; i < mineNumber; i++) {
		if (minePlace[i].x_n == x && minePlace[i].y_n == y) {
			let temp = minePlace[i];
			minePlace[i] = minePlace[0];
			minePlace[0] = temp;
		}
	}

	const handleMineExplosion = (i) => {
		tntAudio.currentTime = 0;
		tntAudio.play();

		let x = minePlace[i].x_n * gridSize;
		let y = minePlace[i].y_n * gridSize;

		let color = getRandomHexColor();
		let darkerColor = darkenColor(color, 0.2);

		canvas.fillStyle = color;
		canvas.fillRect(x, y, gridSize, gridSize);
		drawCircle(x + gridSize / 2, y + gridSize / 2, gridSize / 4, darkerColor);
		notPermitted.push({ x: x, y: y });
	};

	// Loop through each mine and set a timeout for its explosion
	for (let i = 0; i < mineNumber; i++) {
		setTimeout(() => handleMineExplosion(i), i * 500); // 0.5 seconds gap
	}

	setTimeout(() => {
		canvas.fillStyle = "#1e1e1e";
		canvas.fillRect(0, 0, 600, 600);

		canvas.font = "40px Times New Roman";
		canvas.fillStyle = "#ffffff";
		canvas.fillText("Game Over", 200, 200);

		countFinalMineNumber();

		canvas.font = "30px Times New Roman";
		canvas.fillStyle = "#ffffff";
		canvas.fillText(`You found ${mineFind} mines`, 180, 300);
		canvas.fillText(`in ${timer} seconds`, 225, 350);
	}, mineNumber * 500 + 1000);
};

document
	.getElementById("canvas")
	.addEventListener("mousemove", function (event) {
		if (gameOver) return;
		({ x, y } = getCanvasXY(event.clientX, event.clientY));

		let check = true;
		for (let i = 0; i < notPermitted.length; i++) {
			if (notPermitted[i].x == x && notPermitted[i].y == y) {
				check = false;
			}
		}
		if (check) {
			higlightSquare(x, y);
			let color = "";
			if (blackOrWhite(x, y) == 0) color = "#aad750";
			else color = "#a2d148";
			prevHighlight.push({ x: x, y: y, color: color });
		}

		for (let i = 0; i < prevHighlight.length; i++) {
			if (prevHighlight[i].x == x && prevHighlight[i].y == y) {
			} else {
				let check = true;
				for (let j = 0; j < notPermitted.length; j++) {
					if (
						notPermitted[j].x == prevHighlight[i].x &&
						notPermitted[j].y == prevHighlight[i].y
					) {
						check = false;
					}
				}

				if (check) {
					canvas.fillStyle = prevHighlight[i].color;
					canvas.fillRect(
						prevHighlight[i].x,
						prevHighlight[i].y,
						gridSize,
						gridSize
					);
				}
				prevHighlight.splice(i, 1);
				i--;
			}
		}
	});

startScreen();

const BFS = (x, y) => {
	let visited = [];
	for (let i = 0; i < n; i++) {
		visited.push([]);
		for (let j = 0; j < m; j++) {
			visited[i].push(false);
		}
	}

	let queue = [];
	queue.push({ x: x, y: y });
	visited[y][x] = true;

	if (blackOrWhite(x * gridSize, y * gridSize) == 0)
		canvas.fillStyle = "#e4c19f";
	else canvas.fillStyle = "#d7b899";
	canvas.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
	notPermitted.push({
		x: x * gridSize,
		y: y * gridSize,
	});

	if (grid[y][x] != 0) {
		canvas.font = "30px Times New Roman";
		canvas.fillStyle = numberColor(grid[y][x]);
		// Draw filled text
		canvas.fillText(
			grid[y][x],
			x * gridSize + (gridSize / 2) * 0.8,
			y * gridSize + (gridSize / 2) * 1.3
		);
		return;
	}

	while (queue.length > 0) {
		let current = queue.shift();
		let neighbours = getNeighbours(current.x, current.y);
		for (let i = 0; i < neighbours.length; i++) {
			if (visited[neighbours[i].y][neighbours[i].x]) continue;
			// check if the region is not permitted
			let check = true;
			for (let j = 0; j < notPermitted.length; j++) {
				if (
					notPermitted[j].x == neighbours[i].x * gridSize &&
					notPermitted[j].y == neighbours[i].y * gridSize
				) {
					check = false;
				}
			}
			if (!check) continue;

			if (grid[neighbours[i].y][neighbours[i].x] == -1) continue;
			if (grid[neighbours[i].y][neighbours[i].x] == 0) {
				queue.push({ x: neighbours[i].x, y: neighbours[i].y });
				visited[neighbours[i].y][neighbours[i].x] = true;

				if (
					blackOrWhite(
						neighbours[i].x * gridSize,
						neighbours[i].y * gridSize
					) == 0
				)
					canvas.fillStyle = "#e4c19f";
				else canvas.fillStyle = "#d7b899";
				canvas.fillRect(
					neighbours[i].x * gridSize,
					neighbours[i].y * gridSize,
					gridSize,
					gridSize
				);
				notPermitted.push({
					x: neighbours[i].x * gridSize,
					y: neighbours[i].y * gridSize,
				});
			} else if (grid[neighbours[i].y][neighbours[i].x] != -1) {
				visited[neighbours[i].y][neighbours[i].x] = true;

				if (
					blackOrWhite(
						neighbours[i].x * gridSize,
						neighbours[i].y * gridSize
					) == 0
				)
					canvas.fillStyle = "#e4c19f";
				else canvas.fillStyle = "#d7b899";
				canvas.fillRect(
					neighbours[i].x * gridSize,
					neighbours[i].y * gridSize,
					gridSize,
					gridSize
				);
				notPermitted.push({
					x: neighbours[i].x * gridSize,
					y: neighbours[i].y * gridSize,
				});
				canvas.font = "30px Times New Roman";
				canvas.fillStyle = numberColor(grid[neighbours[i].y][neighbours[i].x]);

				// Draw filled text
				canvas.fillText(
					grid[neighbours[i].y][neighbours[i].x],
					neighbours[i].x * gridSize + (gridSize / 2) * 0.8,
					neighbours[i].y * gridSize + (gridSize / 2) * 1.3
				);
			}
		}
	}
};

// This function sets the border of the notPermitted regions to a different color
const borderControl = () => {
	const lineW = 4;
	let firstToErase = [];
	let seconToDraw = [];

	for (let i = 0; i < notPermitted.length; i++) {
		let check = true;
		for (let j = 0; j < flagRegion.length; j++) {
			if (
				notPermitted[i].x == flagRegion[j].x &&
				notPermitted[i].y == flagRegion[j].y
			) {
				check = false;
				break;
			}
		}

		if (!check) continue;
		// Now we have a digged region meaning it is not flagged however not permitted
		// So we need to set the border color to a different color if it has a permitted neighbour
		// if not we will set it to the same color as the region
		let x = notPermitted[i].x;
		let y = notPermitted[i].y;

		let neighbours = [];
		if (x > 0) neighbours.push({ x: x - gridSize, y: y, way: "left" });
		if (x < (n - 1) * gridSize)
			neighbours.push({ x: x + gridSize, y: y, way: "right" });
		if (y > 0) neighbours.push({ x: x, y: y - gridSize, way: "up" });
		if (y < (m - 1) * gridSize)
			neighbours.push({ x: x, y: y + gridSize, way: "down" });

		for (let j = 0; j < neighbours.length; j++) {
			// Chek if the neighbor is not notPermitted or a flagRegion
			let check = true;
			for (let k = 0; k < notPermitted.length; k++) {
				if (
					notPermitted[k].x == neighbours[j].x &&
					notPermitted[k].y == neighbours[j].y
				) {
					check = false;
					break;
				}
			}

			if (!check) {
				for (let u = 0; u < flagRegion.length; u++) {
					if (
						flagRegion[u].x == neighbours[j].x &&
						flagRegion[u].y == neighbours[j].y
					) {
						check = true;
					}
				}
			}

			if (check) {
				// If the check is true wee need to set the border color to a different color
				seconToDraw.push(neighbours[j]);
			} else {
				firstToErase.push(neighbours[j]);
			}
		}
	}

	for (let j = 0; j < firstToErase.length; j++) {
		canvas.lineWidth = lineW;
		if (firstToErase[j].way == "left") {
			if (blackOrWhite(firstToErase[j].x + gridSize, firstToErase[j].y) == 0)
				canvas.strokeStyle = "#e4c19f";
			else canvas.strokeStyle = "#d7b899";

			canvas.beginPath();
			canvas.moveTo(
				firstToErase[j].x + gridSize + lineW / 2,
				firstToErase[j].y
			);
			canvas.lineTo(
				firstToErase[j].x + gridSize + lineW / 2,
				firstToErase[j].y + gridSize
			);
			canvas.stroke();
		} else if (firstToErase[j].way == "right") {
			if (blackOrWhite(firstToErase[j].x - gridSize, firstToErase[j].y) == 0)
				canvas.strokeStyle = "#e4c19f";
			else canvas.strokeStyle = "#d7b899";

			canvas.beginPath();
			canvas.moveTo(firstToErase[j].x - lineW / 2, firstToErase[j].y);
			canvas.lineTo(
				firstToErase[j].x - lineW / 2,
				firstToErase[j].y + gridSize
			);
			canvas.stroke();
		} else if (firstToErase[j].way == "up") {
			if (blackOrWhite(firstToErase[j].x, firstToErase[j].y + gridSize) == 0)
				canvas.strokeStyle = "#e4c19f";
			else canvas.strokeStyle = "#d7b899";

			canvas.beginPath();
			canvas.moveTo(
				firstToErase[j].x,
				firstToErase[j].y + gridSize + lineW / 2
			);
			canvas.lineTo(
				firstToErase[j].x + gridSize,
				firstToErase[j].y + gridSize + lineW / 2
			);
			canvas.stroke();
		} else if (firstToErase[j].way == "down") {
			if (blackOrWhite(firstToErase[j].x, firstToErase[j].y - gridSize) == 0)
				canvas.strokeStyle = "#e4c19f";
			else canvas.strokeStyle = "#d7b899";
			canvas.beginPath();
			canvas.moveTo(firstToErase[j].x, firstToErase[j].y - lineW / 2);
			canvas.lineTo(
				firstToErase[j].x + gridSize,
				firstToErase[j].y - lineW / 2
			);
			canvas.stroke();
		}
	}

	for (let j = 0; j < seconToDraw.length; j++) {
		canvas.strokeStyle = "#86af3a";

		canvas.lineWidth = lineW;
		if (seconToDraw[j].way == "left") {
			canvas.beginPath();
			canvas.moveTo(seconToDraw[j].x + gridSize + lineW / 2, seconToDraw[j].y);
			canvas.lineTo(
				seconToDraw[j].x + gridSize + lineW / 2,
				seconToDraw[j].y + gridSize
			);
			canvas.stroke();
		} else if (seconToDraw[j].way == "right") {
			canvas.beginPath();
			canvas.moveTo(seconToDraw[j].x - lineW / 2, seconToDraw[j].y);
			canvas.lineTo(seconToDraw[j].x - lineW / 2, seconToDraw[j].y + gridSize);
			canvas.stroke();
		} else if (seconToDraw[j].way == "up") {
			canvas.beginPath();
			canvas.moveTo(seconToDraw[j].x, seconToDraw[j].y + gridSize + lineW / 2);
			canvas.lineTo(
				seconToDraw[j].x + gridSize,
				seconToDraw[j].y + gridSize + lineW / 2
			);
			canvas.stroke();
		} else if (seconToDraw[j].way == "down") {
			canvas.beginPath();
			canvas.moveTo(seconToDraw[j].x, seconToDraw[j].y - lineW / 2);
			canvas.lineTo(seconToDraw[j].x + gridSize, seconToDraw[j].y - lineW / 2);
			canvas.stroke();
		}
	}
};

// Normal Clik event
document.getElementById("canvas").addEventListener("click", function (event) {
	if (gameOver) return;
	({ x, y } = getCanvasXY(event.clientX, event.clientY));

	let check = true;
	for (let i = 0; i < notPermitted.length; i++) {
		if (notPermitted[i].x == x && notPermitted[i].y == y) {
			check = false;
		}
	}
	if (!check) return;
	//
	//Debug purpose
	console.log("clicked on region: ", x, y);
	if (grid[y / gridSize][x / gridSize] == -1) console.log("Game Over");
	else console.log("Safe");
	//
	//

	if (grid[y / gridSize][x / gridSize] != -1) {
		digAudio.currentTime = 0;
		digAudio.play();

		if (firstMove) {
			firstMove = false;
			updateTimer();
		}
		BFS(x / gridSize, y / gridSize);

		borderControl();

		checkGameWin();
	} else {
		gameOverScreen(x / gridSize, y / gridSize);
	}
});

const drawFlag = (x, y) => {
	canvas.font = "40px Times New Roman";
	canvas.fillStyle = "red";

	// Unicode code point for "Triangular Flag on Post" emoji
	const flagEmoji = String.fromCodePoint(0x2691);

	// Draw the emoji at the center of the canvas
	canvas.fillText(
		flagEmoji,
		x + (gridSize / 2) * 0.6,
		y + (gridSize / 2) * 1.4
	);
};

// right click event
document
	.getElementById("canvas")
	.addEventListener("contextmenu", function (event) {
		event.preventDefault();
		if (gameOver) return;
		({ x, y } = getCanvasXY(event.clientX, event.clientY));

		// if already flaged then unflag
		for (let i = 0; i < flagRegion.length; i++) {
			if (flagRegion[i].x == x && flagRegion[i].y == y) {
				flagRegion.splice(i, 1);

				for (let j = 0; j < notPermitted.length; j++) {
					if (notPermitted[j].x == x && notPermitted[j].y == y) {
						notPermitted.splice(j, 1);
						break;
					}
				}

				flagAudio.currentTime = 0;
				flagAudio.play();
				if (blackOrWhite(x, y) == 0) color = "#aad750";
				else color = "#a2d148";
				canvas.fillStyle = color;
				canvas.fillRect(x, y, gridSize, gridSize);
				flagNumber++;
				flagSpan.innerHTML = flagNumber;
				borderControl();

				return;
			}
		}

		// If not flagged before then look if its permiteed if so flag the region
		let check = true;
		for (let i = 0; i < notPermitted.length; i++) {
			if (notPermitted[i].x == x && notPermitted[i].y == y) {
				check = false;
			}
		}
		if (!check) return;
		if (flagNumber == 0) return;

		flagRegion.push({ x: x, y: y });
		notPermitted.push({ x: x, y: y });

		flagNumber--;
		flagSpan.innerHTML = flagNumber;

		if (blackOrWhite(x, y) == 0) color = "#aad750";
		else color = "#a2d148";
		canvas.fillStyle = color;
		canvas.fillRect(x, y, gridSize, gridSize);

		flagAudio.currentTime = 0;
		flagAudio.play();
		checkGameWin();
		drawFlag(x, y);
		borderControl();
	});

// Share button
document.getElementById("share").addEventListener("click", () => {
	const url = window.location.href;
	navigator.clipboard
		.writeText(url)
		.then(() => {
			alert("Link copied to clipboard!");
		})
		.catch(function (err) {
			console.error("Failed to copy: ", err);
		});
});

// Mute Button
const muteButton = document.getElementById("mute");
const muteIcon = document.querySelector("#mute i");
let isMuted = false;
muteButton.addEventListener("click", () => {
	isMuted = !isMuted;

	if (isMuted) {
		muteIcon.classList.remove("fa-volume-up");
		muteIcon.classList.add("fa-volume-mute");
		digAudio.muted = true;
		tntAudio.muted = true;
		flagAudio.muted = true;
		winCreditSound.muted = true;
	} else {
		muteIcon.classList.remove("fa-volume-mute");
		muteIcon.classList.add("fa-volume-up");
		digAudio.muted = false;
		tntAudio.muted = false;
		flagAudio.muted = false;
		winCreditSound.muted = false;
	}
});

//Timer
const updateTimer = () => {
	if (gameOver) return;
	timer++;
	timerSpan.innerHTML = timer;
	setTimeout(updateTimer, 1000);
};

// Difficulty level
dropdown.addEventListener("change", () => {
	if (gameOver) {
		dropdown.value = diff;
		return;
	}
	diff = dropdown.value;

	if (diff == "Easy") mineNumber = 12;
	if (diff == "Normal") mineNumber = 20;
	if (diff == "Easy") mineNumber = 50;

	setTimeout(() => {
		gameOver = false;
	}, 1000);
	timerSpan.innerHTML = 0;
	flagSpan.innerHTML = 20;
	gameOver = true;
	firstMove = true;
	flagNumber = 20;
	mineFind = 0;

	timer = 0;

	minePlace = [];
	prevHighlight = [];
	flagRegion = [];
	notPermitted = [];
	startScreen();
});
