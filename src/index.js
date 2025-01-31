import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.css"; // 전역 스타일

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
