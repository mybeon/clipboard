import React, { createContext, useReducer } from "react";
import type { ClipboardElement } from "../../../types";

const initialState: {
    popup: { isPopupVisible: boolean; message: string };
    data: ClipboardElement[] | undefined;
} = {
    popup: { isPopupVisible: false, message: "" },
    data: undefined,
};

export const enum REDUCER_ACTION_TYPE {
    SHOW_POPUP,
    HIDE_POPUP,
    UPDATE_DATA,
    CLEAR_DATA,
}

type ReducerAction = {
    type: REDUCER_ACTION_TYPE;
    value?: boolean | string | object;
};

function reducer(state: typeof initialState, action: ReducerAction): typeof initialState {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.SHOW_POPUP:
            return {
                ...state,
                popup: {
                    isPopupVisible: true,
                    message: typeof action.value === "string" ? action.value : "",
                },
            };

        case REDUCER_ACTION_TYPE.HIDE_POPUP:
            return {
                ...state,
                popup: {
                    isPopupVisible: false,
                    message: "",
                },
            };

        case REDUCER_ACTION_TYPE.UPDATE_DATA:
            return { ...state, data: Array.isArray(action.value) ? action.value : [] };

        case REDUCER_ACTION_TYPE.CLEAR_DATA:
            return { ...state, data: [] };

        default:
            return state;
    }
}

export const GlobalContext = createContext({
    state: initialState,
    dispatch: (action: ReducerAction): void => {}, // eslint-disable-line
});

export const GlobalContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>;
};
