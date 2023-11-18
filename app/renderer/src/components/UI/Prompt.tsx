import React from "react";
import Button from "./Button";
import Modal from "./Modal";

type Props = {
    children?: React.ReactNode;
    message: string;
    state: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
    onPromptConfirm: () => void;
};

const Prompt = ({ message, state, setState, onPromptConfirm }: Props) => {
    function closeModal() {
        setState(false);
    }

    function onPromptConfirmHandler() {
        onPromptConfirm();
        setState(false);
    }

    return (
        <Modal wrapperStyle={{ height: "unset" }} isVisible={state} onModalClose={closeModal}>
            <p dangerouslySetInnerHTML={{ __html: message }} />
            <div className="actions">
                <Button color="light" onClick={closeModal}>
                    cancel
                </Button>
                <Button className="confirm" onClick={onPromptConfirmHandler}>
                    yes
                </Button>
            </div>
        </Modal>
    );
};

export default Prompt;
