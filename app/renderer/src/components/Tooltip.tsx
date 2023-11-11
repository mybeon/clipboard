import React, { useState } from "react";

type Props = {
    children?: React.ReactNode;
    content: string;
};

const Tooltip = ({ content }: Props) => {
    const [style, setStyle] = useState<React.CSSProperties>({ display: "none" });

    let timeout: NodeJS.Timeout;

    function mouseEnterHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            setTooltipStyle(e);
        }, 800);
    }

    function mouseLeaveHandler() {
        clearTimeout(timeout);
        setStyle({ display: "none" });
    }

    function setTooltipStyle(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        const isTop = window.outerHeight - event.clientY > window.outerHeight / 2;

        const style: React.CSSProperties = {
            display: "inline",
            left: event.clientX + "px",
        };
        if (isTop) {
            style.top = event.clientY + 10 + "px";
            style.bottom = "unset";
        } else {
            style.bottom = window.outerHeight - event.clientY - 10 + "px";
            style.top = "unset";
        }

        setStyle(style);
    }

    return (
        <div style={{ display: "inline" }}>
            <img
                src="./icons/tooltip.svg"
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
            />
            <span style={style} className="tooltip">
                {content}
            </span>
        </div>
    );
};

export default Tooltip;
