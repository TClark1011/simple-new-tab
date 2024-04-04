import clsx from "clsx";
import {
	Component,
	createResource,
	createSignal,
	For,
	Match,
	Switch,
} from "solid-js";
import { fetchData } from "../../../fetch-data";
import {
	composeAddKeywordUpdater,
	composeDeleteKeywordUpdater,
	deleteKeyword,
	postNewKeyword,
	getSettings,
} from "../../../stores/settings-store";
import { runIfParamIsDefined } from "../../../utils";
import * as styles from "./keywords-menu.css";
import * as sharedStyles from "../options-menu.css";

export const KeywordsMenu: Component = () => {
	let inputElement: HTMLInputElement | undefined;
	let keywordTagsContainerElement: HTMLDivElement | undefined;

	const [settings, { mutate }] = createResource(getSettings);
	const [inputState, setInputState] = createSignal("");

	const handleAddKeyword = async () => {
		mutate(runIfParamIsDefined(composeAddKeywordUpdater(inputState())));
		postNewKeyword(inputState()).then(fetchData); // Re-fetch wallpaper to use next time
		setInputState("");
		inputElement?.focus();
	};

	const handleDeleteKeyword = async (keyword: string) => {
		const indexOfDeletedWord = settings()?.keywords.indexOf(keyword) ?? -1;

		mutate(runIfParamIsDefined(composeDeleteKeywordUpdater(keyword))); //Re-fetch wallpaper to use next time

		deleteKeyword(keyword).then(fetchData);

		const childToFocus = keywordTagsContainerElement?.children[
			indexOfDeletedWord
		] as HTMLButtonElement | undefined;

		if (!childToFocus) {
			inputElement?.focus();
			return;
		}

		childToFocus.focus();
	};

	return (
		<div class={styles.root}>
			<Switch>
				<Match when={settings.loading}>
					<div>Loading...</div>
				</Match>
				<Match when={settings.error}>
					<div>Error loading settings</div>
				</Match>
				<Match keyed when={settings()?.keywords}>
					{(keywords) => (
						<>
							<h2 class={sharedStyles.optionsHeader}>Keywords</h2>
							<p class={styles.description}>
								Your keywords are used to select random wallpapers that match
								your interests.
							</p>
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
										ref={inputElement}
									></input>
									<label>Add Keyword</label>
								</div>
								<button type="submit">Add</button>
							</form>
							<div
								class={styles.activeItemList}
								ref={keywordTagsContainerElement}
							>
								<For each={keywords} fallback={<div>No Keywords</div>}>
									{(word) => (
										<button
											class={clsx(
												"chip small border round primary-border primary-text",
												styles.chip,
											)}
											tabIndex={0}
											onClick={[handleDeleteKeyword, word]}
										>
											<i class="small">close</i>
											<span>{word}</span>
										</button>
									)}
								</For>
							</div>
						</>
					)}
				</Match>
			</Switch>
		</div>
	);
};
