const pixel_number_button = document.getElementById("pixel_number_button");
const pixel_number_panel = document.getElementById("pixel_number_panel");
const pixel_number_panel_icon = document.querySelector(
	"#pixel_number_button i"
);
let pixel_number_panel_open = false;

const layer_button = document.getElementById("layer_button");
const layer_panel = document.getElementById("layer_panel");
const layer_panel_icon = document.querySelector("#layer_button i");
const layer_panel_item_array = document.querySelectorAll(".layer_panel_item");
let layer_panel_open = false;

const use_island_func_div = document.querySelector(".use_island_func");
const use_island_func_checkbox = document.getElementById("use_island_func");

const altitude_button = document.getElementById("altitude_button");
const altitude_panel = document.getElementById("altitude_panel");
const altitude_panel_icon = document.querySelector("#altitude_button i");
let altitude_panel_open = false;

const initialAltitudes = [
	// from o to 255 values in 13 elemnts
	18, 36, 54, 72, 90, 108, 126, 144, 162, 180, 198, 216, 234, 255,
];

const sliders = document.querySelectorAll(".altitude_panel_item_slider");

const resetAltitudes = () => {
	currentAltitudes = [...initialAltitudes];
	initialAltitudes.forEach((value, index) => {
		sliders[index].value = value;
	});
};

window.addEventListener("DOMContentLoaded", () => {
	document.querySelector(".download_button").addEventListener("click", () => {
		const canvas = document.querySelector("canvas");
		const image = canvas.toDataURL("image/png");
		const link = document.createElement("a");
		link.href = image;
		link.download = "map.png";
		link.click();
	});

	use_island_func_div.addEventListener("click", () => {
		use_island_func_checkbox.checked = !use_island_func_checkbox.checked;
		use_island_func_value = !use_island_func_value;
	});
	use_island_func_checkbox.addEventListener("click", () => {
		use_island_func_checkbox.checked = !use_island_func_checkbox.checked;
		use_island_func_value = !use_island_func_value;
	});

	resetAltitudes();

	sliders.forEach((slider, index) => {
		slider.addEventListener("input", () => {
			const currentValue = parseFloat(slider.value);
			if (index > 0) {
				const previousSliderValue = parseFloat(sliders[index - 1].value);
				if (currentValue <= previousSliderValue)
					slider.value = previousSliderValue + 0.1;
			}

			if (index < sliders.length - 1) {
				const nextSliderValue = parseFloat(sliders[index + 1].value);
				if (currentValue >= nextSliderValue)
					slider.value = nextSliderValue - 0.1;
			}

			currentAltitudes[index] = parseFloat(slider.value);
			draw_canvas(currentMap);
		});
	});

	altitude_button.addEventListener("click", () => {
		if (altitude_panel_open) {
			altitude_panel_icon.style.transform = "rotate(0deg)";
			altitude_panel.style.display = "none";
			altitude_panel_open = false;
		} else {
			altitude_panel_icon.style.transform = "rotate(180deg)";
			altitude_panel.style.display = "grid";
			altitude_panel_open = true;
		}
	});

	pixel_number_button.addEventListener("click", () => {
		if (pixel_number_panel_open) {
			pixel_number_panel_icon.style.transform = "rotate(0deg)";
			pixel_number_panel.style.display = "none";
			pixel_number_panel_open = false;
		} else {
			pixel_number_panel_icon.style.transform = "rotate(180deg)";
			pixel_number_panel.style.display = "grid";
			pixel_number_panel_open = true;
		}
	});

	layer_button.addEventListener("click", () => {
		if (layer_panel_open) {
			layer_panel_icon.style.transform = "rotate(0deg)";
			layer_panel.style.display = "none";
			layer_panel_open = false;
		} else {
			layer_panel_icon.style.transform = "rotate(180deg)";

			layer_panel.style.display = "grid";
			layer_panel_open = true;
		}
	});
	let i = 0;
	document
		.querySelectorAll(".altitude_panel_item_color")
		.forEach((colorDiv) => {
			colorDiv.style.backgroundColor = altitudesColor[i++];
		});

	document.querySelectorAll(".pixel_number_panel_item").forEach((item) => {
		item.addEventListener("click", () => {
			layer_panel_item_array[0].click();
			const value = parseInt(item.innerText);
			if (value == 128) {
				layer_panel_item_array[4].style.display = "none";
				layer_panel_item_array[5].style.display = "none";
			}
			if (value == 256) {
				layer_panel_item_array[5].style.display = "none";
			} else {
				layer_panel_item_array[4].style.display = "flex";
				layer_panel_item_array[5].style.display = "flex";
			}

			item.classList.add("glowing_text");
			document.querySelectorAll(".pixel_number_panel_item").forEach((item2) => {
				if (item2 !== item) item2.classList.remove("glowing_text");
			}); // remove glow from all other items
		});
	});

	document.querySelectorAll(".layer_panel_item").forEach((item) => {
		item.addEventListener("click", () => {
			item.classList.add("glowing_text");
			document.querySelectorAll(".layer_panel_item").forEach((item2) => {
				if (item2 !== item) item2.classList.remove("glowing_text");
			}); // remove glow from all other items
		});
	});

	document.querySelector(".reset_altitudes").addEventListener("click", () => {
		resetAltitudes();
		draw_canvas(currentMap);
	});
});
