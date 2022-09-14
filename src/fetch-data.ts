import { pexelsClient } from "./pexels-client";
import { store } from "./store";

export const fetchData = async () => {
	const photosResult = await pexelsClient.photos.search({
		query: "wallpaper",
	});

	if (pexelsClient.typeCheckers.isError(photosResult)) {
		throw new Error(photosResult.error);
	}

	const photo = photosResult.photos[0];

	const data = {
		backgroundImageURL: photo.src.original,
		mainColor: photo.avg_color,
	};
	store.set(data);

	return data;
};
