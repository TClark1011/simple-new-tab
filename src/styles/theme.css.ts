import { createTheme, createThemeContract, style } from "@vanilla-extract/css";
import { globalVar } from "./styleUtils";

export const primaryColorVars = createThemeContract({
	50: null,
	100: null,
	200: null,
	300: null,
	400: null,
	500: null,
	600: null,
	700: null,
	800: null,
	900: null,
});

const greyColorVars = createThemeContract({
	"50": "#CCD2DA",
	"100": "#C0C8D2",
	"200": "#A9B3C1",
	"300": "#919EB0",
	"400": "#79899F",
	"500": "#64748B",
	"600": "#4D596A",
	"700": "#353E4A",
	"800": "#1E2229",
	"900": "#060708",
});

export const [themeClass, themeVars] = createTheme({
	colors: {
		primary: primaryColorVars,
		gray: {
			"50": "#CCD2DA",
			"100": "#C0C8D2",
			"200": "#A9B3C1",
			"300": "#919EB0",
			"400": "#79899F",
			"500": "#64748B",
			"600": "#4D596A",
			"700": "#353E4A",
			"800": "#1E2229",
			"900": "#060708",
		},
		ui: {
			surface: globalVar("surface"),
			text: globalVar("on-surface"),
			outline: globalVar("outline"),
		},
	},
	spacing: {
		xs: "4px",
		sm: "8px",
		md: "16px",
		lg: "32px",
		xl: "64px",
	},
	font: {
		heading: '"Bebas Neue", sans-serif',
	},
});

export const bodyClass = style({
	backgroundColor: themeVars.colors.ui.surface,
	color: themeVars.colors.ui.text,
});
