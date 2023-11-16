import React, { useContext, useEffect, useState } from "react";
import { HiOutlinePencilAlt, HiOutlineRefresh, HiOutlineTrash, HiOutlineX } from "react-icons/hi";
import { ClipboardElement } from "../../../../types";
import { AuthContext } from "../../context/auth";
import { GlobalContext, REDUCER_ACTION_TYPE } from "../../context/global";
import type { ElectronAPI } from "../../types";
import ListElement from "../ListElement";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";

declare const electronAPI: ElectronAPI;

const iconStyle = {
    size: 20,
    color: "#303030",
};

const Local = () => {
    const {
        state: { data },
        dispatch,
    } = useContext(GlobalContext);

    const {
        state: { userId },
    } = useContext(AuthContext);

    const [selectable, setSelectable] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<ClipboardElement[]>([]);

    function onclickHandler() {
        electronAPI.clearClipboard();
        dispatch({ type: REDUCER_ACTION_TYPE.CLEAR_DATA });
    }

    function onSelectItemHandler(element: ClipboardElement): void {
        const exists = selectedItems.some(sel => sel.id === element.id);
        if (exists) {
            setSelectedItems(selectedItems.filter(el => el.id !== element.id));
        } else {
            setSelectedItems(prev => [element, ...prev]);
        }
    }

    function cancelSelection() {
        setSelectable(false);
        setSelectedItems([]);
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            const content = await electronAPI.getClipboard();

            if (content.length !== data?.length) {
                dispatch({ type: REDUCER_ACTION_TYPE.UPDATE_DATA, value: content.reverse() });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [data]);

    if (data === undefined) {
        return <Spinner />;
    }

    if (data.length === 0) {
        return <p className="empty">Clipboard is empty !</p>;
    }

    return (
        <React.Fragment>
            <div className="tool-section">
                <Button id="clear" onClick={onclickHandler}>
                    clear all
                </Button>
                <div className="icons">
                    {!selectable ? (
                        <HiOutlinePencilAlt
                            {...iconStyle}
                            onClick={() => {
                                setSelectable(prev => !prev);
                            }}
                        />
                    ) : (
                        <>
                            <HiOutlineRefresh {...iconStyle} onClick={synchData} />
                            <HiOutlineX {...iconStyle} onClick={cancelSelection} />
                            <HiOutlineTrash {...iconStyle} />
                        </>
                    )}
                </div>
            </div>
            <ul id="list">
                {data.map(el => (
                    <ListElement
                        key={el.id}
                        element={el}
                        selectable={selectable}
                        selectedItems={selectedItems}
                        onSelectItem={onSelectItemHandler}
                    />
                ))}
            </ul>
        </React.Fragment>
    );
};

export default Local;
