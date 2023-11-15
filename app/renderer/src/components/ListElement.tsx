import React, { useContext } from "react";
import { HiCheck, HiOutlineDocumentText } from "react-icons/hi";
import type { ClipboardElement } from "../../../types";
import { GlobalContext, REDUCER_ACTION_TYPE } from "../context/global";
import type { ElectronAPI } from "../types";
import formatDate from "../utils/formatDate";
import truncate from "../utils/truncate";
import Tooltip from "./Tooltip";

type Props = {
    children?: React.ReactNode;
    element: ClipboardElement;
    selectable?: boolean;
    selectedItems?: ClipboardElement[];
    onSelectItem?: (element: ClipboardElement) => void;
};

declare const electronAPI: ElectronAPI;

const ListElement = ({
    element,
    selectable = false,
    onSelectItem = () => {},
    selectedItems,
}: Props) => {
    const { dispatch } = useContext(GlobalContext);

    function copyToClipboard() {
        electronAPI.writeToClipboard(element.text);
        dispatch({ type: REDUCER_ACTION_TYPE.SHOW_POPUP, value: "copied to clipboard" });
    }

    const isSelected = selectedItems?.some(sel => sel.id === element.id);

    function selectItem() {
        onSelectItem(element);
    }

    return (
        <li data-content={element.text}>
            {selectable ? (
                <div className="icon-wrapper">
                    <div
                        className="checkbox"
                        onClick={selectItem}
                        style={{ backgroundColor: isSelected ? "#303030" : "rgb(247, 247, 247)" }}
                    >
                        {isSelected && <HiCheck color="rgb(247, 247, 247)" size={24} />}
                    </div>
                </div>
            ) : (
                <div className="icon-wrapper">
                    <HiOutlineDocumentText className="doc" size={32} color="#aaaaaa" />
                </div>
            )}
            <div className="content" onClick={copyToClipboard}>
                <p>{truncate(element.text)}</p>
                <div className="info">
                    <span>{formatDate(element.date)}</span>
                    {element.text.length > 34 && <Tooltip content={element.text} />}
                </div>
            </div>
        </li>
    );
};

export default ListElement;
