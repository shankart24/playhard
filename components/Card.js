export const Card = (img, title, date, rating) => {
	return `
			<img src=${img} class="card-img" loading="lazy" alt="Loading.." />
			<div class="card-content">
				<div>
					<h4 class="card-title">${title}</h4>
					<h4 class="card-date">${date}</h4>
				</div>
				<h4 class="card-rating">&#9733;${rating}</h4>
			</div>
			<div class="card-buttons">
				<button id="fav-btn" >Add to Fav</button>
					<button id="view-details-btn" >View Details</button>
			</div>
		`;
};
