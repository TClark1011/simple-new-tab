import {
	Component,
	createResource,
	onMount,
	createSignal,
	createMemo,
} from "solid-js";

import { store } from "./store";
import { fetchData } from "./fetch-data";

const preloadedData = store.get();

const App: Component = () => {
	const [baseData] = createSignal(preloadedData);
	const [fetchedData] = createResource("data", fetchData);

	const dataToUse = createMemo(() => preloadedData ?? fetchedData());
	return (
		<div>
			<p>Background URL: {dataToUse()?.backgroundImageURL}</p>
			<p>Color: {dataToUse()?.mainColor}</p>
		</div>
	);
};

export default App;
