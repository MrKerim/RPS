let pX = 0;
let pY = 0;

const startDate = new Date("2024-04-01"); // Replace with your specific date

// Get the current date
const currentDate = new Date();

// Calculate the difference in time (milliseconds)
const timeDifference = currentDate - startDate;

// Convert the time difference from milliseconds to days
const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

console.log(
	`Number of days since ${startDate.toDateString()}: ${daysDifference}`
);

//const colors = ["#1A1AFF", "#2159FF", "#5500ff", "#00CCCC", "#009999"];
const colors = [
	"#fe8181",
	"#98002e",
	"#fe8181",
	"#6f1200",
	"#551900",
	"#FDDCE8",
];
const rotations = ["fall1", "fall2", "fall3"];

setInterval(() => {
	x = Math.floor(Math.random() * window.innerWidth);
	y = Math.floor(Math.random() * window.innerHeight);
	const square = document.createElement("i");
	square.className = "fa-solid fa-heart dot"; // Use a valid FontAwesome icon class
	square.style.color = colors[Math.floor(Math.random() * colors.length)];
	square.style.left = `${x}px`;
	square.style.top = `${y}px`;
	square.style.animationName =
		rotations[Math.floor(Math.random() * rotations.length)];
	document.body.appendChild(square);

	setTimeout(() => {
		document.body.removeChild(square);
	}, 2000);
}, 30);

const textContainer = document.getElementById("text-container");

/*
const paragraph = `<p>Can Pareme, Can Şenliğinden:</p>
<br>
<p><span class = "highlight">B</span>ir tanem benim, canımın içi. Benim</p>
<p><span class = "highlight">A</span>şkım, biricik güzelim. Benim</p>
<p><span class = "highlight">Ş</span>enliğim. Bu hayatın bana olan en güzel</p>
<p><span class = "highlight">A</span>rmağanı. Senle geçirdiğim her saniyede</p>
<p><span class = "highlight">K</span>endimden bir parça buluyor,</p>
<p><span class = "highlight">S</span>ana olan sevgim kat ve kat artıyor.</p>
<p><span class = "highlight">E</span>n derinden hissediyorum bu güzelliği!</p>
<p><span class = "highlight">N</span>adide çiçeğim benim, biricik aşkım.</p>
<p><span class = "highlight">İ</span>çimde tutamıyorum bunca sevgiyi,</p>
<p><span class = "highlight">Ç</span>içeğimle paylaşmak istiyorum içimden geçenleri</p>
<p><span class = "highlight">O</span>nca geçen zamanda hissettim bunların hepsini.</p>
<p><span class = "highlight">K</span>oynumdayken, omzumdayken, dizinde yatarken, k.. :D</p>
<p><span class = "highlight">S</span>ende buldum ben bu sevgiyi,</p>
<p><span class = "highlight">E</span>n içimde hissettim hepsini biricik güzelim benim.</p>
<p><span class = "highlight">V</span>e yine seninle olmak istiyorum bundan sonra da yine</p>
<p><span class = "highlight">E</span>teğinin dibinde yatmak istiyorum.</p>
<p><span class = "highlight">Y</span>erim ben seniii Offff çok özledimmmmmm</p>
<p><span class = "highlight">R</span>ahatlığım, sevincim, mutluluğum, hüzünüm,</p>
<p><span class = "highlight">U</span>mudum benim bu hayattaki, her şeyimmm benimmmmm</p>
<p><span class = "highlight">M</span>erakla bekliyorum bu hediyeyi alınca ne hissedeceğini,</p>
<p>Seni Çok Seviyorum!!</p>`;
*/
//textContainer.innerHTML = paragraph;

//170 100
let slidingTime = 170;
let intervalTime = 100;

const paragraph = `<p><span class = "highlight"></span></p>
<br>
<p><span class = "highlight"></span></p>
<p><span class = "highlight"></span></p>
<p><span class = "highlight"></span></p>
<p><span class = "highlight"></span></p>
<p><span class = "highlight"></span></p>
<p><span class = "highlight"></span></p>
<p><span class = "highlight"></span></p>
<p><span class = "highlight"></span></p>
<p><span class = "highlight"></span></p>
<p><span class = "highlight"></span></p>
<p><span class = "highlight"></span></p>
<p><span class = "highlight"></span></p>
<p><span class = "highlight"></span></p>
<p><span class = "highlight"></span></p>
<p><span class = "highlight"></span></p>
<p><span class = "highlight"></span></p>
<p><span class = "highlight"></span></p>
<p><span class = "highlight"></span></p>
<p><span class = "highlight"></span></p>
<p><span class = "highlight"></span></p>
<p><span class = "highlight"></span></p>`;
textContainer.innerHTML += paragraph;

