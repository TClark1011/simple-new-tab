import { getBucket } from "@extend-chrome/storage";
import { A, D, F, pipe } from "@mobily/ts-belt";
import { asAsync } from "../utils";

export type SettingsStoreData = {
	keywords: string[];
};

export const defaultSettingsStoreData: SettingsStoreData = {
	keywords: [],
};

export const settingsStore = getBucket<SettingsStoreData>("settings");

export const applyDefaultSettings = () =>
	settingsStore.set(defaultSettingsStoreData);

export const safeGetSettings = () =>
	settingsStore.get().then((r) => ({ ...defaultSettingsStoreData, ...r }));

type SettingsStoreUpdater = (s: SettingsStoreData) => SettingsStoreData;

export const applyAddKeyword = (newKeyword: string): SettingsStoreUpdater =>
	D.updateUnsafe(
		"keywords",
		F.unless(A.includes(newKeyword), A.append(newKeyword)),
	);

export const postNewKeyword = (newKeyword: string) =>
	settingsStore.update(asAsync(applyAddKeyword(newKeyword)));

export const applyKeywordDelete = (
	targetKeyword: string,
): SettingsStoreUpdater =>
	D.updateUnsafe("keywords", A.reject(F.equals(targetKeyword)));

export const deleteKeyword = (targetKeyword: string) =>
	settingsStore.update(asAsync(applyKeywordDelete(targetKeyword)));
