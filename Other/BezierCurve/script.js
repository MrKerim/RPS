const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let showControlPoints = true;
let showDashedLines = true;

let coordinates = [
	[
		{ x: 200, y: 350 },
		{ x: 400, y: 400 },
		{ x: 600, y: 400 },
		{ x: 800, y: 350 },
		{ strokeStyle: "#0ce2ff" },
		{ strokewidth: 5 },
		{ fillStyle: null },
	],
];

const drawDot = (coordinates) => {
	if (!showControlPoints) return;
	let circle = [coordinates[1], coordinates[2]];
	circle.forEach((coordinate) => {
		ctx.beginPath();
		ctx.arc(coordinate.x, coordinate.y, 5, 0, Math.PI * 2);
		ctx.fillStyle = "#ffffff";
		ctx.fill();
		ctx.strokeStyle = "#4b4b8a";
		ctx.lineWidth = 2;
		ctx.stroke();
	});

	let square = [coordinates[0], coordinates[3]];
	square.forEach((coordinate) => {
		ctx.beginPath();
		ctx.rect(coordinate.x - 5, coordinate.y - 5, 10, 10);
		ctx.fillStyle = "#ffffff";
		ctx.fill();
		ctx.strokeStyle = "#4b4b8a";
		ctx.lineWidth = 2;
		ctx.stroke();
	});
};

const drawBezier = (coordinates) => {
	ctx.beginPath();
	ctx.moveTo(coordinates[0].x, coordinates[0].y);
	ctx.bezierCurveTo(
		coordinates[1].x,
		coordinates[1].y,
		coordinates[2].x,
		coordinates[2].y,
		coordinates[3].x,
		coordinates[3].y
	);
	ctx.strokeStyle = coordinates[4].strokeStyle;
	ctx.lineWidth = coordinates[5].strokewidth;
	if (coordinates[6].fillStyle) {
		ctx.fillStyle = coordinates[6].fillStyle;
		ctx.fill();
	}
	ctx.stroke();
};

const drawDashedLines = (coordinates) => {
	if (!showDashedLines) return;
	ctx.beginPath();
	ctx.setLineDash([5, 5]);
	ctx.moveTo(coordinates[0].x, coordinates[0].y);
	ctx.lineTo(coordinates[1].x, coordinates[1].y);
	ctx.moveTo(coordinates[1].x, coordinates[1].y);
	ctx.lineTo(coordinates[2].x, coordinates[2].y);
	ctx.moveTo(coordinates[2].x, coordinates[2].y);
	ctx.lineTo(coordinates[3].x, coordinates[3].y);
	ctx.strokeStyle = "#4b4b8a";
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.setLineDash([]);
};

const clearCanvas = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};

clearCanvas();
drawBezier(coordinates[0]);
drawDashedLines(coordinates[0]);
drawDot(coordinates[0]);

const calculateDistance = (x, y, x1, y1) => {
	return Math.sqrt((x1 - x) ** 2 + (y1 - y) ** 2);
};

const mouseMoveHandler = (event, index, index2) => {
	const { clientX, clientY } = event;

	const rect = canvas.getBoundingClientRect();
	const x = clientX - rect.left;
	const y = clientY - rect.top;

	coordinates[index][index2] = { x, y };

	clearCanvas();
	coordinates.forEach((coordinate) => {
		drawBezier(coordinate);
		drawDashedLines(coordinate);
		drawDot(coordinate);
	});
};

window.addEventListener("DOMContentLoaded", (event) => {
	canvas.addEventListener("contextmenu", (event) => {
		event.preventDefault();
	});

	window.addEventListener("mousedown", (event) => {
		const { clientX, clientY } = event;
		const rect = canvas.getBoundingClientRect();
		const x = clientX - rect.left;
		const y = clientY - rect.top;

		coordinates.forEach((coordinate, index) => {
			coordinate.forEach((point, index2) => {
				if (calculateDistance(x, y, point.x, point.y) < 7) {
					console.log("clicked on point");

					let eventListenerForMouseMove = (event) =>
						mouseMoveHandler(event, index, index2);

					canvas.addEventListener("mousemove", eventListenerForMouseMove);

					window.addEventListener("mouseup", (event) => {
						canvas.removeEventListener("mousemove", eventListenerForMouseMove);
					});
				}
			});
		});
	});
});
