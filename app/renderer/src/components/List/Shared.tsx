import { doc, onSnapshot, setDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ClipboardElement } from "../../../../types";
import { AuthContext } from "../../context/auth";
import { db } from "../../firebase";
import ListElement from "../ListElement";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";

const Shared = () => {
    const {
        state: { userId },
    } = useContext(AuthContext);

    const [data, setData] = useState<ClipboardElement[] | undefined>(undefined);

    useEffect(() => {
        const reference = doc(db, "clipboard", userId);
        const unsubscribe = onSnapshot(reference, doc => {
            const { items } = doc.data() as { items: ClipboardElement[] };
            setData(items);
        });

        return () => unsubscribe();
    }, []);

    async function onclickHandler() {
        const reference = doc(db, "clipboard", userId);
        await setDoc(reference, { items: [] });
    }

    if (data === undefined) {
        return <Spinner />;
    }

    if (data.length === 0) {
        return <p className="empty">No synched items !</p>;
    }

    return (
        <React.Fragment>
            <div className="tool-section">
                <Button id="clear" onClick={onclickHandler}>
                    clear all
                </Button>
            </div>
            <ul id="list">
                {data.map(el => (
                    <ListElement key={el.id} element={el} />
                ))}
            </ul>
        </React.Fragment>
    );
};

export default Shared;
