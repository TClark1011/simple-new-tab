import { getBucket } from "@extend-chrome/storage";

export type SettingsStoreData = {
	keywords: Set<string>;
};

export const defaultSettingsStoreData: SettingsStoreData = {
	keywords: new Set(),
};

export const settingsStore = getBucket<SettingsStoreData>("settings");

export const applyDefaultSettings = () =>
	settingsStore.set(defaultSettingsStoreData);

export const safeGetSettings = () =>
	settingsStore.get().then((r) => ({ ...defaultSettingsStoreData, ...r }));

export const addKeyword = (keyword: string) =>
	settingsStore.update(async (v) => ({
		...v,
		keywords: v.keywords.add(keyword),
	}));
