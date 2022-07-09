import { ApiCall } from "../components/Apicall.js";
import { Card } from "../components/Card.js";

new Glide(".glide").mount();
const gameTitle = document.getElementById("game-title");
const gameSection = document.getElementById("game-content");
const gameDescription = document.getElementById("game-description");
const gamePublishers = document.getElementById("game-publishers");
const gameDevelopers = document.getElementById("game-developers");
const gamePlatforms = document.getElementById("game-platforms");
const gameGenres = document.getElementById("game-genres");
const gameRating = document.querySelector("#game-rating > h5");
const gameMeta = document.querySelector("#game-rating > h4");
const gameSites = document.querySelector("#game-buy-sites");
const loaderDiv = document.querySelector(".details-loader-div");
const params = new URLSearchParams(window.location.search);
const gameId = params.get("gameId");
const imagesUrl = `https://api.rawg.io/api/games/${gameId}/screenshots?key=52078ae0c1294e89a779510564d08e29`;
const detailsUrl = `https://api.rawg.io/api/games/${gameId}?key=52078ae0c1294e89a779510564d08e29`;

window.onload = async () => {
	const detailsData = await ApiCall(detailsUrl);
	const imagesData = await ApiCall(imagesUrl);

	const { name, description, metacritic, platforms, publishers, developers, genres, rating, stores, esrb_rating } = detailsData;
	gameTitle.innerText = name;
	gameDescription.innerHTML = description;
	gameRating.innerHTML = `&#9733; ${rating}`;
	gameMeta.innerText = `Metacritic: ${metacritic}`;

	platforms.forEach((platform) => {
		createSpan("platforms", platform.platform.name);
	});

	stores.forEach((store) => {
		createSpan("sites", store.store.name);
	});

	genres.slice(0, 6).forEach((genre) => {
		createSpan("genres", genre.name);
	});

	publishers.forEach((publisher) => {
		const li = document.createElement("li");
		li.innerText = publisher.name;
		gamePublishers.append(li);
	});

	const span2 = document.createElement("span");
	span2.innerText = developers[0].name;
	gameDevelopers.append(span2);

	imagesData?.results?.forEach((item, index) => {
		const { image } = item;
		const slide = document.querySelector(`#slide${index}`);
		slide.innerHTML = `<img  src=${image} class="slide-image" />`;
	});

	loaderDiv.style.display = "none";
	gameSection.style.visibility = "visible";
};

const createSpan = (type, data) => {
	const span = document.createElement("span");
	span.classList.add("badge");
	span.innerText = `${data}`;
	if (type === "platforms") {
		gamePlatforms.append(span);
	}
	if (type === "sites") {
		gameSites.append(span);
	}
	if (type === "genres") {
		gameGenres.append(span);
	}
};
