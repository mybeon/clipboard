import React from "react";
import { BounceLoader } from "react-spinners";

const Spinner = () => {
    return (
        <div
            style={{
                height: "calc(100vh - 62px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <BounceLoader size={40} color="#303030" />
        </div>
    );
};

export default Spinner;
