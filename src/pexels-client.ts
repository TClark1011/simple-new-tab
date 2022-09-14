import { createClient } from "pexels";

console.log(
	"(pexels-client) import.meta.env.VITE_API_KEY: ",
	import.meta.env.VITE_API_KEY,
);

export const pexelsClient = createClient(import.meta.env.VITE_API_KEY);
