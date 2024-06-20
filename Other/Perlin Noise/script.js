const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const generate_map = () => {
	init_map();
	init_corner_vectors();
	let new_map = [perlin_noise_generator()];

	for (let i = 1; i < layer; i++) {
		grid_size *= 2;
		init_map();
		init_corner_vectors();
		new_map.push(perlin_noise_generator());
	}

	init_map();
	console.log("generate map after init map:", map);

	for (let i = 1; i <= layer; i++) {
		for (let j = 0; j < pixel_number; j++) {
			for (let k = 0; k < pixel_number; k++) {
				map[j][k] += new_map[i - 1][j][k] / (i * 2);
			}
		}
	}
};
const draw_canvas = () => {
	for (let i = 0; i < pixel_number; i++) {
		for (let j = 0; j < pixel_number; j++) {
			ctx.fillStyle = `rgb(${map[i][j]}, ${map[i][j]}, ${map[i][j]})`;
			ctx.fillRect(
				(i * width) / pixel_number,
				(j * height) / pixel_number,
				width / pixel_number,
				height / pixel_number
			);
		}
	}
};

window.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".pixel_number_panel_item").forEach((item) => {
		item.addEventListener("click", () => {
			pixel_number = parseInt(item.innerText);
			generate_map();
			draw_canvas();
		});
	});

	document.querySelectorAll(".layer_panel_item").forEach((item) => {
		item.addEventListener("click", () => {
			layer = parseInt(item.innerText);
			generate_map();
			draw_canvas();
		});
	});
});
