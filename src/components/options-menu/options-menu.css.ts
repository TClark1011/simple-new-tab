import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/theme.css";
import { GUTTER } from "./utils.css";

export const root = style({
	width: "400px",
	padding: GUTTER,
});

export const optionsHeader = style({
	fontWeight: "bold",
	fontSize: 16,
	marginBottom: themeVars.spacing.sm,
});

export const divider = style({
	width: "100vw",
	position: "relative",
	left: "50%",
	right: "50%",
	borderBottomWidth: 1,
	borderBottomStyle: "solid",
	borderBottomColor: themeVars.colors.ui.outline,
	margin: `${themeVars.spacing.lg} -50vw`,
});
