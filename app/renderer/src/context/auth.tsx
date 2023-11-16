import React, { createContext, useReducer } from "react";

const initialState: {
    displayName: string;
    email: string;
    userId: string;
} = {
    displayName: "...",
    email: "",
    userId: "",
};

export const enum AUTH_REDUCER_ACTION_TYPE {
    LOGIN,
    LOGOUT,
}

type ReducerAction = {
    type: AUTH_REDUCER_ACTION_TYPE;
    value?: boolean | string | Record<string, string>;
};

function reducer(state: typeof initialState, action: ReducerAction): typeof initialState {
    switch (action.type) {
        case AUTH_REDUCER_ACTION_TYPE.LOGIN:
            if (typeof action.value === "object") {
                return {
                    displayName: action.value.displayName,
                    email: action.value.email,
                    userId: action.value.userId,
                };
            }
            return state;
        case AUTH_REDUCER_ACTION_TYPE.LOGOUT:
            return { displayName: "", email: "", userId: "" };
        default:
            return state;
    }
}

export const AuthContext = createContext({
    state: initialState,
    dispatch: (action: ReducerAction): void => {}, // eslint-disable-line
});

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};
