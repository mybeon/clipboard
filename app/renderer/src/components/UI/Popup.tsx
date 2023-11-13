import React, { useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { GlobalContext, REDUCER_ACTION_TYPE } from "../../context/global";

const element = document.querySelector("#root")!;

const PopupComponent = () => {
    const {
        state: { popup },
        dispatch,
    } = useContext(GlobalContext);

    useEffect(() => {
        if (popup.isPopupVisible) {
            const timeout = setTimeout(() => {
                dispatch({ type: REDUCER_ACTION_TYPE.HIDE_POPUP });
            }, 1500);

            return () => clearTimeout(timeout);
        }
    }, [popup.isPopupVisible]);

    return popup.isPopupVisible ? <span className="notification">{popup.message}</span> : <></>;
};

const Popup = () => {
    return <React.Fragment>{createPortal(<PopupComponent />, element)}</React.Fragment>;
};

export default Popup;
