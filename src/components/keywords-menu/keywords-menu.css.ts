import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/theme.css";

export const activeItemList = style({
	display: "flex",
	flexDirection: "column",
	gap: themeVars.spacing.sm,
});
