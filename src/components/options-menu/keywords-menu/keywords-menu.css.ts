import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { important } from "../../../styles/styleUtils";
import { themeVars } from "../../../styles/theme.css";
import { GUTTER } from "../utils.css";

export const root = style({
	width: "100%",
});

export const header = style({
	width: calc("100%").add(calc(GUTTER).multiply(2)).toString(),
	marginLeft: calc(GUTTER).negate().toString(),
	paddingLeft: GUTTER,
	paddingRight: GUTTER,
	paddingBottom: themeVars.spacing.sm,
	marginBottom: themeVars.spacing.md,
	borderBottom: `1px solid ${themeVars.colors.ui.text}`,
	fontWeight: "bold",
	fontSize: 24,
});

export const description = style({
	marginBottom: themeVars.spacing.md,
});

export const activeItemList = style({
	display: "inline-flex",
	flexWrap: "wrap",
	gap: themeVars.spacing.sm,
});

export const chip = style({
	margin: important(0),
	cursor: "pointer",
});

export const inputRow = style({
	width: "100%",
	display: "flex",
	gap: themeVars.spacing.sm,
	marginBottom: themeVars.spacing.md,
});

export const newKeywordInput = style({
	flexGrow: 1,
	marginBottom: important(0),
});
