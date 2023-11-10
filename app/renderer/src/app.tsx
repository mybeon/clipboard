import React from "react";
import Header from "./components/Header";
import List from "./components/List";
import Popup from "./components/Popup";
import { GlobalContextProvider } from "./context/global";

function app() {
    return (
        <GlobalContextProvider>
            <Header />
            <List />
            <Popup />
            <span className="tooltip"></span>
        </GlobalContextProvider>
    );
}

export default app;
