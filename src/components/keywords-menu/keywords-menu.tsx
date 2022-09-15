import { F, flow, G, pipe } from "@mobily/ts-belt";
import clsx from "clsx";
import {
	Component,
	createEffect,
	createResource,
	createSignal,
	For,
	Match,
	Switch,
} from "solid-js";
import { fetchData } from "../../fetch-data";
import {
	applyAddKeyword,
	applyKeywordDelete,
	deleteKeyword,
	postNewKeyword,
	safeGetSettings,
	settingsStore,
} from "../../stores/settings-store";
import { themeClass } from "../../styles/theme.css";
import { runIfParamIsDefined } from "../../utils";
import * as styles from "./keywords-menu.css";

settingsStore.get().then((data) => console.log("(keywords-menu) data: ", data));

export const KeywordsMenu: Component = () => {
	const [getSettingsResult, { mutate }] = createResource(safeGetSettings);
	const [inputState, setInputState] = createSignal("");

	const handleAddKeyword = async () => {
		mutate(runIfParamIsDefined(applyAddKeyword(inputState())));
		postNewKeyword(inputState()).then(fetchData); // Re-fetch wallpaper to use next time
		setInputState("");
	};

	const handleDeleteKeyword = async (keyword: string) => {
		mutate(runIfParamIsDefined(applyKeywordDelete(keyword))); //Re-fetch wallpaper to use next time
		deleteKeyword(keyword).then(fetchData);
	};

	return (
		<div class={clsx(themeClass, styles.root, "dark")}>
			<Switch>
				<Match when={getSettingsResult.loading}>
					<div>Loading...</div>
				</Match>
				<Match when={getSettingsResult.error}>
					<div>Error loading settings</div>
				</Match>
				<Match keyed when={getSettingsResult()?.keywords}>
					{/* Main Content Here */}
					{(keywords) => (
						<>
							<ul class={styles.activeItemList}>
								<For each={keywords} fallback={<div>No Keywords</div>}>
									{(word) => (
										<li
											class={clsx("chip small round", styles.chip)}
											tabIndex={0}
											onClick={[handleDeleteKeyword, word]}
										>
											<span>{word}</span>
											<i class="small">close</i>
										</li>
									)}
								</For>
							</ul>
							<form class={styles.inputRow} onSubmit={handleAddKeyword}>
								<div
									class={clsx(
										"field label border small",
										styles.newKeywordInput,
									)}
								>
									<input
										type="text"
										onInput={(e) => setInputState(e.currentTarget.value ?? "")}
										value={inputState()}
									></input>
									<label>Add Keyword</label>
								</div>
								<button type="submit">Add</button>
							</form>
						</>
					)}
				</Match>
			</Switch>
		</div>
	);
};
