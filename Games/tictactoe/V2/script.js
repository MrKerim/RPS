let gameStatus = 1;

function drawX(cell) {
	if (!cell.querySelector(".x-marker")) {
		const xMarker = document.createElement("div");
		xMarker.classList.add("x-marker");
		cell.appendChild(xMarker);
	}
}

function drawO(cell) {
	if (!cell.querySelector(".o-marker")) {
		const oMarker = document.createElement("div");
		oMarker.classList.add("o-marker");
		cell.appendChild(oMarker);
	}
}

function deleteO(cell) {
	const oMarker = cell.querySelector(".o-marker");
	if (oMarker) {
		oMarker.remove();
	}
}

function deleteX(cell) {
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

	return "no win";
}

function handleWin(inputObject) {
	if (inputObject == "no win") return;
	const winLineDiv = document.createElement("div");
	winLineDiv.classList.add("winLine" + inputObject.direction);
	inputObject.cell.appendChild(winLineDiv);
	gameStatus = 0;

	setTimeout(resetGameContainerByDOM, 5000);
}

function resetGameContainerByDOM() {
	gameStatus = 1;
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

function startGame() {
	let turn = 1;
	document.querySelectorAll(".box").forEach((cell) => {
		cell.addEventListener("click", () => {
			console.log(gameStatus);
			if (
				!gameStatus ||
				cell.classList.contains("x") ||
				cell.classList.contains("o")
			) {
				return;
			}
			if (turn % 2 === 0) {
				drawO(cell);
				cell.classList.add("o");
			} else {
				drawX(cell);
				cell.classList.add("x");
			}
			turn++;
			handleWin(checkWinByDOM());
		});
	});
}

window.addEventListener("DOMContentLoaded", startGame);
