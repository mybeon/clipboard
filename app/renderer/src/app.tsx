import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import Header from "./components/Header";
import List from "./components/List";
import Popup from "./components/UI/Popup";
import { AUTH_REDUCER_ACTION_TYPE, AuthContext } from "./context/auth";
import { GlobalContextProvider } from "./context/global";
import { auth } from "./firebase";

function app() {
    const { dispatch } = useContext(AuthContext);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, observer => {
            if (
                observer &&
                typeof observer.displayName === "string" &&
                typeof observer.email === "string"
            ) {
                dispatch({
                    type: AUTH_REDUCER_ACTION_TYPE.LOGIN,
                    value: {
                        displayName: observer.displayName,
                        email: observer.email,
                        userId: observer.uid,
                    },
                });
            } else {
                dispatch({
                    type: AUTH_REDUCER_ACTION_TYPE.LOGOUT,
                    value: { displayName: "", email: "", userId: "" },
                });
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <GlobalContextProvider>
            <Header />
            <List />
            <Popup />
        </GlobalContextProvider>
    );
}

export default app;
