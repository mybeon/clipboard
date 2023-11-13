import React from "react";

type Props = {
    children?: React.ReactNode;
};

const Google = (props: Props) => {
    return (
        <React.Fragment>
            <div className="divider"></div>
            <button className="btn" style={{ margin: "20px auto 10px auto" }}>
                <img
                    height={25}
                    style={{ marginRight: 15 }}
                    src="/icons/google.svg"
                    alt="sign in with google"
                />
                sign in with google
            </button>
        </React.Fragment>
    );
};

export default Google;
