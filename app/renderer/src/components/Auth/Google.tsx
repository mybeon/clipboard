import React from "react";
import { FcGoogle } from "react-icons/fc";

type Props = {
    children?: React.ReactNode;
};

const Google = (props: Props) => {
    return (
        <React.Fragment>
            <div className="divider"></div>
            <button className="btn" style={{ margin: "20px auto 10px auto" }}>
                <FcGoogle size={30} style={{ marginRight: 15 }} />
                sign in with google
            </button>
        </React.Fragment>
    );
};

export default Google;
