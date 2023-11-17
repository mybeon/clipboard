import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useContext, useState } from "react";
import { GlobalContext, REDUCER_ACTION_TYPE } from "../../context/global";
import { auth } from "../../firebase";
import Button from "../UI/Button";
import Input from "../UI/Input";

type Props = {
    children?: React.ReactNode;
    onModalClose: () => void;
};

const Register = (props: Props) => {
    const { dispatch } = useContext(GlobalContext);
    const [loading, setLoading] = useState<boolean>(false);

    async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        setLoading(true);
        e.preventDefault();

        // /^[\w-\.]+@((gmail|outlook)+\.)+[\w-]{2,4}$/

        const username: string = e.target[0].value;
        const email: string = e.target[1].value;
        const password: string = e.target[2].value;

        try {
            if (
                !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) ||
                username.trim().length < 6 ||
                password.trim().length < 12
            )
                throw new Error("input error");

            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCred.user, { displayName: username });

            props.onModalClose();
            dispatch({ type: REDUCER_ACTION_TYPE.SHOW_POPUP, value: "account created" });
        } catch (e) {
            setLoading(false);
            dispatch({ type: REDUCER_ACTION_TYPE.SHOW_POPUP, value: e.message });
        }
    }

    return (
        <React.Fragment>
            <form onSubmit={onSubmitHandler} noValidate>
                <Input label="Username" placeholder="elon musk" />
                <Input label="email" placeholder="example@example.com" type="email" />
                <Input label="password" placeholder="password" type="password" />
                <Button
                    type="submit"
                    style={{ fontSize: 14, marginTop: 10 }}
                    color="light"
                    isLoading={loading}
                >
                    register
                </Button>
            </form>
            {/* <Google /> */}
        </React.Fragment>
    );
};

export default Register;
