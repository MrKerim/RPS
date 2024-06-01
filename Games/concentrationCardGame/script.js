const resetButton = document.querySelector("#Reset");

const triesLeft = document.querySelector("#RemainingGuess span");
let tries = 12;
triesLeft.textContent = tries;
let boolArray;
const createDeck = () => {
	let array = [];

	for (let i = 0; i < 2; i++) {
		boolArray = [false, false, false, false, false, false, false, false];
		let count = 0;

		while (count < 8) {
			let random = Math.floor(Math.random() * 8);
			if (!boolArray[random]) {
				boolArray[random] = true;
				count++;
				array.push(random);
			}
		}
	}

	for (let i = 0; i < 16; i++) {
		console.log(array[i]);
	}
	return array;
};

let correctCards = [
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
];

const winStatus = () => {
	for (let i = 0; i < correctCards.length; i++) {
		if (!correctCards[i]) {
			return false;
		}
	}
	return true;
};

let winCount = 0;
let check = true;
let deck = createDeck();
firstCard = null;

document.querySelectorAll(".icon").forEach((icon) => {
	icon.addEventListener("click", (e) => {
		if (!check) {
			return;
		}
		const id = parseInt(icon.getAttribute("id"));
		if (correctCards[id]) {
			return;
		}

		if (firstCard == null) {
			firstCard = id;
			const img = icon.querySelector("img");
			if (img) {
				console.log(deck[id], id);
				img.src = `./src/${deck[id]}.png`;
			}
		} else {
			const img = icon.querySelector("img");
			if (img) {
				img.src = `./src/${deck[id]}.png`;
				if (deck[firstCard] == deck[id]) {
					console.log("match");
					correctCards[firstCard] = true;
					correctCards[id] = true;
					winCount++;

					if (winCount == 8) {
						alert("You win!");
					}
				} else {
					check = false;
					let temp = firstCard;
					console.log("no match");

					setTimeout(() => {
						tries--;
						triesLeft.textContent = tries;
						icon.querySelector("img").src = "./src/no_image.png";
						document.getElementById(temp).querySelector("img").src =
							"./src/no_image.png";
						check = true;
					}, 1000);
				}
				firstCard = null;
			}
		}

		if (winStatus()) {
			setTimeout(() => {
				alert("You win!");
				restartTheGame();
			}, 1000);
		} else if (tries == 0) {
			setTimeout(() => {
				alert("You lose!");
				restartTheGame();
			}, 1000);
		}
	});
});

const restartTheGame = () => {
	deck = createDeck();
	tries = 12;
	triesLeft.textContent = tries;
	for (let i = 0; i < 16; i++) {
		correctCards[i] = false;
	}

	document.querySelectorAll(".icon").forEach((icon) => {
		icon.querySelector("img").src = "./src/no_image.png";
	});
};

resetButton.addEventListener("click", restartTheGame);
