import { getBucket } from "@extend-chrome/storage";
import { A, D, F, flow } from "@mobily/ts-belt";
import { z } from "zod";
import { then } from "../utils";

export const simpleNewTabSettingsSchema = z.object({
	keywords: z.array(z.string()).transform(A.uniq),
	wallpaperWidth: z.number().min(1),
	wallpaperHeight: z.number().min(1),
});

export type SimpleNewTabSettings = z.infer<typeof simpleNewTabSettingsSchema>;

type SettingsStoreUpdater = (s: SimpleNewTabSettings) => SimpleNewTabSettings;

export const defaultSettingsStoreData: SimpleNewTabSettings = {
	keywords: [],
	wallpaperHeight: 1080,
	wallpaperWidth: 1920,
};

const settingsStore = getBucket<SimpleNewTabSettings>("settings");

export const applyDefaultSettings = () =>
	settingsStore.set(defaultSettingsStoreData);

export const getSettings = () =>
	settingsStore.get().then((storedSettings) => {
		const unparsedSettings = {
			...defaultSettingsStoreData,
			...storedSettings,
		};

		return simpleNewTabSettingsSchema.parse(unparsedSettings);
	});

const updateSettings = (updater: SettingsStoreUpdater) =>
	flow(
		getSettings,
		then((settings) => {
			const newSettings = updater(settings);
			const parsed = simpleNewTabSettingsSchema.parse(newSettings);
			return settingsStore.set(parsed);
		}),
	)();

export const composeAddKeywordUpdater = (
	newKeyword: string,
): SettingsStoreUpdater =>
	D.updateUnsafe(
		"keywords",
		F.unless(A.includes(newKeyword), A.append(newKeyword)),
	);

export const postNewKeyword = (newKeyword: string) =>
	updateSettings(composeAddKeywordUpdater(newKeyword));

export const composeDeleteKeywordUpdater = (
	targetKeyword: string,
): SettingsStoreUpdater =>
	D.updateUnsafe("keywords", A.reject(F.equals(targetKeyword)));

export const deleteKeyword = (targetKeyword: string) =>
	updateSettings(composeDeleteKeywordUpdater(targetKeyword));

export type WallpaperResolution = { width: number; height: number };

export const composeSetWallpaperResolutionUpdater = ({
	height,
	width,
}: WallpaperResolution): SettingsStoreUpdater =>
	flow(D.set("wallpaperHeight", height), D.set("wallpaperWidth", width));

export const updateWallpaperResolution = (resolution: WallpaperResolution) =>
	updateSettings(composeSetWallpaperResolutionUpdater(resolution));