const canParem = `Can Pareme, Can Şenliğinden:
Bir tanem benim, canımın içi. Benim
Aşkım, biricik güzelim. Benim
Şenliğim. Bu hayatın bana olan en güzel
Armağanı. Senle geçirdiğim her saniyede
Kendimden bir parça buluyor,
Sana olan sevgim kat ve kat artıyor.
En derinden hissediyorum bu güzelliği!
Nadide çiçeğim benim, biricik aşkım.
İçimde tutamıyorum bunca sevgiyi,
Çiçeğimle paylaşmak istiyorum içimden geçenleri
Onca geçen zamanda hissettim bunların hepsini.
Koynumdayken, omzumdayken, dizinde yatarken, k.. :D
Sende buldum ben bu sevgiyi,
En içimde hissettim hepsini biricik güzelim benim.
Ve yine seninle olmak istiyorum bundan sonra da yine
Eteğinin dibinde yatmak istiyorum.
Yerim ben seniii Offff çok özledimmmmmm
Rahatlığım, sevincim, mutluluğum, hüzünüm,
Umudum benim bu hayattaki, her şeyimmm benimmmmm
Merakla bekliyorum bu hediyeyi alınca ne hissedeceğini,
Seni Çok Seviyorum!!`;

const canParemArray = canParem.split("\n");
const spanArray = document.getElementsByClassName("highlight");
const paragraphArray = document.getElementsByTagName("p");

let index = 0;
let line = 0;

const birlikteGecirigimizZaman = () => {
	const divbirlikteGecirigimizZaman = document.getElementById(
		"birlikte-gecirigimiz-zaman"
	);
	const birlikteGecirigimizZamanText = `Seninle geçen <span class = "highlight">${daysDifference}</span> günün her birinde olduğu gibi bugün de`;
	divbirlikteGecirigimizZaman.innerHTML = birlikteGecirigimizZamanText;
};

const clearParagraph = () => {
	for (let i = 0; i < paragraphArray.length; i++) {
		setTimeout(() => {
			if (i !== paragraphArray.length - 1) {
				paragraphArray[i].innerHTML = " ";
			} else {
				for (let j = 0; j < canParemArray.length - 1; j++) {
					textContainer.removeChild(paragraphArray[0]);
				}
				textContainer.style.top = window.innerHeight / 2 + "px";
				textContainer.style.alignItems = "center";

				textContainer.style.textAlign = "center";
				birlikteGecirigimizZaman();
			}
		}, 300 * i);
	}
};

const intervalId = setInterval(() => {
	if (line == 0 || line == canParemArray.length - 1) {
		if (index < canParemArray[line].length) {
			paragraphArray[line].innerHTML += canParemArray[line][index];
			index++;
		} else {
			line++;
			index = 0;
		}
	}
	if (line < canParemArray.length) {
		if (index == 0) {
			spanArray[line].innerHTML += canParemArray[line][index];
			index++;
		} else if (index < canParemArray[line].length) {
			paragraphArray[line].innerHTML += canParemArray[line][index];
			index++;
		} else {
			line++;
			index = 0;
		}
	} else {
		clearInterval(intervalId);
		console.log("Finished");
		clearParagraph();
	}
}, intervalTime);

textContainer.style.top = window.innerHeight / 2 + "px";

function detectDeviceType() {
	const userAgent = navigator.userAgent.toLowerCase();
	const width = window.innerWidth;

	if (/mobile|android|iphone|ipad|ipod/.test(userAgent) || width <= 480) {
		return "mobile";
	} else if (/tablet|ipad/.test(userAgent) || (width > 480 && width <= 1024)) {
		return "tablet";
	} else {
		return "desktop";
	}
}

function adjustParameterBasedOnDevice() {
	const deviceType = detectDeviceType();

	if (deviceType === "mobile") {
		textContainer.style.fontSize = "12px";
		slidingTime = 335;
	} else if (deviceType === "tablet") {
		textContainer.style.fontSize = "18px";
	} else {
		textContainer.style.fontSize = "24px";
	}
}

// Adjust the parameter based on the detected device type
adjustParameterBasedOnDevice();

const slidingInterval = setInterval(() => {
	if (!(parseInt(window.getComputedStyle(textContainer).top) < 0)) {
		textContainer.style.top =
			parseInt(window.getComputedStyle(textContainer).top) - 1 + "px";
	} else {
		clearInterval(slidingInterval);
	}
}, slidingTime);
