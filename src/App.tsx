import {
	Component,
	createResource,
	onMount,
	createSignal,
	createMemo,
} from "solid-js";
import * as styles from "./app.css";
import { wallpaperStore } from "./stores/wallpaper-store";
import { fetchData } from "./fetch-data";
import { generatePalette } from "palette-by-numbers";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { primaryColorVars, themeClass } from "./styles/theme.css";
import clsx from "clsx";
import dayjs from "dayjs";

const preloadedData = wallpaperStore.get();

const createClockSignal = () => {
	const [getDate, setDate] = createSignal(dayjs());

	onMount(() => {
		setInterval(() => {
			setDate(dayjs());
		}, 1000);
	});

	return getDate;
};

const App: Component = () => {
	const date = createClockSignal();

	const [fetchedData] = createResource("data", fetchData);
	const data = createMemo(() => preloadedData ?? fetchedData());

	const colorPalette = createMemo(() =>
		data() ? generatePalette(data()?.mainColor ?? "") : null,
	);
	const themeVarStyles = createMemo(() =>
		colorPalette()
			? assignInlineVars(primaryColorVars, colorPalette() as never)
			: {},
	);

	return (
		<div class={clsx(themeClass, styles.root)} style={themeVarStyles()}>
			<img src={data()?.backgroundImageURL} class={styles.bgImage} />
			<svg
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
				class={styles.shape}
			>
				<polygon
					points={`0,0 ${styles.SHAPE_TOP_WIDTH_PERCENTAGE},0 ${styles.SHAPE_BOTTOM_WIDTH_PERCENTAGE},100 0,100`}
				/>
			</svg>
			<div class={styles.content}>
				<div class={styles.textContainer}>
					<div class={styles.time}>{date().format("HH:mm:ss")}</div>
					<div class={styles.divider} />
					<div class={styles.date}>{date().format("MMMM DD")}</div>
				</div>
			</div>
		</div>
	);
};

export default App;
