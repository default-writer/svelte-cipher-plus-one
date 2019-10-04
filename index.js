import App from "./App.svelte";
import WebFont from "webfontloader";
import "./main.css";

WebFont.load({
  google: {
    families: ["Roboto Mono"]
  }
});

const app = new App({
  target: document.body
});

export default app;
