import { createTheme, createThemeContract } from "@vanilla-extract/css";

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
	},
	spacing: {
		xs: "2px",
		sm: "4px",
		md: "8px",
		lg: "16px",
		xl: "32px",
		xxl: "64px",
	},
	font: {
		heading: '"Bebas Neue", sans-serif',
	},
});
