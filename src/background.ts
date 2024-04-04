import { applyDefaultSettings } from "./stores/settings-store";

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
	try {
		if (reason === "install") {
			await applyDefaultSettings();
		}
	} catch (e) {
		console.log("An error happened while applying default settings:");
		// console.log(e);
	}
});
