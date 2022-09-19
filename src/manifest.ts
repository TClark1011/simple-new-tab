import { defineManifest } from "@crxjs/vite-plugin";
import packageFile from "../package.json";

const manifest = defineManifest((env) => ({
	manifest_version: 3,
	name: `Simple New Tab ${env.mode === "development" ? " (__DEV__)" : ""}`,
	version: packageFile.version,
	action: {
		default_popup: "popup.html",
	},
	chrome_url_overrides: {
		newtab: "index.html",
	},
	background: {
		service_worker: "src/background.ts",
	},
	icons: {
		128: "src/assets/icon.png",
	},
	permissions: ["storage"],
}));

export default manifest;
