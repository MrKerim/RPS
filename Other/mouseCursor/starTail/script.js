let pX = 0;
let pY = 0;

const calculateDistance = (x1, y1, x2, y2) => {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

const colors = ["#1A1AFF", "#2159FF", "#5500ff", "#00CCCC", "#009999"];
const rotations = ["fall1", "fall2", "fall3"];
window.onmousemove = (e) => {
	x = e.clientX;
	y = e.clientY;
	let diff = calculateDistance(pX, pY, x, y);
	if (diff > 50) {
		pX = x;
		pY = y;

		const square = document.createElement("i");
		square.className = "fa-solid fa-star dot"; // Use a valid FontAwesome icon class
		square.style.color = colors[Math.floor(Math.random() * colors.length)];
		square.style.left = `${x}px`;
		square.style.top = `${y}px`;
		square.style.animationName =
			rotations[Math.floor(Math.random() * rotations.length)];
		document.body.appendChild(square);
		console.log("Added dot");
		setTimeout(() => {
			document.body.removeChild(square);
		}, 2000);
	}

	const glow = document.createElement("div");
	glow.className = "glow";
	glow.style.left = `${x}px`;
	glow.style.top = `${y}px`;
	document.body.appendChild(glow);
	setTimeout(() => {
		document.body.removeChild(glow);
	}, 50);
};

/*
for (let i = 0; i < 1000000; i++) {
	setTimeout(() => {
		x = Math.floor(Math.random() * window.innerWidth);
		y = Math.floor(Math.random() * window.innerHeight);
		const square = document.createElement("i");
		square.className = "fa-solid fa-star dot"; // Use a valid FontAwesome icon class
		square.style.color = colors[Math.floor(Math.random() * colors.length)];
		square.style.left = `${x}px`;
		square.style.top = `${y}px`;
		square.style.animationName =
			rotations[Math.floor(Math.random() * rotations.length)];
		document.body.appendChild(square);
		console.log("Added dot");
		setTimeout(() => {
			document.body.removeChild(square);
		}, 2000);
	}, 50 * i);
}
*/
