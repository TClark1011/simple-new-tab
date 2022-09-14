import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import replace from "@rollup/plugin-replace";
import { replaceCodePlugin } from "vite-plugin-replace";

export default defineConfig({
	plugins: [
		solidPlugin(),
		crx({ manifest }),
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
	],
	server: {
		port: 3000,
	},
	build: {
		target: "esnext",
	},
});
