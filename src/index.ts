import { Router } from "./router";
import "./global.styles.css";

const $root = document.getElementById("root");

if (!$root) {
  throw new Error("Root element not found");
}
Router();
