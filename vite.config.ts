import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./src/manifest";
import { replaceCodePlugin } from "vite-plugin-replace";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig(({ mode }) => ({
	plugins: [
		solidPlugin(),
		crx({
			manifest,
		}),
		replaceCodePlugin({
			replacements: [
				{
					from: "process",
					to: "{}",
				},
				{
					from: `require("isomorphic-fetch");`,
					to: `import "isomorphic-fetch";`,
				},
			],
		}),
		vanillaExtractPlugin(),
	],
	server: {
		port: 3000,
	},
	build: {
		target: "esnext",
		outDir: mode === "development" ? "compiled" : "dist",
	},
}));
