import React, { useContext, useState } from "react";
import { GlobalContext, REDUCER_ACTION_TYPE } from "../context/global";
import type { ElectronAPI } from "../types";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Modal from "./UI/Modal";
import Tabs from "./UI/Tabs";

declare const electronAPI: ElectronAPI;

const tabsData = [
    { id: 0, title: "login", element: <Login /> },
    { id: 1, title: "register", element: <Register /> },
];

const Header = () => {
    const { dispatch } = useContext(GlobalContext);
    const [isModalVisible, setIsModalVisible] = useState(false);

    function onclickHandler() {
        electronAPI.clearClipboard();
        dispatch({ type: REDUCER_ACTION_TYPE.CLEAR_DATA });
    }

    function openModal() {
        setIsModalVisible(true);
    }

    function closeModal() {
        setIsModalVisible(false);
    }

    return (
        <header>
            <div className="user" onClick={openModal}>
                <img src="/icons/user.svg" height={30} />
                <span>Login</span>
            </div>
            <Modal isVisible={isModalVisible} onModalClose={closeModal}>
                <Tabs data={tabsData} />
            </Modal>
            <button id="clear" onClick={onclickHandler} className="btn">
                clear
            </button>
        </header>
    );
};

export default Header;
