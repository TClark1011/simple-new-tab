import { applyDefaultSettings } from "./stores/settings-store";

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
	if (reason === "install") {
		applyDefaultSettings();
	}
});
