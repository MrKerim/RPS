const Noise = (layer, pixel_number, grid_size) => {
	// Create a 2D array to store the values of each pixel
	let map;

	const init_map = () => {
		map = new Array(pixel_number);
		for (let i = 0; i < pixel_number; i++) {
			map[i] = new Array(pixel_number).fill(0);
		}
	};

	// We also need a 3d array to store the random vectors of each corner of 8x8 main grid
	// for 8x8 grid we have 9x9 corners

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
			}
	};

	// So for any pixel on the map let' say map[i][j]
	// we can find the 4 corners of the 8x8 grid that contains this pixel
	// by dividing i and j by 8 and taking the floor of the result
	// i = 25, j = 64 => i / 8 = 3, j / 8 = 8 => corner_vectors[3][8] is the top left corner
	// corner_vectors[3][9] is the top right corner and so on...
	// We will take every pixel and find the lenght vector of the pixel from the 4 corners
	// then take the dot product of each vector with the random vectors of the corners
	// and sum the results to get the value of the pixel

	// Fade function
	const fade = (t) => {
		return t * t * t * (t * (t * 6 - 15) + 10);
	};

	// Linear interpolation function
	const lerp = (t, a, b) => {
		return a + t * (b - a);
	};

	// Dot product of distance and gradient vectors
	const dotProductGridGradient = (ix, iy, dx, dy) => {
		const gradient = corner_vectors[ix][iy];
		return dx * gradient[0] + dy * gradient[1];
	};

	// Perlin noise function
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
		init_corner_vectors();
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

	init_map();
	let new_map = [perlin_noise_generator()];

	for (let i = 1; i < layer; i++) {
		grid_size *= 2;
		init_map();
		init_corner_vectors();
		new_map.push(perlin_noise_generator());
	}

	init_map();
	for (let i = 1; i <= layer; i++) {
		for (let j = 0; j < pixel_number; j++) {
			for (let k = 0; k < pixel_number; k++) {
				map[j][k] += new_map[i - 1][j][k] / (i * 2);
			}
		}
	}

	return map;
};
