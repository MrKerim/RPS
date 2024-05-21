const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const notFound = document.querySelector(".not-found");
const searchArea = document.querySelector(".search-box input");

const noteFoundImage = document.querySelector(".not-found img");
const noteFoundMessage = document.querySelector(".not-found p");

const shwoError = () => {
	noteFoundImage.src = "images/not_found.png";
	noteFoundMessage.innerHTML = "Location not found";
	container.style.height = "410px";
	weatherBox.style.display = "none";
	weatherDetails.style.display = "none";
	notFound.style.display = "block";
	notFound.classList.add("fadeIn");
};

const basakistan = () => {
	noteFoundMessage.innerHTML = "Mutlu ve heyecanlıı!!";
	noteFoundImage.src = "images/basak.JPG";
	container.style.height = "520px";
	weatherBox.style.display = "none";
	weatherDetails.style.display = "none";
	notFound.style.display = "block";
	notFound.classList.add("fadeIn");
};

const apiCall = () => {
	const APIkey = "6f8b27498c7bdc1515f16aabdb23748d";
	const city = document.querySelector(".search-box input").value;

	if (city == "") return;
	if (city == "basakistan") {
		basakistan();
		return;
	}

	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`
	)
		.then((response) => response.json())
		.then((json) => {
			console.log(json);
			if (json.cod === "404") {
				shwoError();
				return;
			}

			notFound.style.display = "none";
			notFound.classList.remove("fadeIn");

			const image = document.querySelector(".weather-box img");
			const temperature = document.querySelector(".weather-box .temperature");
			const description = document.querySelector(".weather-box .description");

			const humidity = document.querySelector(
				".weather-details .humidity span"
			);
			const wind = document.querySelector(".weather-details .wind span");

			const weather = json.weather[0].main;

			if (weather == "Clear") image.src = "images/clear.png";
			else if (weather == "Clouds") image.src = "images/cloudy.png";
			else if (weather == "Rain") image.src = "images/rainy.png";
			else if (weather == "Snow") image.src = "images/snowy.png";
			else if (weather == "Haze") image.src = "images/hazel.png";
			else image.src = "";

			temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
			description.innerHTML = `${json.weather[0].description}`;
			humidity.innerHTML = `${parseInt(json.main.humidity)}%`;
			wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

			weatherBox.style.display = "";
			weatherDetails.style.display = "";
			weatherBox.classList.add("fadeIn");
			weatherDetails.classList.add("fadeIn");
			container.style.height = "590px";
		});
};

search.addEventListener("click", apiCall);
searchArea.addEventListener("keydown", (event) => {
	if (event.key === "Enter") apiCall();
});
