import { Card } from "../components/Card.js";

const mainContent = document.getElementById("main-content");
window.onload = () => {
	let favGames = [];
	Object.keys(localStorage).forEach((key) => {
		if (key.includes("-ph")) {
			let item = localStorage.getItem(key);
			favGames.push(JSON.parse(item));
		}
	});
	favGames?.forEach((item) => {
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
	});
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
		if (gameAlreadyExists) {
			localStorage.removeItem(`${gameId}-ph`);
		}
	}
});
