const panelShowButton = document.querySelector(".panelButton");
const panel = document.querySelector(".panel");

const exportButton = document.querySelector(".exportButton");
const exportTypes = document.querySelector(".exportTypes");
const exportSVG = document.getElementById("exportSVG");
const exportPNG = document.getElementById("exportPNG");

const newCurveAttributes = document.querySelector(".newCurveAttributes");
const strokeWidth = document.querySelector(".strokeWidthInput");
const fillStyle = document.querySelector(".fillStyleCheckbox");
const fillStyleColor = document.querySelector(".fillStyleColor");
const strokeStyle = document.querySelector(".strokeStyleInput");

const panelCloseButton = document.querySelector(".closePanelButton");

const deleteCurveButton = document.querySelector(".deleteCurveButton");
const settingsPanel = document.querySelector(".settings");

const checkBoxForDot = document.getElementById("showControlPoints");
const checkBoxForLines = document.getElementById("showDashedLines");

panelShowButton.addEventListener("click", () => {
	panel.animate(
		[
			{
				scale: 0,
			},
			{
				scale: 1,
			},
		],
		{
			duration: 500,
			fill: "forwards",
		}
	);
	panelShowButton.style.display = "none";
});

panelCloseButton.addEventListener("click", () => {
	// add fadeOut animation to panel
	console.log("closePanelButton clicked");
	panel.animate(
		[
			{
				scale: 1,
			},
			{
				scale: 0,
			},
		],
		{
			duration: 500,
			fill: "forwards",
		}
	);
	setTimeout(() => {
		panelShowButton.style.display = "block";
	}, 500);
});

const newCurveButton = document.querySelector(".newCurveButton");
const cancelNewCurveButton = document.querySelector(".cancelNewCurveButton");

//// Go from here
let newCurve = [
	0,
	0,
	0,
	0,
	{ strokeStyle: strokeStyle.value },
	{ strokewidth: strokeWidth.value },
	{ fillStyle: fillStyle.checked ? fillStyleColor.value : null },
];

let newCurveCount = 0;

const resetNewCurveModel = () => {
	newCurve = [
		0,
		0,
		0,
		0,
		{ strokeStyle: strokeStyle.value },
		{ strokewidth: strokeWidth.value },
		{ fillStyle: fillStyle.checked ? fillStyleColor.value : null },
	];
	newCurveCount = 0;
};

const handleNewCurve = (event) => {
	console.log(coordinates);
	clearCanvas();
	coordinates.forEach((cordinate) => {
		drawBezier(cordinate);
		drawDashedLines(cordinate);
		drawDot(cordinate);
	});

	// drawBezier(newCurve);
	const { clientX, clientY } = event;
	const rect = canvas.getBoundingClientRect();
	const x = clientX - rect.left;
	const y = clientY - rect.top;

	for (let i = newCurveCount; i < 4; i++) newCurve[i] = { x: x, y: y };
	newCurveCount++;
	drawBezier(newCurve);
	drawDashedLines(newCurve);
	drawDot(newCurve);

	if (newCurveCount === 4) {
		coordinates.push(newCurve);
		handleCancelNewCurve();
	}
};

const handleCancelNewCurve = () => {
	console.log(coordinates);
	settingsPanel.style.display = "block";
	deleteCurveButton.style.display = "block";
	newCurveButton.style.display = "block";
	cancelNewCurveButton.style.display = "none";
	panelCloseButton.style.display = "block";
	newCurveAttributes.style.display = "none";
	exportTypes.style.display = "none";
	document.querySelector("body").style.cursor = "url(src/cursor.png),auto";

	resetNewCurveModel();
	clearCanvas();
	coordinates.forEach((cordinate) => {
		console.log("cordinate", cordinate);
		drawBezier(cordinate);
		drawDashedLines(cordinate);
		drawDot(cordinate);
	});
	canvas.removeEventListener("mousedown", handleNewCurve);
	canvas.removeEventListener("mousedown", handleDeleteCurve);
};

newCurveButton.addEventListener("click", () => {
	newCurveAttributes.style.display = "block";
	settingsPanel.style.display = "none";
	deleteCurveButton.style.display = "none";
	newCurveButton.style.display = "none";
	cancelNewCurveButton.style.display = "block";
	panelCloseButton.style.display = "none";

	document.querySelector("body").style.cursor = "url(src/pen_icon.png),auto";

	canvas.addEventListener("mousedown", handleNewCurve);
});

cancelNewCurveButton.addEventListener("click", () => {
	handleCancelNewCurve();
});

checkBoxForDot.addEventListener("change", () => {
	console.log("checkBoxForDot ", checkBoxForDot.checked);
	showControlPoints = checkBoxForDot.checked;

	clearCanvas();
	coordinates.forEach((cordinate) => {
		drawBezier(cordinate);
		drawDashedLines(cordinate);
		drawDot(cordinate);
	});
});

