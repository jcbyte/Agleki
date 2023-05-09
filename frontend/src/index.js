import React from "react";
import { render } from "react-dom";
import ThemedApp from "./components/ThemedApp";

const appDiv = document.getElementById("app");
render(<ThemedApp />, appDiv);
