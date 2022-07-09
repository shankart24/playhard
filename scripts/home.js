import { ApiCall } from "../components/Apicall.js";
import { Card } from "../components/Card.js";

const url = `https://api.rawg.io/api/games?key=52078ae0c1294e89a779510564d08e29&dates=2021-01-01,2021-12-30&platforms=18,1,7&page_size=12&page=1`;
const form = document.querySelector("form");
const mainContent = document.querySelector("#main-content");
const searchInput = document.querySelector("#search-input");
const loaderDiv = document.querySelector(".loader-div");
let allGames = {};

window.onload = async () => {
	const data = await ApiCall(url);
	loaderDiv.style.display = "none";
	data?.results?.forEach((item) => {
		cardDisplay(item);
	});
};

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	if (searchInput.value.trim().length !== 0) {
		const updatedUrl = `${url}&search=${searchInput.value}`;
		const data = await ApiCall(updatedUrl);
		mainContent.innerHTML = ``;
		loaderDiv.style.display = "none";
		data?.results?.forEach((item) => {
			cardDisplay(item);
		});
	}
});

const cardDisplay = (item) => {
	allGames[item.id] = { ...item };
	const { name, released, background_image, rating, id } = item;
	const div = document.createElement("div");
	div.setAttribute("id", id);
	div.classList.add("card");
	div.innerHTML = Card(background_image, name, released, rating);
	mainContent.append(div);
	const gameAlreadyExists = localStorage.getItem(`${id}-ph`);
	const reqCard = document.getElementById(id);
	const reqBtn = reqCard.children[2].children[0];
	if (gameAlreadyExists) {
		reqBtn.textContent = "Remove";
		reqBtn.style.border = "2px solid red";
		reqBtn.style.color = "red";
	}
};

document.addEventListener("click", function (e) {
	const gameId = e.srcElement.parentElement.parentElement.getAttribute("id");
	if (e.target && e.target.id === "view-details-btn") {
		window.location.href = `/details.html?gameId=${gameId}`;
	}
	if (e.target && e.target.id === "fav-btn") {
		const gameAlreadyExists = localStorage.getItem(`${gameId}-ph`);
		const reqCard = document.getElementById(gameId);
		const reqBtn = reqCard.children[2].children[0];
		if (!gameAlreadyExists) {
			const { name, released, background_image, rating, id } = allGames[gameId];
			reqBtn.textContent = "Remove";
			reqBtn.style.border = "2px solid red";
			reqBtn.style.color = "red";
			localStorage.setItem(`${gameId}-ph`, JSON.stringify({ name, released, background_image, rating, id }));
		} else {
			reqBtn.style.border = "2px solid rgb(74, 19, 161)";
			reqBtn.style.color = "white";
			reqBtn.textContent = "Add to Fav";
			localStorage.removeItem(`${gameId}-ph`);
		}
	}
});
