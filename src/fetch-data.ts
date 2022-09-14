import { F } from "@mobily/ts-belt";
import { Photo } from "pexels";
import { pexelsClient } from "./pexels-client";
import { wallpaperStore } from "./stores/wallpaper-store";
import { randomInt, takeRandomUntilSatisfied } from "./utils";

const PAGE_SIZE = 80; // This is the max allowed

const photoIsLargeEnough = (photo: Photo) =>
	photo.width >= 1920 && photo.height >= 1080;
const photoIsLandscape = (photo: Photo) => photo.width > photo.height;

const photoIsValidWallpaper = F.both(photoIsLandscape, photoIsLargeEnough);

export const fetchData = async () => {
	const pageNumber = randomInt(1, 2);

	const photosResult = await pexelsClient.photos.search({
		query: "wallpaper",
		page: pageNumber,
		per_page: PAGE_SIZE,
	});

	if (pexelsClient.typeCheckers.isError(photosResult)) {
		throw new Error(photosResult.error);
	}

	const photo = takeRandomUntilSatisfied(
		photosResult.photos,
		photoIsValidWallpaper,
	);

	if (!photo) {
		throw new Error("No valid photo found");
	}

	const data = {
		backgroundImageURL: photo.src.original,
		mainColor: photo.avg_color,
	};
	wallpaperStore.set(data);

	return data;
};
