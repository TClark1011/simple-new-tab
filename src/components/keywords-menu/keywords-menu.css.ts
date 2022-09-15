import { style } from "@vanilla-extract/css";
import { important } from "../../styles/styleUtils";
import { themeVars } from "../../styles/theme.css";

export const root = style({
	width: "400px",
	// backgroundColor: themeVars.colors.uiSurface,
	padding: themeVars.spacing.md,
});

export const activeItemList = style({
	display: "inline-flex",
	flexWrap: "wrap",
	gap: themeVars.spacing.sm,
	marginBottom: themeVars.spacing.md,
});

export const chip = style({
	margin: important(0),
	cursor: "pointer",
});

export const inputRow = style({
	width: "100%",
	display: "flex",
	gap: themeVars.spacing.sm,
});

export const newKeywordInput = style({
	flexGrow: 1,
	marginBottom: important(0),
});
