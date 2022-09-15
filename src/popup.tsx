import "modern-normalize";
import { render } from "solid-js/web";
import { KeywordsMenu } from "./components/keywords-menu";

render(() => <KeywordsMenu />, document.getElementById("root") as HTMLElement);
