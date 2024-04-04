import clsx from "clsx";
import { Component } from "solid-js";
import { themeClass } from "../../styles/theme.css";
import { KeywordsMenu } from "./keywords-menu";
import * as styles from "./options-menu.css";
import { ResolutionMenu } from "./resolution-menu/";

export const OptionsMenu: Component = () => {
	return (
		<div class={clsx(themeClass, styles.root, "dark")}>
			<KeywordsMenu />
			<div class="large-divider" />
			<ResolutionMenu />
		</div>
	);
};
