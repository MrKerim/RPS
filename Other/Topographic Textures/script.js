let pixel_number = 1024;
let grid_size = 8;

let map;
const init_map = () => {
	map = new Array(pixel_number);
	for (let i = 0; i < pixel_number; i++) {
		map[i] = new Array(pixel_number).fill(0);
	}
};

let corner_vectors;
const init_corner_vectors = () => {
	corner_vectors = new Array(grid_size + 1);
	for (let i = 0; i < grid_size + 1; i++)
		corner_vectors[i] = new Array(grid_size + 1).fill(0);
	for (let i = 0; i < grid_size + 1; i++)
		for (let j = 0; j < grid_size + 1; j++) {
			corner_vectors[i][j] = [Math.random() * 2 - 1, Math.random() * 2 - 1];
			// Also normalize the vectors
			let len = Math.sqrt(
				corner_vectors[i][j][0] ** 2 + corner_vectors[i][j][1] ** 2
			);
			corner_vectors[i][j][0] /= len;
			corner_vectors[i][j][1] /= len;
			corner_vectors[i][j].push(Math.floor(Math.random() * 2 - 1));
			//corner_vectors[i][j].push(0);
		}
};

const update_corner_vectors = (theta) => {
	for (let i = 0; i < grid_size + 1; i++)
		for (let j = 0; j < grid_size + 1; j++) {
			// move the corner vector by 1 deg to left
			if (corner_vectors[i][j][2] === 0) {
				theta = -theta;
			}
			let x = corner_vectors[i][j][0];
			let y = corner_vectors[i][j][1];
			corner_vectors[i][j][0] = x * Math.cos(theta) - y * Math.sin(theta);
			corner_vectors[i][j][1] = x * Math.sin(theta) + y * Math.cos(theta);
		}
};

const fade = (t) => {
	return t * t * t * (t * (t * 6 - 15) + 10);
};

const lerp = (t, a, b) => {
	return a + t * (b - a);
};

const dotProductGridGradient = (ix, iy, dx, dy) => {
	const gradient = corner_vectors[ix][iy];
	return dx * gradient[0] + dy * gradient[1];
};

const perlin_noise = () => {
	const divs = pixel_number / grid_size;
	for (let i = 0; i < pixel_number; i++) {
		for (let j = 0; j < pixel_number; j++) {
			const x0 = Math.floor(i / divs);
			const y0 = Math.floor(j / divs);

			const dx0 = i / divs - x0;
			const dy0 = j / divs - y0;

			const u = fade(dx0);
			const v = fade(dy0);

			let n00 = dotProductGridGradient(x0, y0, dx0, dy0);
			let n01 = dotProductGridGradient(x0, y0 + 1, dx0, dy0 - 1);
			let n10 = dotProductGridGradient(x0 + 1, y0, dx0 - 1, dy0);
			let n11 = dotProductGridGradient(x0 + 1, y0 + 1, dx0 - 1, dy0 - 1);

			let nx0 = lerp(u, n00, n10);
			let nx1 = lerp(u, n01, n11);

			map[i][j] = lerp(v, nx0, nx1);
		}
	}
};

const perlin_noise_generator = () => {
	perlin_noise();
	let min = Infinity;
	let max = -Infinity;

	for (let i = 0; i < 128; i++) {
		for (let j = 0; j < 128; j++) {
			min = Math.min(min, map[i][j]);
			max = Math.max(max, map[i][j]);
		}
	}

	map = map.map((row) => row.map((val) => ((val - min) / (max - min)) * 255));
	return map;
};
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, pixel_number, pixel_number);

init_map();
init_corner_vectors();
perlin_noise_generator();

const draw = () => {
	update_corner_vectors(Math.random() * 0.08);
	init_map();
	perlin_noise_generator();

	let min = Infinity;
	let max = -Infinity;

	for (let i = 0; i < pixel_number; i++) {
		for (let j = 0; j < pixel_number; j++) {
			min = Math.min(min, map[i][j]);
			max = Math.max(max, map[i][j]);
		}
	}

	map = map.map((row) => row.map((val) => ((val - min) / (max - min)) * 255));

	ctx.clearRect(0, 0, pixel_number, pixel_number);
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, pixel_number, pixel_number);
	for (let i = 0; i < pixel_number; i++) {
		for (let j = 0; j < pixel_number; j++) {
			if (map[i][j] < 10) map[i][j] = 255;
			else if (map[i][j] > 35 && map[i][j] < 40) map[i][j] = 255;
			else if (map[i][j] > 75 && map[i][j] < 80) map[i][j] = 255;
			else if (map[i][j] > 115 && map[i][j] < 120) map[i][j] = 255;
			else if (map[i][j] > 155 && map[i][j] < 160) map[i][j] = 255;
			else if (map[i][j] > 235 && map[i][j] < 240) map[i][j] = 255;
			else continue;

			ctx.fillStyle = `rgb(${map[i][j]}, ${map[i][j]}, ${map[i][j]})`;
			ctx.fillRect(i, j, 1, 1);
		}
	}

	requestAnimationFrame(draw);
};

draw();
