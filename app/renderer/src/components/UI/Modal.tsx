import React from "react";
import { GrClose } from "react-icons/gr";

type Props = {
    children?: React.ReactNode;
    isVisible: boolean;
    onModalClose: () => void;
};

const Modal = (props: Props) => {
    return (
        props.isVisible && (
            <div className="modal">
                <div className="back-drop" onClick={props.onModalClose}></div>
                <div className="wrapper">
                    <GrClose
                        size={20}
                        color="#303030"
                        style={{ marginLeft: "auto", cursor: "pointer", marginBottom: 20 }}
                        onClick={props.onModalClose}
                    />
                    {props.children}
                </div>
            </div>
        )
    );
};

export default Modal;
