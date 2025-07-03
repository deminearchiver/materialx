/* @refresh reload */
import { render } from "solid-js/web";
// import "./main.css";
import App from "./App.tsx";

import "~/styles/theme.css";

const root = document.getElementById("root");

render(() => <App />, root!);
