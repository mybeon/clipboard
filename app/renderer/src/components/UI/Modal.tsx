import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { GrClose } from "react-icons/gr";

type Props = {
    children?: React.ReactNode;
    isVisible: boolean;
    onModalClose: () => void;
};

const Modal = (props: Props) => {
    return (
        <AnimatePresence>
            {props.isVisible && (
                <motion.div
                    className="modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="back-drop" onClick={props.onModalClose}></div>
                    <motion.div
                        className="wrapper"
                        initial={{ y: 10 }}
                        animate={{ y: 0 }}
                        exit={{ y: 10 }}
                    >
                        <GrClose
                            size={20}
                            color="#303030"
                            style={{ marginLeft: "auto", cursor: "pointer", marginBottom: 20 }}
                            onClick={props.onModalClose}
                        />
                        {props.children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
