import React from "react";
import Input from "../UI/Input";
import Google from "./Google";

type Props = {
    children?: React.ReactNode;
};

const Login = (props: Props) => {
    return (
        <React.Fragment>
            <Input label="email" placeholder="example@example.com" type="email" />
            <Input label="password" placeholder="password" type="password" />
            <button className="btn" style={{ fontSize: 14, marginTop: 10 }}>
                login
            </button>
            <Google />
        </React.Fragment>
    );
};

export default Login;
