import { N } from "@mobily/ts-belt";
import { createVar, style } from "@vanilla-extract/css";
import { themeVars } from "./styles/theme.css";
import { mean } from "./utils";

export const SHAPE_TOP_WIDTH_PERCENTAGE = 30;
export const SHAPE_BOTTOM_WIDTH_PERCENTAGE = SHAPE_TOP_WIDTH_PERCENTAGE - 10;

export const root = style({
	position: "relative",
	height: "100vh",
	width: "100vw",
	overflow: "hidden",
});

export const bgImage = style({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	objectFit: "cover",
	backgroundColor: themeVars.colors.primary["100"],
});

export const shape = style({
	position: "absolute",
	top: 0,
	left: 0,
	fill: themeVars.colors.primary["600"],
	filter: "drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))",
});

export const content = style({
	position: "absolute",
	top: 0,
	left: 0,
	width: `${mean([
		SHAPE_TOP_WIDTH_PERCENTAGE,
		SHAPE_BOTTOM_WIDTH_PERCENTAGE,
	])}vw`,
	height: "100%",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	color: "white",
});

export const textContainer = style({
	display: "flex",
	flexDirection: "column",
	gap: "8px",
});

export const time = style({
	fontSize: "60px",
});

export const divider = style({
	height: "3px",
	width: "100%",
	backgroundColor: "white",
});

export const date = style({
	fontSize: "60px",
});
