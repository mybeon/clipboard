import React from "react";
import Input from "../UI/Input";
import Google from "./Google";

type Props = {
    children?: React.ReactNode;
};

const Register = (props: Props) => {
    return (
        <React.Fragment>
            <Input label="email" placeholder="example@example.com" type="email" />
            <Input label="password" placeholder="password" type="password" />
            <Input
                label="Confirm password"
                placeholder="confirm password"
                type="password"
                id="confirm-password"
            />
            <button className="btn" style={{ fontSize: 14, marginTop: 10 }}>
                register
            </button>
            <Google />
        </React.Fragment>
    );
};

export default Register;
