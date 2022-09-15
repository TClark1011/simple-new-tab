import { F, flow, G, pipe } from "@mobily/ts-belt";
import {
	Component,
	createEffect,
	createResource,
	createSignal,
	For,
	Match,
	Switch,
} from "solid-js";
import {
	applyAddKeyword,
	applyKeywordDelete,
	deleteKeyword,
	postNewKeyword,
	safeGetSettings,
	settingsStore,
} from "../../stores/settings-store";
import { runIfParamIsDefined } from "../../utils";
import * as styles from "./keywords-menu.css";

settingsStore.get().then((data) => console.log("(keywords-menu) data: ", data));

export const KeywordsMenu: Component = () => {
	const [settings, { mutate }] = createResource(safeGetSettings);
	const [inputState, setInputState] = createSignal("");

	const addKeyword = async () => {
		mutate(runIfParamIsDefined(applyAddKeyword(inputState())));
		setInputState("");
		await postNewKeyword(inputState());
	};

	const handleDeleteKeyword = async (keyword: string) => {
		mutate(runIfParamIsDefined(applyKeywordDelete(keyword)));
		await deleteKeyword(keyword);
	};

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
							<For each={keywords} fallback={<div>No Keywords</div>}>
								{(word) => (
									<li>
										<div>{word}</div>
										<button onClick={[handleDeleteKeyword, word]}>
											Delete
										</button>
									</li>
								)}
							</For>
						</ul>
						<input
							type="text"
							onInput={(e) => setInputState(e.currentTarget.value ?? "")}
							value={inputState()}
							placeholder="Add New Keyword"
						/>
						<button onClick={addKeyword}>Add</button>
					</div>
				)}
			</Match>
		</Switch>
	);
};
