import { F } from "@mobily/ts-belt";
import { Photo } from "pexels";
import { pexelsClient } from "./pexels-client";
import { getSettings, SimpleNewTabSettings } from "./stores/settings-store";
import { wallpaperStore } from "./stores/wallpaper-store";
import { randomInt, takeRandom, takeRandomUntilSatisfied } from "./utils";

const PAGE_SIZE = 80; // This is the max allowed

const composePhotoHelpers = (settings: SimpleNewTabSettings) => ({
	photoIsLargeEnough: (photo: Photo) =>
		photo.width >= settings.wallpaperWidth &&
		photo.height >= settings.wallpaperHeight,
	photoIsCorrectOrientation: (photo: Photo) => {
		const shouldBeLandscape =
			settings.wallpaperWidth > settings.wallpaperHeight;
		const isLandscape = photo.width > photo.height;

		return shouldBeLandscape === isLandscape;
	},
});

export const fetchData = async () => {
	const settings = await getSettings();
	const pageNumber = randomInt(1, 2);

	const { photoIsCorrectOrientation, photoIsLargeEnough } =
		composePhotoHelpers(settings);

	const keywordToUse = takeRandom(settings.keywords) ?? "";

	const photosResult = await pexelsClient.photos.search({
		query: `wallpaper ${keywordToUse.toLowerCase()}`,
		page: pageNumber,
		per_page: PAGE_SIZE,
	});

	if (pexelsClient.typeCheckers.isError(photosResult)) {
		throw new Error(photosResult.error);
	}

	const photosWithCorrectOrientation = photosResult.photos.filter(
		photoIsCorrectOrientation,
	);
	const validPhotos = photosWithCorrectOrientation.filter(photoIsLargeEnough);
	const photo =
		takeRandom(validPhotos) ??
		photosWithCorrectOrientation[0] ??
		photosResult.photos[0];

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
