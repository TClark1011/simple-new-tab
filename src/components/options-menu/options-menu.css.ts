import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/theme.css";
import { GUTTER } from "./utils.css";

export const root = style({
	width: "400px",
	backgroundColor: themeVars.colors.ui.surface,
	color: themeVars.colors.ui.text,
	padding: GUTTER,
});

export const optionsHeader = style({
	fontWeight: "bold",
	fontSize: 16,
	marginBottom: themeVars.spacing.sm,
});
