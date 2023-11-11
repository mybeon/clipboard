import React, { useContext, useEffect } from "react";
import { GlobalContext, REDUCER_ACTION_TYPE } from "../context/global";
import type { ElectronAPI } from "../types";
import ListElement from "./ListElement";

declare const electronAPI: ElectronAPI;

const List = () => {
    const {
        state: { data },
        dispatch,
    } = useContext(GlobalContext);

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
        return <p>loading...</p>;
    }

    if (data.length === 0) {
        return <p className="empty">Clipboard is empty !</p>;
    }

    return (
        <ul id="list">
            {data.map(el => (
                <ListElement key={el.id} element={el} />
            ))}
        </ul>
    );
};

export default List;
