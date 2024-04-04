import { style } from "@vanilla-extract/css";
import { important } from "../../../styles/styleUtils";
import { themeVars } from "../../../styles/theme.css";

export const root = style({
	width: "100%",
});

export const header = style({
	marginBottom: themeVars.spacing.md,
});

export const fields = style({
	display: "flex",
	alignItems: "center",
	gap: themeVars.spacing.sm,
});

export const fieldWrapper = style({
	marginTop: important("0px"),
	marginBottom: important("0px"),
});
