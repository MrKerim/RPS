const circle = document.querySelector(".mouseCircle");

window.addEventListener("mousemove", (event) => {
	x = event.clientX;
	y = event.clientY;
	circle.animate(
		{
			left: `${x - 125}px`,
			top: `${y - 175}px`,
		},
		{ duration: 3000, fill: "forwards" }
	);
});
