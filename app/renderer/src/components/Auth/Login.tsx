import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { GlobalContext, REDUCER_ACTION_TYPE } from "../../context/global";
import { auth } from "../../firebase";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Google from "./Google";

type Props = {
    children?: React.ReactNode;
    onModalClose: () => void;
};

const Login = (props: Props) => {
    const { dispatch } = useContext(GlobalContext);
    const [loading, setLoading] = useState<boolean>(false);

    async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        setLoading(true);
        e.preventDefault();

        const email: string = e.target[0].value;
        const password: string = e.target[1].value;

        try {
            if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) || password.trim().length < 12)
                throw new Error("input error");

            await signInWithEmailAndPassword(auth, email, password);

            props.onModalClose();
            dispatch({ type: REDUCER_ACTION_TYPE.SHOW_POPUP, value: "login success" });
        } catch (e) {
            setLoading(false);
            dispatch({ type: REDUCER_ACTION_TYPE.SHOW_POPUP, value: e.message });
        }
    }

    return (
        <React.Fragment>
            <form onSubmit={onSubmitHandler}>
                <Input label="email" placeholder="example@example.com" type="email" />
                <Input label="password" placeholder="password" type="password" />
                <Button style={{ fontSize: 14, marginTop: 10 }} isLoading={loading}>
                    login
                </Button>
            </form>
            <Google />
        </React.Fragment>
    );
};

export default Login;
