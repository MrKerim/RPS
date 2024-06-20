const pixel_number_button = document.getElementById("pixel_number_button");
const pixel_number_panel = document.getElementById("pixel_number_panel");
let pixel_number_panel_open = false;

const layer_button = document.getElementById("layer_button");
const layer_panel = document.getElementById("layer_panel");
let layer_panel_open = false;

window.addEventListener("DOMContentLoaded", () => {
	pixel_number_button.addEventListener("click", () => {
		if (pixel_number_panel_open) {
			pixel_number_panel.style.display = "none";
			pixel_number_panel_open = false;
		} else {
			pixel_number_panel.style.display = "grid";
			pixel_number_panel_open = true;
		}
	});

	layer_button.addEventListener("click", () => {
		if (layer_panel_open) {
			layer_panel.style.display = "none";
			layer_panel_open = false;
		} else {
			layer_panel.style.display = "grid";
			layer_panel_open = true;
		}
	});
});
