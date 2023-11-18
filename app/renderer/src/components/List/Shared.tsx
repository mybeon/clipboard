import { doc, onSnapshot, setDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ClipboardElement } from "../../../../types";
import { AuthContext } from "../../context/auth";
import { db } from "../../firebase";
import ListElement from "../ListElement";
import Button from "../UI/Button";
import Prompt from "../UI/Prompt";
import Spinner from "../UI/Spinner";

const Shared = () => {
    const {
        state: { userId },
    } = useContext(AuthContext);

    const [data, setData] = useState<ClipboardElement[] | undefined>(undefined);
    const [isPromptVisible, setIsPromptVisible] = useState<boolean>(false);

    useEffect(() => {
        if (!userId) return;
        const reference = doc(db, "clipboard", userId);
        const unsubscribe = onSnapshot(
            reference,
            doc => {
                const { items } = doc.data() as { items: ClipboardElement[] };
                setData(items.reverse());
            },
            err => {
                console.log(err); // eslint-disable-line
            }
        );

        return () => unsubscribe();
    }, []);

    function onclickHandler() {
        setIsPromptVisible(true);
    }

    async function onPromptConfirm() {
        const reference = doc(db, "clipboard", userId);
        await setDoc(reference, { items: [] });
    }

    if (!navigator.onLine) {
        return <p className="empty">Network error !</p>;
    }

    if (!userId) {
        return <p className="empty">You have to be logged in first.</p>;
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
                <Prompt
                    message="Are you sure you want to delete all your <strong>synched</strong> items ?"
                    state={isPromptVisible}
                    setState={setIsPromptVisible}
                    onPromptConfirm={onPromptConfirm}
                />
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
