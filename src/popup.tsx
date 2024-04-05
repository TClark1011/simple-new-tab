import "modern-normalize";
import { OptionsMenu } from "./components/options-menu";
import { renderPage } from "./render-page";
import { bodyClass, themeClass } from "./styles/theme.css";

const bodyElement = document.querySelector("body");

if (!bodyElement) throw new Error("No body element found");

bodyElement.classList.add(themeClass, bodyClass);

const userIsUsingDarkMode = window.matchMedia(
	"(prefers-color-scheme: dark)",
).matches;

if (userIsUsingDarkMode) {
	bodyElement.classList.add("dark");
} else {
	bodyElement.classList.add("light");
}

renderPage(OptionsMenu);
