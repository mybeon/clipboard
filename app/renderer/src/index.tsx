import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { AuthContextProvider } from "./context/auth";
import "./style.css";

const root = (
    <React.StrictMode>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </React.StrictMode>
);

ReactDOM.createRoot(document.querySelector("#root")!).render(root);
