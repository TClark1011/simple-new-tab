import clsx from "clsx";
import {
	Component,
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
} from "../../stores/settings-store";
import { themeClass } from "../../styles/theme.css";
import { runIfParamIsDefined } from "../../utils";
import * as styles from "./keywords-menu.css";

export const KeywordsMenu: Component = () => {
	let inputElement: HTMLInputElement | undefined;
	let keywordTagsContainerElement: HTMLDivElement | undefined;

	const [getSettingsResult, { mutate }] = createResource(safeGetSettings);
	const [inputState, setInputState] = createSignal("");

	const handleAddKeyword = async () => {
		mutate(runIfParamIsDefined(applyAddKeyword(inputState())));
		postNewKeyword(inputState()).then(fetchData); // Re-fetch wallpaper to use next time
		setInputState("");
		inputElement?.focus();
	};

	const handleDeleteKeyword = async (keyword: string) => {
		const indexOfDeletedWord =
			getSettingsResult()?.keywords.indexOf(keyword) ?? -1;

		mutate(runIfParamIsDefined(applyKeywordDelete(keyword))); //Re-fetch wallpaper to use next time

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
		<div class={clsx(themeClass, styles.root, "dark")}>
			<Switch>
				<Match when={getSettingsResult.loading}>
					<div>Loading...</div>
				</Match>
				<Match when={getSettingsResult.error}>
					<div>Error loading settings</div>
				</Match>
				<Match keyed when={getSettingsResult()?.keywords}>
					{(keywords) => (
						<>
							<h2 class={styles.subHeader}>
								<span>Keywords</span>
							</h2>
							<p class={styles.description}>
								Your keywords are used to select random wallpapers that match
								your interests.
							</p>
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
						</>
					)}
				</Match>
			</Switch>
		</div>
	);
};
