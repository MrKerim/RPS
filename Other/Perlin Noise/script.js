const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

let layer = 2;
let pixel_number = 512;
let grid_size = 8;

const init_canvas_writing = () => {
	// Write click generate on canvas
	ctx.fillStyle = "#aea5c9";
	ctx.font = "40px Calistoga";
	ctx.textAlign = "center";
	ctx.fillText("Click generate", width / 2, height / 2);
	ctx.fillText("to create a terrain 🏔️", width / 2, height / 2 + 50);
};
init_canvas_writing();

let currentMap = [];
const generate_map = (layer, pixel_number, grid_size) => {
	return new Promise((resolve, reject) => {
		try {
			let map = Noise(layer, pixel_number, grid_size);
			if (use_island_func_value) {
				for (let i = 0; i < pixel_number; i++)
					for (let j = 0; j < pixel_number; j++) {
						const xk =
							1 -
							Math.pow(
								Math.sin((Math.PI * (i - pixel_number / 2)) / pixel_number),
								2
							);
						const yk =
							1 -
							Math.pow(
								Math.sin((Math.PI * (j - pixel_number / 2)) / pixel_number),
								2
							);
						map[i][j] *= xk * yk;
					}
			}

			resolve(map);
		} catch (error) {
			reject(error);
		}
	});
};

// #140736
const altitudesColor = [
	"#7d8682",
	"#87968c",
	"#919f96",
	"#a5b3a9",
	"#afb4aa",
	"#d7d7c7",
	"#a5aa8c",
	"#c8c3a0",
	"#e0d2a5",
	"#d2b496",
	"#cda086",
	"#af7873",
	"#a05555",
	"#914137",
];

let currentAltitudes = [...initialAltitudes];

const colorAltitude = (altitude) => {
	// from 0 to 255 to 0 to 13
	for (let i = 0; i < currentAltitudes.length; i++) {
		if (altitude <= currentAltitudes[i]) return altitudesColor[i];
	}
	return altitudesColor[altitudesColor.length - 1];
};

let use_island_func_value = false;

const draw_canvas = (map) => {
	let min = Infinity;
	let max = -Infinity;
	for (let i = 0; i < pixel_number; i++)
		for (let j = 0; j < pixel_number; j++) {
			if (map[i][j] < min) min = map[i][j];
			if (map[i][j] > max) max = map[i][j];
		}
	const range = max - min;
	map = map.map((row) => row.map((value) => ((value - min) / range) * 255));

	// Draw map
	for (let i = 0; i < pixel_number; i++) {
		for (let j = 0; j < pixel_number; j++) {
			//ctx.fillStyle = `rgb(${map[i][j]}, ${map[i][j]}, ${map[i][j]})`;
			ctx.fillStyle = colorAltitude(map[i][j]);
			ctx.fillRect(
				(i * width) / pixel_number,
				(j * height) / pixel_number,
				width / pixel_number,
				height / pixel_number
			);
		}
	}
};

async function draw(layer, pixel_number, grid_size) {
	try {
		const map = await generate_map(layer, pixel_number, grid_size);
		currentMap = map;
		draw_canvas(map);
	} catch (error) {
		console.error("Error in calculations:", error);
	}
}

window.addEventListener("DOMContentLoaded", () => {
	document.querySelector(".generate_button").addEventListener("click", () => {
		draw(layer, pixel_number, grid_size);
	});

	document.querySelectorAll(".pixel_number_panel_item").forEach((item) => {
		item.addEventListener("click", () => {
			pixel_number = parseInt(item.innerText);
		});
	});

	document.querySelectorAll(".layer_panel_item").forEach((item) => {
		item.addEventListener("click", () => {
			layer = parseInt(item.innerText);
		});
	});
});
