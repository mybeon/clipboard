import { arrayUnion, doc, setDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { HiOutlinePencilAlt, HiOutlineRefresh, HiOutlineX } from "react-icons/hi";
import type { ClipboardElement } from "../../../../electron/src/types";
import { AuthContext } from "../../context/auth";
import { GlobalContext, REDUCER_ACTION_TYPE } from "../../context/global";
import { db } from "../../firebase";
import type { ElectronAPI } from "../../types";
import ListElement from "../ListElement";
import Button from "../UI/Button";
import Prompt from "../UI/Prompt";
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
    const [isPromptVisible, setIsPromptVisible] = useState<boolean>(false);
    const [isSynching, setIsSynching] = useState<boolean>(false);

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

    async function synchData() {
        try {
            if (isSynching) return;
            if (!userId) throw new Error();

            setIsSynching(true);

            const reference = doc(db, "clipboard", userId);
            await setDoc(reference, { items: arrayUnion(...selectedItems) }, { merge: true });

            setIsSynching(false);
            dispatch({ type: REDUCER_ACTION_TYPE.SHOW_POPUP, value: "Synched successfully" });
        } catch (e) {
            setIsSynching(false);
            dispatch({ type: REDUCER_ACTION_TYPE.SHOW_POPUP, value: "Synch error !" });
        }
    }

    function onclickHandler() {
        setIsPromptVisible(true);
    }

    function onPromptConfirm() {
        electronAPI.clearClipboard();
        dispatch({ type: REDUCER_ACTION_TYPE.CLEAR_DATA });
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
                <Prompt
                    message="Are you sure you want to delete all your <strong>local</strong> items ?"
                    state={isPromptVisible}
                    setState={setIsPromptVisible}
                    onPromptConfirm={onPromptConfirm}
                />
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
                            <HiOutlineRefresh
                                className={isSynching ? "synching" : ""}
                                {...iconStyle}
                                onClick={synchData}
                            />
                            <HiOutlineX {...iconStyle} onClick={cancelSelection} />
                            {/* <HiOutlineTrash {...iconStyle} /> */}
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
