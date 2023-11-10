import React, { useContext } from "react";
import { GlobalContext, REDUCER_ACTION_TYPE } from "../context/global";
import type { ElectronAPI } from "../types";

declare const electronAPI: ElectronAPI;

const Header = () => {
    const { dispatch } = useContext(GlobalContext);

    function onclickHandler() {
        electronAPI.clearClipboard();
        dispatch({ type: REDUCER_ACTION_TYPE.CLEAR_DATA });
    }

    return (
        <header>
            <h1>Clipboard</h1>
            <button onClick={onclickHandler} className="btn">
                clear
            </button>
        </header>
    );
};

export default Header;
