import React from "react";
import { FcGoogle } from "react-icons/fc";

const Google = () => {
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
