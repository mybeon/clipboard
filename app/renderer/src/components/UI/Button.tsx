import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    color?: "dark" | "light";
    icon?: React.JSX.Element;
    isLoading?: boolean;
}

const Button = ({ children, color = "dark", icon, style, isLoading, ...props }: Props) => {
    const isDark = color === "dark";

    const btnStyle: React.CSSProperties = {
        backgroundColor: isDark ? "#303030" : "#f7f7f7",
        color: isDark ? "#f7f7f7" : "#303030",
        border: isDark ? "none" : "2px solid #303030",
        opacity: isLoading ? 0.5 : 1,
        ...style,
    };

    return (
        <button className="btn" {...props} style={btnStyle} disabled={isLoading}>
            {isLoading ? (
                "..."
            ) : (
                <React.Fragment>
                    {icon}
                    {children}
                </React.Fragment>
            )}
        </button>
    );
};

export default Button;
