const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let map = [];
for (let i = 0; i < canvas.width / 5; i++) {
	map.push(new Array(canvas.height / 5).fill(0));
}

for (let i = 0; i < 200; i++) {
	map[i][0] = 125;
}

for (let i = 0; i < 140; i++) {
	map[0][i] = 125;
}

window.addEventListener("DOMContentLoaded", () => {
	for (let i = 1; i < canvas.width / 5; i++) {
		for (let j = 1; j < canvas.height / 5; j++) {
			let sum = 0;
			sum += map[i - 1][j - 1];
			sum += map[i - 1][j];
			sum += map[i][j - 1];
			sum = sum / 3;
			sum += Math.random() * 100 - 50;
			map[i][j] = sum;

			ctx.fillStyle = `rgb(${sum}, ${sum}, ${sum})`;
			ctx.fillRect(i * 5, j * 5, 5, 5);
		}
	}

	setInterval(() => {
		for (let i = 1; i < canvas.width / 5; i++) {
			for (let j = 1; j < canvas.height / 5; j++) {
				map[i][j] += Math.floor(Math.random() * 50 - 25);

				ctx.fillStyle = `rgb(${map[i][j]}, ${map[i][j]}, ${map[i][j]})`;
				ctx.fillRect(i * 5, j * 5, 5, 5);
			}
		}
	}, 200);
});
