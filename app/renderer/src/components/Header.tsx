import React, { useState } from "react";
import { HiUserCircle } from "react-icons/hi";
import type { Tab } from "../types";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Modal from "./UI/Modal";
import Tabs from "./UI/Tabs";

const tabsData: Tab[] = [
    { id: 0, title: "login", element: <Login /> },
    { id: 1, title: "register", element: <Register /> },
];

const Header = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    function openModal() {
        setIsModalVisible(true);
    }

    function closeModal() {
        setIsModalVisible(false);
    }

    return (
        <header>
            <div className="user" onClick={openModal}>
                <HiUserCircle size={30} color="#303030" />
                <span>Login</span>
            </div>
            <Modal isVisible={isModalVisible} onModalClose={closeModal}>
                <Tabs data={tabsData} />
            </Modal>
        </header>
    );
};

export default Header;
