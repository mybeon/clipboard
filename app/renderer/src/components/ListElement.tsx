import React, { useContext } from "react";
import type { ClipboardElement } from "../../../types";
import { GlobalContext, REDUCER_ACTION_TYPE } from "../context/global";
import type { ElectronAPI } from "../types";
import formatDate from "../utils/formatDate";
import truncate from "../utils/truncate";

type Props = {
    children?: React.ReactNode;
    element: ClipboardElement;
};

declare const electronAPI: ElectronAPI;

const ListElement = ({ element }: Props) => {
    const { dispatch } = useContext(GlobalContext);
    function onClickHandler() {
        electronAPI.writeToClipboard(element.text);
        dispatch({ type: REDUCER_ACTION_TYPE.SHOW_POPUP, value: "copied to clipboard" });
    }

    return (
        <li data-content={element.text} onClick={onClickHandler}>
            <img src="./icons/doc.svg" />
            <div className="content">
                <p>{truncate(element.text)}</p>
                <div className="info">
                    <span>{formatDate(element.date)}</span>
                    {element.text.length > 34 ? <img src="./icons/tooltip.svg" /> : ""}
                </div>
            </div>
        </li>
    );
};

export default ListElement;
