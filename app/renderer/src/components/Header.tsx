import { signOut } from "firebase/auth";
import React, { useContext, useState } from "react";
import { HiOutlineLogout, HiUserCircle } from "react-icons/hi";
import { AuthContext } from "../context/auth";
import { GlobalContext, REDUCER_ACTION_TYPE } from "../context/global";
import { auth } from "../firebase";
import type { Tab } from "../types";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Modal from "./UI/Modal";
import Tabs from "./UI/Tabs";

const Header = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { state } = useContext(AuthContext);
    const { dispatch } = useContext(GlobalContext);

    function openModal() {
        if (!state.displayName) {
            setIsModalVisible(true);
        }
    }

    function closeModal() {
        setIsModalVisible(false);
    }

    async function logout() {
        await signOut(auth);
        dispatch({ type: REDUCER_ACTION_TYPE.SHOW_POPUP, value: "Logged out" });
    }

    const tabsData: Tab[] = [
        { id: 0, title: "login", element: <Login onModalClose={closeModal} /> },
        { id: 1, title: "register", element: <Register onModalClose={closeModal} /> },
    ];

    return (
        <header>
            <div className="user" onClick={openModal}>
                <div className="left">
                    <HiUserCircle size={30} color="#303030" />
                    <span>{state.displayName || "Login"}</span>
                </div>
                <div className="right">
                    {state.displayName && (
                        <HiOutlineLogout size={30} color="#303030" onClick={logout} />
                    )}
                </div>
            </div>
            <Modal isVisible={isModalVisible} onModalClose={closeModal}>
                <Tabs data={tabsData} />
            </Modal>
        </header>
    );
};

export default Header;
