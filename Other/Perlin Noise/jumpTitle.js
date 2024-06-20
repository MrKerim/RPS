const letterArray = [];
for (let i = 1; i <= 7; i++) {
	letterArray.push(document.getElementById(`jumpingTitleh1${i}`));
}

const colorArry = [
	"#D9ED92",
	"#B5E48C",
	"#99D98C",
	"#76C893",
	"#52B69A",
	"#34A0A4",
	"#168AAD",
];
const setColor = () => {
	for (let i = 0; i < letterArray.length; i++) {
		letterArray[i].style.color = colorArry[i];
	}
};

const jumpTitle = () => {
	for (let i = 0; i < letterArray.length; i++) {
		letterArray[i].style.animation = `jump 2s ${i * 0.1}s infinite`;
	}
};

setColor();
jumpTitle();
