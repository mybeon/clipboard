import React from "react";

type Props = {
    children?: React.ReactNode;
    label: string;
    placeholder: string;
    type?: React.HTMLInputTypeAttribute;
    id?: string;
};

const Input = ({ id, label, type = "text", placeholder }: Props) => {
    return (
        <div className="input">
            <label htmlFor={id || label}>{label}</label>
            <input type={type} placeholder={placeholder} id={id || label} />
        </div>
    );
};

export default Input;
