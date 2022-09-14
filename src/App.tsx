import { Component, onMount } from "solid-js";

import { store } from "./store";
import { fetchData } from "./fetch-data";

const data = store.get();

// if (!data) {
// 	throw new Error("No data");
// }

const App: Component = () => {
	onMount(fetchData);
	return (
		<div>
			<p>Background URL: {data?.backgroundImageURL}</p>
			<p>Color: {data?.mainColor}</p>
		</div>
	);
};

export default App;
