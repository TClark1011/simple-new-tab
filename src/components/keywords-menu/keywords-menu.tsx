import {
	Component,
	createEffect,
	createResource,
	For,
	Match,
	Switch,
} from "solid-js";
import { safeGetSettings, settingsStore } from "../../stores/settings-store";
import * as styles from "./keywords-menu.css";

settingsStore.get().then((data) => console.log("(keywords-menu) data: ", data));

export const KeywordsMenu: Component = () => {
	const [settings] = createResource(safeGetSettings);

	return (
		<Switch>
			<Match when={settings.loading}>
				<div>Loading...</div>
			</Match>
			<Match when={settings.error}>
				<div>Error loading settings</div>
			</Match>
			<Match keyed when={settings()?.keywords}>
				{/* Main Content Here */}
				{(keywords) => (
					<div>
						<ul>
							<For
								each={[...keywords.values()]}
								fallback={<div>No Keywords</div>}
							>
								{(word) => <li>{word}</li>}
							</For>
						</ul>
						<input type="text" placeholder="Add New Keyword" />
					</div>
				)}
			</Match>
		</Switch>
	);
};
