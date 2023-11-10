import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./style.css";

const root = (
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

ReactDOM.createRoot(document.querySelector("#root")!).render(root);
