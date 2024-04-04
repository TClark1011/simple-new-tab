import clsx from "clsx";
import {
	Component,
	createEffect,
	createResource,
	createSignal,
} from "solid-js";
import {
	composeSetWallpaperResolutionUpdater,
	getSettings,
	updateWallpaperResolution,
} from "../../../stores/settings-store";
import * as styles from "./resolution-menu.css";
import * as sharedStyles from "../options-menu.css";
import { runIfParamIsDefined } from "../../../utils";
import { fetchData } from "../../../fetch-data";

export const ResolutionMenu: Component = () => {
	const [settingsState, { mutate }] = createResource(getSettings);

	const [widthInputState, setWidthInputState] = createSignal("");
	const [heightInputState, setHeightInputState] = createSignal("");

	const [settingsAreUpdating, setSettingsAreUpdating] = createSignal(false);

	createEffect(() => {
		const settings = settingsState();
		if (!settings) return;

		setWidthInputState(String(settings.wallpaperWidth));
		setHeightInputState(String(settings.wallpaperHeight));
	});

	const handleSave = async (e: Event) => {
		e.preventDefault();
		const width = Number(widthInputState());
		const height = Number(heightInputState());

		mutate(
			runIfParamIsDefined(
				composeSetWallpaperResolutionUpdater({ width, height }),
			),
		);

		setSettingsAreUpdating(true);
		updateWallpaperResolution({ width, height })
			.then(fetchData)
			.finally(() => setSettingsAreUpdating(false));
	};

	return (
		<form class={styles.root} onSubmit={handleSave}>
			<h2 class={clsx(sharedStyles.optionsHeader, styles.header)}>
				Wallpaper Resolution
			</h2>
			<div class={styles.fields}>
				<div class={clsx(styles.fieldWrapper, "field label border")}>
					<input
						disabled={settingsAreUpdating()}
						value={widthInputState()}
						type="text"
						onInput={(e) => setWidthInputState(e.currentTarget.value ?? "")}
					/>
					<label>Width</label>
				</div>
				<div class={clsx(styles.fieldWrapper, "field label border")}>
					<input
						disabled={settingsAreUpdating()}
						value={heightInputState()}
						type="text"
						onInput={(e) => setHeightInputState(e.currentTarget.value ?? "")}
					/>
					<label>Height</label>
				</div>
				<button class="square round small" type="submit">
					<i>save</i>
				</button>
			</div>
		</form>
	);
};
