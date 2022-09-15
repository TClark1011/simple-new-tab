import { globalStyle, style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { important } from "../../styles/styleUtils";
import { themeVars } from "../../styles/theme.css";

const GUTTER = themeVars.spacing.md;

export const root = style({
	width: "400px",
	backgroundColor: themeVars.colors.ui.surface,
	color: themeVars.colors.ui.text,
	padding: GUTTER,
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

export const subHeader = style({
	fontWeight: "bold",
	fontSize: 16,
	marginBottom: themeVars.spacing.sm,
});

export const description = style({
	marginBottom: themeVars.spacing.md,
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
