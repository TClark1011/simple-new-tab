import { Component } from "solid-js";
import "modern-normalize";
import "beercss";
import "./styles/beer-vars.css";
import { render } from "solid-js/web";

export const renderPage = (Page: Component) =>
	render(() => <Page />, document.getElementById("root") as HTMLElement);
