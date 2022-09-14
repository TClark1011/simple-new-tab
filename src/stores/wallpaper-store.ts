import { F, flow, O, pipe } from "@mobily/ts-belt";

const STORAGE_KEY = "storage";

export type WallpaperStoreData = {
	backgroundImageURL: string;
	mainColor: string;
};

export const wallpaperStore = {
	get: flow(
		() => localStorage.getItem(STORAGE_KEY),
		O.fromNullable,
		O.map(JSON.parse),
		O.map(F.coerce<WallpaperStoreData>),
		O.toNullable,
	),
	set: (newData: WallpaperStoreData) =>
		pipe(newData, JSON.stringify, (stringified) =>
			localStorage.setItem(STORAGE_KEY, stringified),
		),
};
