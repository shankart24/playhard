export const ApiCall = async (url) => {
	const res = await fetch(url, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await res.json();
	return data;
};