checkBoxForLines.addEventListener("change", () => {
	console.log("checkBoxForLines ", checkBoxForLines.checked);
	showDashedLines = checkBoxForLines.checked;
	clearCanvas();
	coordinates.forEach((cordinate) => {
		drawBezier(cordinate);
		drawDashedLines(cordinate);
		drawDot(cordinate);
	});
});

const handleDeleteCurve = (event) => {
	const { clientX, clientY } = event;
	const rect = canvas.getBoundingClientRect();
	const x = clientX - rect.left;
	const y = clientY - rect.top;

	coordinates.forEach((coordinat, index) => {
		coordinat.forEach((point) => {
			if (calculateDistance(x, y, point.x, point.y) < 7) {
				coordinates.splice(index, 1);
				clearCanvas();
				coordinates.forEach((cordinate) => {
					drawBezier(cordinate);
					drawDashedLines(cordinate);
					drawDot(cordinate);
				});
			}
		});
	});
};

deleteCurveButton.addEventListener("click", (event) => {
	settingsPanel.style.display = "none";
	deleteCurveButton.style.display = "none";
	newCurveButton.style.display = "none";
	cancelNewCurveButton.style.display = "block";
	panelCloseButton.style.display = "none";

	document.querySelector("body").style.cursor = "crosshair";

	canvas.addEventListener("mousedown", handleDeleteCurve);
});

strokeWidth.addEventListener("input", (event) => {
	console.log("strokeWidth ", strokeWidth.value);
	newCurve[5] = { strokewidth: strokeWidth.value };
	clearCanvas();
	coordinates.forEach((cordinate) => {
		drawBezier(cordinate);
		drawDashedLines(cordinate);
		drawDot(cordinate);
	});
	drawBezier(newCurve);
	drawDashedLines(newCurve);
	drawDot(newCurve);
});

strokeStyle.addEventListener("input", (event) => {
	newCurve[4] = { strokeStyle: strokeStyle.value };
	clearCanvas();
	coordinates.forEach((cordinate) => {
		drawBezier(cordinate);
		drawDashedLines(cordinate);
		drawDot(cordinate);
	});
	drawBezier(newCurve);
	drawDashedLines(newCurve);
	drawDot(newCurve);
});

fillStyle.addEventListener("change", (event) => {
	newCurve[6] = { fillStyle: fillStyle.checked ? fillStyleColor.value : null };
	clearCanvas();
	coordinates.forEach((cordinate) => {
		drawBezier(cordinate);
		drawDashedLines(cordinate);
		drawDot(cordinate);
	});
	drawBezier(newCurve);
	drawDashedLines(newCurve);
	drawDot(newCurve);
});

fillStyleColor.addEventListener("input", (event) => {
	newCurve[6] = { fillStyle: fillStyle.checked ? fillStyleColor.value : null };
	clearCanvas();
	coordinates.forEach((cordinate) => {
		drawBezier(cordinate);
		drawDashedLines(cordinate);
		drawDot(cordinate);
	});
	drawBezier(newCurve);
	drawDashedLines(newCurve);
	drawDot(newCurve);
});

exportButton.addEventListener("click", () => {
	newCurveAttributes.style.display = "none";
	settingsPanel.style.display = "none";
	deleteCurveButton.style.display = "none";
	newCurveButton.style.display = "none";
	cancelNewCurveButton.style.display = "block";
	panelCloseButton.style.display = "none";
	exportTypes.style.display = "flex";
});

function downloadCanvasAsPng() {
	const dataURL = canvas.toDataURL("image/png");
	const link = document.createElement("a");
	link.href = dataURL;
	link.download = "image.png";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
exportPNG.addEventListener("click", downloadCanvasAsPng);

const createBezierPathData = (points) => {
	let pathData = `M ${points[0].x} ${points[0].y} C ${points[1].x} ${points[1].y}, ${points[2].x} ${points[2].y}, ${points[3].x} ${points[3].y} `;
	return pathData;
};

exportSVG.addEventListener("click", () => {
	const svgNS = "http://www.w3.org/2000/svg";
	const svg = document.createElementNS(svgNS, "svg");
	svg.setAttribute("width", "1000");
	svg.setAttribute("height", "700");
	svg.setAttribute("viewBox", "0 0 1000 700");

	coordinates.forEach((points) => {
		const path = document.createElementNS(svgNS, "path");
		path.setAttribute("d", createBezierPathData(points));
		path.setAttribute("stroke", points[4].strokeStyle);
		path.setAttribute(
			"fill",
			points[6].fillStyle ? points[6].fillStyle : "none"
		);
		path.setAttribute("stroke-width", points[5].strokewidth);
		svg.appendChild(path);
	});

	const serializer = new XMLSerializer();
	const svgString = serializer.serializeToString(svg);
	const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = "vector.svg";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
});
