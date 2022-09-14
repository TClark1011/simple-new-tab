import { F, flow, O, pipe } from "@mobily/ts-belt";

const STORAGE_KEY = "storage";

export type StoreData = {
	backgroundImageURL: string;
	mainColor: string;
};

export const store = {
	get: flow(
		() => localStorage.getItem(STORAGE_KEY),
		O.fromNullable,
		O.map(JSON.parse),
		O.map(F.coerce<StoreData>),
		O.toNullable,
	),
	set: (newData: StoreData) =>
		pipe(newData, JSON.stringify, (stringified) =>
			localStorage.setItem(STORAGE_KEY, stringified),
		),
};
