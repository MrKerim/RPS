let movieNameRef = document.getElementById("movie-name");
let searchButton = document.getElementById("search-btn");

let result = document.getElementById("result");

let getMovie = () => {
	let movieName = movieNameRef.value;
	const apikey = "81df65fd";
	let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${apikey}`;

	if (movieName === "") {
		result.innerHTML = "<h3 class = msg>Please enter a movie name</h3>";
	} else {
		fetch(url)
			.then((response) => response.json())
			.then((json) => {
				if (json.Response == "True") {
					console.log(json);
					result.innerHTML = `
                    <div class = "info">
                        <img src = "${json.Poster}" class = "poster">
                        <div>
                            <h2>${json.Title}</h2>
                            <div class = "rating">
                                <img src = "images/star.png">
                                <h4>${json.imdbRating}</h4>
                            </div>
                            <div class = "director">
                                <h3>Directed by ${json.Director}</h3>
                            </div>
                            <div class = "details">
                                <span>${json.Rated}</span>
                                <span>${json.Year}</span>
                                <span>${json.Runtime}</span>
                            </div>
                            <div class = "genre">
                                <div>
                                    ${json.Genre.split(",").join("</div><div>")}
                                </div>
                            </div>
                        </div>
                        <h3>Plot</h3>
                        <p>${json.Plot}</p>
                        <h3>Cast</h3>
                        <p>${json.Actors}</p>
                    </div>
                    `;
				} else {
					result.innerHTML = `<h3 class = msg>${json.Error}</h3>`;
				}
			})
			.catch((error) => {
				console.log(error);
				result.innerHTML = "<h3 class = msg>Something went wrong!</h3>";
			});
	}
};

searchButton.addEventListener("click", getMovie);
movieNameRef.addEventListener("keypress", (e) => {
	if (e.key === "Enter") getMovie();
});
window.addEventListener("load", getMovie);
